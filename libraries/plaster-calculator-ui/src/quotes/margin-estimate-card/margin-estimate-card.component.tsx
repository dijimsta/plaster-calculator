"use client";

import type { Supplier } from "@libraries/plaster-calculator-web-core";
import { Badge, Box, Card, SelectMenu, Stats } from "@libraries/uikit-web";
import type { ChangeEvent, ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { MarginEstimateCardLineTable } from "./margin-estimate-card-line-table.component.tsx";
import { MarginEstimateCardUncoveredNotice } from "./margin-estimate-card-uncovered-notice.component.tsx";
import type {
    MarginEstimateCardLine,
    MarginEstimateCardSummary,
} from "./margin-estimate-card.types.ts";
import {
    isUncoveredLine,
    marginEstimateSummaryStats,
} from "./margin-estimate-card.utils.ts";

export type MarginEstimateCardProps = {
    readonly summary: MarginEstimateCardSummary;
    /** One row per quote line, covered and uncovered alike. */
    readonly lines: readonly MarginEstimateCardLine[];
    /** The team's suppliers (WORK-380). Renders nothing when empty -- see this component's doc comment below. */
    readonly suppliers: readonly Supplier[];
    readonly selectedSupplierId: string | null;
    readonly onSupplierChange: (supplierId: string) => void;
    /** Routes to pricing this quote's uncovered lines for the selected supplier. This component owns no routing itself. */
    readonly onPriceUncoveredLines: () => void;
};

/**
 * The project quote's internal-only margin readout: sell/estimated
 * cost/estimated margin measured against the selected supplier's pricing, a
 * per-line breakdown, and a notice for any line that supplier hasn't
 * priced. Presentational only -- `summary`/`lines` are `estimateQuoteMargin()`'s
 * (`@libraries/plaster-calculator-web-core`, WORK-381) result, mapped by the
 * host page; this component fetches nothing and owns no routing (see
 * `onSupplierChange`/`onPriceUncoveredLines`).
 *
 * Renders nothing when `suppliers` is empty: there's no supplier to price
 * against, so there's no margin to estimate.
 *
 * This card must never reach a builder. It is deliberately never imported
 * by, or rendered inside, `QuoteDetailDocument`
 * (`../quote-detail-document/quote-detail-document.component.tsx`) or any
 * `printOnly` tree -- that component's print stylesheet
 * (`quote-detail-document.print.css`) hides everything on the page except
 * its own `QUOTE_DETAIL_DOCUMENT_PRINT_ROOT_ID` root when printing, so a
 * component that (like this one) sits outside that root by construction is
 * excluded from print/PDF output as a structural property of the page, not
 * a per-component opt-out this component would need to implement itself.
 */
export function MarginEstimateCard({
    summary,
    lines,
    suppliers,
    selectedSupplierId,
    onSupplierChange,
    onPriceUncoveredLines,
}: MarginEstimateCardProps): ReactElement | null {
    const { t } = useQuotesTranslation();

    if (suppliers.length === 0) {
        return null;
    }

    const uncoveredLines = lines.filter(isUncoveredLine);

    return (
        <Card>
            <Box direction="column" gap="lg">
                <MarginEstimateCardHeader
                    suppliers={suppliers}
                    selectedSupplierId={selectedSupplierId}
                    onSupplierChange={onSupplierChange}
                />
                <Stats
                    items={marginEstimateSummaryStats(summary, t)}
                    columns={3}
                />
                <MarginEstimateCardLineTable lines={lines} />
                {uncoveredLines.length > 0 && (
                    <MarginEstimateCardUncoveredNotice
                        uncoveredLines={uncoveredLines}
                        onPriceUncoveredLines={onPriceUncoveredLines}
                    />
                )}
            </Box>
        </Card>
    );
}

type MarginEstimateCardHeaderProps = {
    readonly suppliers: readonly Supplier[];
    readonly selectedSupplierId: string | null;
    readonly onSupplierChange: (supplierId: string) => void;
};

/**
 * Card title and "Internal only" badge, with the supplier picker driving
 * which supplier's pricing the figures below are measured against.
 */
function MarginEstimateCardHeader({
    suppliers,
    selectedSupplierId,
    onSupplierChange,
}: MarginEstimateCardHeaderProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Box direction="row" align="center" justify="between" gap="md" wrap>
            <Box direction="row" align="center" gap="sm">
                <Card.Title>{t("marginEstimateCard.title")}</Card.Title>
                <Badge color="yellow">
                    {t("marginEstimateCard.internalOnlyBadge")}
                </Badge>
            </Box>
            <Box basis="1/3">
                <SelectMenu
                    id="margin-estimate-card-supplier"
                    label={t("marginEstimateCard.supplierLabel")}
                    value={selectedSupplierId ?? ""}
                    options={[
                        {
                            value: "",
                            label: t("marginEstimateCard.selectSupplier"),
                        },
                        ...suppliers.map((supplier) => ({
                            value: supplier.id,
                            label: supplier.name,
                        })),
                    ]}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                        onSupplierChange(event.target.value)
                    }
                />
            </Box>
        </Box>
    );
}
