"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import { lineAmountCents } from "@libraries/plaster-calculator-common";
import type {
    MarginEstimateCardLine,
    MarginEstimateCardSummary,
} from "@libraries/plaster-calculator-ui";
import {
    estimateQuoteMargin,
    FirebaseService,
    useSuppliers,
} from "@libraries/plaster-calculator-web-core";
import type {
    MarginEstimateQuoteItem,
    Supplier,
    SupplierItemEstimate,
} from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation.js";
import { useCallback, useMemo, useState } from "react";

import { forProjectQuote } from "./quote-query-key.utils.js";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

type ProjectQuote = NonNullable<
    NonNullable<DataConnector.GetProjectQuoteData["project"]>["quote"]
>;
type ProjectQuoteItem = ProjectQuote["items"][number];

export type QuoteMarginEstimateState = {
    readonly summary: MarginEstimateCardSummary;
    /** One row per quote line, covered and uncovered alike -- see `MarginEstimateCard`. */
    readonly lines: readonly MarginEstimateCardLine[];
    readonly suppliers: readonly Supplier[];
    readonly selectedSupplierId: string | null;
    readonly onSupplierChange: (supplierId: string) => void;
    readonly onPriceUncoveredLines: () => void;
};

/**
 * Matches `items`' `sourceTemplate.supplierPrices` -- WORK-379's nested,
 * team-scoped selection carrying *every* supplier's price for each item's
 * template, not just this quote's own -- against `supplierId`, keyed by
 * template id. Every supplier's prices already arrived in `GetProjectQuote`,
 * so switching the picker only changes which entries this lookup keeps; it
 * never needs a new network round trip.
 */
function supplierEstimatesByTemplateId(
    items: readonly ProjectQuoteItem[],
    supplierId: string | null,
): ReadonlyMap<string, SupplierItemEstimate> {
    const estimates = new Map<string, SupplierItemEstimate>();
    if (supplierId === null) {
        return estimates;
    }

    for (const item of items) {
        const sourceTemplate = item.sourceTemplate;
        const price = sourceTemplate?.supplierPrices.find(
            (supplierPrice) => supplierPrice.supplierId === supplierId,
        );
        if (!sourceTemplate || !price) {
            continue;
        }
        estimates.set(sourceTemplate.id, {
            supplierId,
            templateId: sourceTemplate.id,
            templateName: sourceTemplate.name,
            unit: item.unit ?? null,
            materialUnitPriceCents: price.materialUnitPriceCents,
            // GetProjectQuote's nested supplierPrices selection (WORK-379)
            // carries only supplierId/materialUnitPriceCents -- never the
            // SupplierQuoteItemPrice row's own timestamps -- and
            // estimateQuoteMargin() below matches purely on templateId, so
            // the quote item's own updatedAt stands in only to satisfy
            // SupplierItemEstimate's shape; it is never read as real
            // provenance.
            createdAt: item.updatedAt,
            updatedAt: item.updatedAt,
        });
    }
    return estimates;
}

function toMarginEstimateQuoteItem(
    item: ProjectQuoteItem,
): MarginEstimateQuoteItem {
    return {
        sourceTemplateId: item.sourceTemplateId ?? null,
        quantity: item.quantity,
        unitPriceCents: item.unitPriceCents,
    };
}

/**
 * Mirrors the private `marginRatioOf()` in `margin-estimate.utils.ts`
 * (`@libraries/plaster-calculator-web-core`, WORK-381), which isn't
 * exported: `(sell - cost) / sell`, `null` at `sell = 0` rather than
 * `NaN`/`Infinity`. Needed here because `estimateQuoteMargin()` only
 * returns a quote-wide summary plus its *uncovered* lines
 * (`QuoteMarginEstimateSummary.uncoveredLines`) -- never every line's own
 * result -- so this hook computes each covered line's own ratio itself,
 * while `estimateQuoteMargin()` (below) still owns the quote-wide
 * sell/cost/margin rollup that becomes `summary`.
 */
function lineMarginRatio(sellCents: number, costCents: number): number | null {
    if (sellCents === 0) return null;
    return (sellCents - costCents) / sellCents;
}

/**
 * One quote line's card row: `id`/`name` zipped onto its own
 * `QuoteLineMarginEstimate` shape, per `MarginEstimateCardLine`'s doc
 * comment. Matches `estimatesByTemplateId` the same way
 * `estimateQuoteMargin()` matches internally -- a `null` `sourceTemplateId`
 * (a hand-added line), or one the selected supplier hasn't priced, is
 * always uncovered rather than costed at `0`.
 */
function toMarginEstimateCardLine(
    item: ProjectQuoteItem,
    estimatesByTemplateId: ReadonlyMap<string, SupplierItemEstimate>,
): MarginEstimateCardLine {
    const estimate =
        item.sourceTemplateId != null
            ? estimatesByTemplateId.get(item.sourceTemplateId)
            : undefined;

    if (!estimate) {
        return {
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            unitPriceCents: item.unitPriceCents,
            estimatedMaterialUnitPriceCents: null,
            lineCostCents: null,
            marginRatio: null,
        };
    }

    const sellCents = lineAmountCents(item.quantity, item.unitPriceCents);
    const lineCostCents = lineAmountCents(
        item.quantity,
        estimate.materialUnitPriceCents,
    );

    return {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPriceCents: item.unitPriceCents,
        estimatedMaterialUnitPriceCents: estimate.materialUnitPriceCents,
        lineCostCents,
        marginRatio: lineMarginRatio(sellCents, lineCostCents),
    };
}

