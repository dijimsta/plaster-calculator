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

export function mergeQuoteItemTemplates(
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
                scope: QuoteItemTemplateScopeSchema.parse(itemTemplate.scope),
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

export async function createCustomQuoteItem(
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

export function haveSameKeywords(
    a: readonly string[],
    b: readonly string[],
): boolean {
    return (
        a.length === b.length && a.every((value, index) => value === b[index])
    );
}

export async function updateExistingCustomQuoteItem(
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
        !haveSameKeywords(original.keywords, item.keywords);
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

/**
 * Updates a single item's price on `quoteTemplateId` if it changed from
 * `original`, preserving every other field (`enabled`,
 * `materialUnitPriceCents`, `labourUnitPriceCents`) untouched. Takes
 * only `itemTemplateId`/`unitPriceCents` rather than a full form-item
 * shape, since that's all it ever reads -- so both the default
 * template's own item prices (`useSaveQuoteTemplate`) and a variation's
 * prices-only editor (`useSaveQuoteTemplateVariationPrices`, in
 * `../quote-template-variation-editor/`) can share this one function
 * instead of each needing its own copy.
 */
export async function updateQuoteItemPrice(
    quoteTemplateId: string,
    item: {
        readonly itemTemplateId: string;
        readonly unitPriceCents: number;
    },
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

/** `itemTemplateId -> unitPriceCents` for a set of configs, e.g. the default template's own configs. Used to price a backfilled config on a non-default template at the default's price rather than $0 -- see `resolveBackfillPriceCents()`. */
export function mapUnitPricesByItemTemplateId(
    configs: readonly QuoteItemTemplateConfigRow[],
): ReadonlyMap<string, number> {
    return new Map(
        configs.map((config) => [config.itemTemplateId, config.unitPriceCents]),
    );
}

/**
 * Which `QuoteTemplate` is the team's default (`isDefault: true`), and
 * whether `quoteTemplateId` names it. `needsDefaultPricesForBackfill` is
 * true only when `quoteTemplateId` names some *other* template -- a
 * variation -- since the default has no other default to copy a
 * backfilled price from.
 */
export function resolveDefaultTemplateContext(
    quoteTemplateId: string | null,
    templates: readonly {
        readonly id: string;
        readonly isDefault: boolean;
    }[],
): {
    readonly defaultTemplateId: string | null;
    readonly isDefaultTemplate: boolean;
    readonly needsDefaultPricesForBackfill: boolean;
} {
    const defaultTemplateId =
        templates.find((template) => template.isDefault)?.id ?? null;
    const isDefaultTemplate =
        quoteTemplateId !== null && quoteTemplateId === defaultTemplateId;
    return {
        defaultTemplateId,
        isDefaultTemplate,
        needsDefaultPricesForBackfill:
            quoteTemplateId !== null &&
            !isDefaultTemplate &&
            defaultTemplateId !== null,
    };
}

/**
 * A backfilled `QuoteItemTemplateConfig`'s starting price. The default
 * template backfills at $0, same as before -- there is no "other"
 * default for it to copy from, and its price inputs are how a team sets
 * that price in the first place. A variation backfills at the default's
 * *current* price for that item (falling back to $0 only if the default
 * itself doesn't have a config for it yet either), so a newly added
 * default item arrives on every variation priced, not unpriced and
 * failing `TEMPLATE_PRICED`.
 */
export function resolveBackfillPriceCents(
    isDefaultTemplate: boolean,
    itemTemplateId: string,
    defaultPriceByItemTemplateId: ReadonlyMap<string, number>,
): number {
    if (isDefaultTemplate) {
        return 0;
    }
    return defaultPriceByItemTemplateId.get(itemTemplateId) ?? 0;
}

export async function refreshQuoteTemplateItems(
    dataConnect: DataConnect,
    quoteTemplateId: string,
    queryClient: QueryClient,
): Promise<void> {
    const itemTemplatesRef =
        DataConnector.listQuoteItemTemplatesRef(dataConnect);
    const refreshedItemTemplates = await DataConnector.listQuoteItemTemplates(
        dataConnect,
        {
            fetchPolicy: QueryFetchPolicy.SERVER_ONLY,
        },
    );
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
