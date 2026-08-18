"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import type {
    ReadinessAffectedItem,
    ReadinessCheck,
    ReadinessResult,
} from "@libraries/plaster-calculator-common";
import { TEMPLATE_PRICED_CHECK_ID } from "@libraries/plaster-calculator-common";
import type { ReadinessCheckListRenderCheckFooter } from "@libraries/plaster-calculator-ui";
import {
    UnitPriceBatchSaveControl,
    UnitPriceFixControl,
    useActiveQuoteTemplate,
} from "@libraries/plaster-calculator-ui";
import {
    FirebaseService,
    useQuoteReadiness,
} from "@libraries/plaster-calculator-web-core";
import { QueryFetchPolicy } from "firebase/data-connect";
import type { ReactElement } from "react";
import { useCallback, useState } from "react";

import { currentUnitPriceCents } from "./quote-readiness-fix.utils.js";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

/**
 * Reuses `UpdateQuoteItemTemplateConfig` (already used by the quote-
 * template-form/panel feature to save prices) and resolves `quoteTemplateId`
 * the same way that feature does — `useActiveQuoteTemplate()`, the team's
 * first/only `QuoteTemplate`. That mutation updates the whole config row
 * (`enabled`/`unitPriceCents`/`materialUnitPriceCents`/`labourUnitPriceCents`
 * are all required arguments), so this re-reads every row fresh via one
 * `ListQuoteItemTemplateConfigsForQuoteTemplate` call before writing any of
 * them — the same "fetch fresh, patch one field, write the rest back
 * unchanged" shape the other inline fixes use, just spread across every
 * `updates` entry instead of one — so an `enabled`/material/labour edit made
 * elsewhere (e.g. the quote template form) isn't clobbered by this
 * price-only change. Batched so pricing N unpriced templates is one read,
 * one settle of N parallel writes, and one `refresh()` — not N of each, one
 * per `UnitPriceFixControl`'s old individual Save button.
 */
function useUpdateUnitPricesCallback(
    projectId: string,
): (
    updates: readonly { itemTemplateId: string; unitPriceCents: number }[],
) => Promise<void> {
    const { activeTemplate } = useActiveQuoteTemplate();
    const { mutateAsync: updateItemTemplateConfig } =
        DataConnectorReact.useUpdateQuoteItemTemplateConfig(dataConnect);
    const { refresh } = useQuoteReadiness(projectId);

    return useCallback(
        async (
            updates: readonly {
                itemTemplateId: string;
                unitPriceCents: number;
            }[],
        ) => {
            if (updates.length === 0) return;
            if (!activeTemplate) {
                throw new Error("This fix is missing its quote item template.");
            }

            const quoteTemplateId = activeTemplate.id;
            const { data } =
                await DataConnector.listQuoteItemTemplateConfigsForQuoteTemplate(
                    dataConnect,
                    { quoteTemplateId },
                    { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
                );

            await Promise.all(
                updates.map(({ itemTemplateId, unitPriceCents }) => {
                    const config = data.quoteItemTemplateConfigs.find(
                        (candidate) =>
                            candidate.itemTemplateId === itemTemplateId,
                    );
                    if (!config) {
                        throw new Error(
                            "This item is no longer in the quote template.",
                        );
                    }
                    return updateItemTemplateConfig({
                        quoteTemplateId,
                        itemTemplateId,
                        enabled: config.enabled,
                        unitPriceCents,
                        materialUnitPriceCents: config.materialUnitPriceCents,
                        labourUnitPriceCents: config.labourUnitPriceCents,
                    });
                }),
            );
            await refresh();
        },
        [activeTemplate, refresh, updateItemTemplateConfig],
    );
}

export type QuoteReadinessUnitPriceFixControls = {
    /** `TEMPLATE_PRICED`'s per-item `renderFixControl` case delegates here. */
    readonly renderUnitPriceFixControl: (
        item: ReadinessAffectedItem,
    ) => ReactElement;
    /** `TEMPLATE_PRICED`'s `renderCheckFooter` — a no-op (`null`) for every
     * other check id, so callers can wire this straight through without a
     * check-id guard of their own. */
    readonly renderCheckFooter: ReadinessCheckListRenderCheckFooter;
};

/**
 * All of `TEMPLATE_PRICED`'s fix-control state in one place: every rendered
 * `UnitPriceFixControl` only reports a live draft into `priceDrafts` here
 * (keyed by `quoteItemTemplateId`, `"invalid"` while a control's text
 * doesn't parse) rather than persisting itself, and `renderCheckFooter`'s
 * `UnitPriceBatchSaveControl` is what actually calls
 * `useUpdateUnitPricesCallback` — one batched save covering every
 * currently-affected item, instead of one Save button (and one `refresh()`)
 * per item.
 */
export function useQuoteReadinessUnitPriceFixControls(
    projectId: string,
): QuoteReadinessUnitPriceFixControls {
    const { data: readinessData } = useQuoteReadiness(projectId);
    const updateUnitPrices = useUpdateUnitPricesCallback(projectId);
    const [priceDrafts, setPriceDrafts] = useState<
        ReadonlyMap<string, number | "invalid">
    >(new Map());

    const renderUnitPriceFixControl = useCallback(
        (item: ReadinessAffectedItem): ReactElement => (
            <UnitPriceFixControl
                item={item}
                valueCents={currentUnitPriceCents(readinessData, item)}
                onChange={(unitPriceCents) => {
                    const itemTemplateId = item.quoteItemTemplateId;
                    if (!itemTemplateId) return;
                    setPriceDrafts((previous) => {
                        const next = new Map(previous);
                        next.set(itemTemplateId, unitPriceCents ?? "invalid");
                        return next;
                    });
                }}
            />
        ),
        [readinessData],
    );

    const renderCheckFooter = useCallback<ReadinessCheckListRenderCheckFooter>(
        (
            check: ReadinessCheck,
            result: ReadinessResult | undefined,
        ): ReactElement | null => {
            if (check.id !== TEMPLATE_PRICED_CHECK_ID) return null;

            const affectedItems = result?.affectedItems ?? [];
            const hasInvalidDraft = affectedItems.some((item) => {
                const itemTemplateId = item.quoteItemTemplateId;
                return (
                    itemTemplateId != null &&
                    priceDrafts.get(itemTemplateId) === "invalid"
                );
            });

            return (
                <UnitPriceBatchSaveControl
                    itemCount={affectedItems.length}
                    disabled={hasInvalidDraft}
                    onSaveAll={() =>
                        updateUnitPrices(
                            affectedItems.flatMap((item) => {
                                const itemTemplateId = item.quoteItemTemplateId;
                                if (!itemTemplateId) return [];
                                const draft = priceDrafts.get(itemTemplateId);
                                return [
                                    {
                                        itemTemplateId,
                                        unitPriceCents:
                                            typeof draft === "number"
                                                ? draft
                                                : currentUnitPriceCents(
                                                      readinessData,
                                                      item,
                                                  ),
                                    },
                                ];
                            }),
                        )
                    }
                />
            );
        },
        [priceDrafts, readinessData, updateUnitPrices],
    );

    return { renderUnitPriceFixControl, renderCheckFooter };
}