/**
 * A supplier picked in this hook, tied to the `Quote.id` it was picked for
 * -- so a regenerated quote (a new id, via `CreateQuoteWithItems`) can never
 * inherit a stale optimistic selection made against the quote it replaced.
 */
type OptimisticSupplierSelection = {
    readonly quoteId: string;
    readonly supplierId: string;
};

function resolveSelectedSupplierId(
    optimisticSelection: OptimisticSupplierSelection | null,
    quoteId: string | undefined,
    stampedSupplierId: string | null,
): string | null {
    return optimisticSelection && optimisticSelection.quoteId === quoteId
        ? optimisticSelection.supplierId
        : stampedSupplierId;
}

/**
 * Drives the project quote tab's `MarginEstimateCard` (WORK-384): reads
 * `GetProjectQuote`'s WORK-379 supplier/pricing extension -- sharing its
 * cache with `useProjectQuoteState`'s identical query in
 * `quote-generation.hooks.tsx`, since react-query dedupes by query key and
 * variables, so this hook issues no extra request on its own -- estimates
 * margin via `estimateQuoteMargin()` (`@libraries/plaster-calculator-web-core`,
 * WORK-381), and wires the supplier picker to `SetMyQuoteSupplier`.
 *
 * The picker defaults to the quote's stamped `supplierId` (WORK-382), or
 * the team's default supplier (`useSuppliers()`, WORK-380) for an older
 * quote generated before that stamp existed. Picking a different supplier
 * updates the selection immediately -- every supplier's prices are already
 * in hand (see `supplierEstimatesByTemplateId()`), so the card recalculates
 * without waiting on the mutation -- and persists it in the background via
 * `SetMyQuoteSupplier`; a failure reverts the selection and notifies, the
 * same optimistic-then-reconcile shape `useQuoteStatusActions()`
 * (`quote-detail.hooks.tsx`) uses for status transitions.
 */
export function useQuoteMarginEstimate(
    projectId: string,
): QuoteMarginEstimateState {
    const { data } = DataConnectorReact.useGetProjectQuote(dataConnect, {
        projectId,
    });
    const quote = data?.project?.quote ?? null;
    const items = useMemo(() => quote?.items ?? [], [quote]);

    const { suppliers } = useSuppliers();
    const defaultSupplierId = useMemo(
        () => suppliers?.find((supplier) => supplier.isDefault)?.id ?? null,
        [suppliers],
    );
    const stampedSupplierId = quote?.supplierId ?? defaultSupplierId;

    const [optimisticSelection, setOptimisticSelection] =
        useState<OptimisticSupplierSelection | null>(null);
    const selectedSupplierId = resolveSelectedSupplierId(
        optimisticSelection,
        quote?.id,
        stampedSupplierId,
    );

    const estimatesByTemplateId = useMemo(
        () => supplierEstimatesByTemplateId(items, selectedSupplierId),
        [items, selectedSupplierId],
    );
    const summary = useMemo(
        () =>
            estimateQuoteMargin(
                items.map(toMarginEstimateQuoteItem),
                Array.from(estimatesByTemplateId.values()),
            ),
        [estimatesByTemplateId, items],
    );
    const lines = useMemo(
        () =>
            items.map((item) =>
                toMarginEstimateCardLine(item, estimatesByTemplateId),
            ),
        [estimatesByTemplateId, items],
    );

    const { mutateAsync: setQuoteSupplier } =
        DataConnectorReact.useSetMyQuoteSupplier(dataConnect);
    const queryClient = useQueryClient();
    const { notify } = useNotificationsManager();
    const router = useRouter();

    const onSupplierChange = useCallback(
        (supplierId: string): void => {
            if (!quote) return;
            const quoteId = quote.id;

            setOptimisticSelection({ quoteId, supplierId });
            void setQuoteSupplier({ quoteId, supplierId })
                .then(() =>
                    queryClient.invalidateQueries({
                        queryKey: forProjectQuote(dataConnect, projectId),
                    }),
                )
                .catch(() => {
                    setOptimisticSelection(null);
                    notify({
                        intent: "error",
                        title: "Couldn't change supplier",
                        description:
                            "Something went wrong while updating the quote's supplier. Please try again.",
                    });
                });
        },
        [notify, projectId, queryClient, quote, setQuoteSupplier],
    );

    const onPriceUncoveredLines = useCallback((): void => {
        if (selectedSupplierId) {
            router.push(`/suppliers/${selectedSupplierId}`);
        }
    }, [router, selectedSupplierId]);

    return {
        summary,
        lines,
        suppliers: suppliers ?? [],
        selectedSupplierId,
        onSupplierChange,
        onPriceUncoveredLines,
    };
}
