import * as DataConnector from "@generated/data-connector-web";
import { QuoteItemTemplateScopeSchema } from "@libraries/plaster-calculator-common";
import type { QueryClient } from "@tanstack/react-query";
import { QueryFetchPolicy, type DataConnect } from "firebase/data-connect";

import type { QuoteTemplateFormValues } from "../quote-template-form/index.ts";

import type { QuoteTemplateItem } from "./quote-template-panel.types.ts";

type QuoteItemTemplateRow =
    DataConnector.ListQuoteItemTemplatesData["quoteItemTemplates"][number];
type QuoteItemTemplateConfigRow =
    DataConnector.ListQuoteItemTemplateConfigsForQuoteTemplateData["quoteItemTemplateConfigs"][number];

type CreateItemTemplateFn = (
    vars: DataConnector.CreateQuoteItemTemplateWithUnitVariables,
) => Promise<DataConnector.CreateQuoteItemTemplateWithUnitData>;
type UpdateItemTemplateFn = (
    vars: DataConnector.UpdateQuoteItemTemplateWithUnitVariables,
) => Promise<DataConnector.UpdateQuoteItemTemplateWithUnitData>;
type CreateItemTemplateConfigFn = (
    vars: DataConnector.CreateQuoteItemTemplateConfigVariables,
) => Promise<DataConnector.CreateQuoteItemTemplateConfigData>;
type UpdateItemTemplateConfigFn = (
    vars: DataConnector.UpdateQuoteItemTemplateConfigVariables,
) => Promise<DataConnector.UpdateQuoteItemTemplateConfigData>;

const DEFAULT_NEW_ITEM_PRICE_CENTS = 0;

export class QuoteTemplatePanelUtils {
    static mergeQuoteItemTemplates(
        quoteTemplateId: string,
        itemTemplates: readonly QuoteItemTemplateRow[],
        configs: readonly QuoteItemTemplateConfigRow[],
    ): readonly QuoteTemplateItem[] {
        const configsByItemTemplateId = new Map(
            configs.map((config) => [config.itemTemplateId, config]),
        );

        return itemTemplates.flatMap((itemTemplate) => {
            const config = configsByItemTemplateId.get(itemTemplate.id);
            if (config === undefined) {
                return [];
            }
            return [
                {
                    itemTemplateId: itemTemplate.id,
                    quoteTemplateId,
                    scope: QuoteItemTemplateScopeSchema.parse(
                        itemTemplate.scope,
                    ),
                    systemKey: itemTemplate.systemKey ?? null,
                    name: itemTemplate.name,
                    unit: itemTemplate.unit ?? null,
                    hasKeywords: itemTemplate.hasKeywords,
                    keywords: itemTemplate.keywords,
                    sortOrder: itemTemplate.sortOrder,
                    enabled: config.enabled,
                    unitPriceCents: config.unitPriceCents,
                    materialUnitPriceCents: config.materialUnitPriceCents,
                    labourUnitPriceCents: config.labourUnitPriceCents,
                },
            ];
        });
    }

    static async createCustomQuoteItem(
        quoteTemplateId: string,
        item: QuoteTemplateFormValues["customItems"][number],
        createItemTemplate: CreateItemTemplateFn,
        createItemTemplateConfig: CreateItemTemplateConfigFn,
        updateItemTemplateConfig: UpdateItemTemplateConfigFn,
    ): Promise<void> {
        const itemTemplateId = crypto.randomUUID();
        await createItemTemplate({
            id: itemTemplateId,
            name: item.name,
            unit: item.unit.trim(),
            hasKeywords: item.hasKeywords,
            keywords: [...item.keywords],
        });
        await createItemTemplateConfig({
            quoteTemplateId,
            itemTemplateId,
            unitPriceCents: item.unitPriceCents,
            materialUnitPriceCents: DEFAULT_NEW_ITEM_PRICE_CENTS,
            labourUnitPriceCents: DEFAULT_NEW_ITEM_PRICE_CENTS,
        });
        if (!item.enabled) {
            await updateItemTemplateConfig({
                quoteTemplateId,
                itemTemplateId,
                enabled: false,
                unitPriceCents: item.unitPriceCents,
                materialUnitPriceCents: DEFAULT_NEW_ITEM_PRICE_CENTS,
                labourUnitPriceCents: DEFAULT_NEW_ITEM_PRICE_CENTS,
            });
        }
    }

    static haveSameKeywords(
        a: readonly string[],
        b: readonly string[],
    ): boolean {
        return (
            a.length === b.length &&
            a.every((value, index) => value === b[index])
        );
    }

    static async updateExistingCustomQuoteItem(
        quoteTemplateId: string,
        itemTemplateId: string,
        item: QuoteTemplateFormValues["customItems"][number],
        original: QuoteTemplateItem,
        updateItemTemplate: UpdateItemTemplateFn,
        updateItemTemplateConfig: UpdateItemTemplateConfigFn,
    ): Promise<void> {
        const nameOrKeywordsChanged =
            original.name !== item.name ||
            original.unit !== item.unit.trim() ||
            original.hasKeywords !== item.hasKeywords ||
            !QuoteTemplatePanelUtils.haveSameKeywords(
                original.keywords,
                item.keywords,
            );
        if (nameOrKeywordsChanged) {
            await updateItemTemplate({
                id: itemTemplateId,
                name: item.name,
                unit: item.unit.trim(),
                hasKeywords: item.hasKeywords,
                keywords: [...item.keywords],
            });
        }

        const configChanged =
            original.enabled !== item.enabled ||
            original.unitPriceCents !== item.unitPriceCents;
        if (configChanged) {
            await updateItemTemplateConfig({
                quoteTemplateId,
                itemTemplateId,
                enabled: item.enabled,
                unitPriceCents: item.unitPriceCents,
                materialUnitPriceCents: original.materialUnitPriceCents,
                labourUnitPriceCents: original.labourUnitPriceCents,
            });
        }
    }

    static async updateDefaultQuoteItemPrice(
        quoteTemplateId: string,
        item: QuoteTemplateFormValues["defaultItems"][number],
        original: QuoteTemplateItem | undefined,
        updateItemTemplateConfig: UpdateItemTemplateConfigFn,
    ): Promise<void> {
        if (
            original === undefined ||
            original.unitPriceCents === item.unitPriceCents
        ) {
            return;
        }
        await updateItemTemplateConfig({
            quoteTemplateId,
            itemTemplateId: item.itemTemplateId,
            enabled: original.enabled,
            unitPriceCents: item.unitPriceCents,
            materialUnitPriceCents: original.materialUnitPriceCents,
            labourUnitPriceCents: original.labourUnitPriceCents,
        });
    }

    static async refreshQuoteTemplateItems(
        dataConnect: DataConnect,
        quoteTemplateId: string,
        queryClient: QueryClient,
    ): Promise<void> {
        const itemTemplatesRef =
            DataConnector.listQuoteItemTemplatesRef(dataConnect);
        const refreshedItemTemplates =
            await DataConnector.listQuoteItemTemplates(dataConnect, {
                fetchPolicy: QueryFetchPolicy.SERVER_ONLY,
            });
        queryClient.setQueryData(
            [itemTemplatesRef.name, itemTemplatesRef.variables ?? null],
            refreshedItemTemplates.data,
        );

        const configsRef =
            DataConnector.listQuoteItemTemplateConfigsForQuoteTemplateRef(
                dataConnect,
                { quoteTemplateId },
            );
        const refreshedConfigs =
            await DataConnector.listQuoteItemTemplateConfigsForQuoteTemplate(
                dataConnect,
                { quoteTemplateId },
                { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
            );
        queryClient.setQueryData(
            [configsRef.name, configsRef.variables ?? null],
            refreshedConfigs.data,
        );
    }
}
