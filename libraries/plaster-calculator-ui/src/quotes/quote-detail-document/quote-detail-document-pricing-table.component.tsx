import type { QuotePricingDetail } from "@libraries/plaster-calculator-common";
import {
    AMOUNTS_ONLY_PRICING_DETAIL,
    FULL_LINE_ITEMS_PRICING_DETAIL,
    LUMP_SUM_PRICING_DETAIL,
    lineAmountCents,
} from "@libraries/plaster-calculator-common";
import { Box, Table, Text } from "@libraries/uikit-web";
import { CurrencyUtils } from "@libraries/utilities";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import type { QuoteDetailDocumentLineItem } from "./quote-detail-document.types.ts";
import { QuoteDetailDocumentUtils } from "./quote-detail-document.utils.ts";

export type QuoteDetailDocumentPricingTableProps = {
    readonly pricingDetail: QuotePricingDetail;
    readonly lineItems: readonly QuoteDetailDocumentLineItem[];
    /** Pre-summed total for the lump-sum row (equal to the items' subtotal). */
    readonly lumpSumTotalCents: number;
};

/**
 * Selects one of the three pricing-detail renderings a `QuoteAppearance` can
 * request (WORK-202). `AMOUNTS_ONLY_PRICING_DETAIL` and
 * `LUMP_SUM_PRICING_DETAIL` never put a line item's `quantity` or
 * `unitPriceCents` into rendered markup -- only the amount those values
 * compute to -- so a printed PDF or copy-pasted page can't leak a rate a
 * client wasn't meant to see.
 */
export function QuoteDetailDocumentPricingTable({
    pricingDetail,
    lineItems,
    lumpSumTotalCents,
}: QuoteDetailDocumentPricingTableProps): ReactElement {
    switch (pricingDetail) {
        case FULL_LINE_ITEMS_PRICING_DETAIL:
            return <FullLineItemsTable lineItems={lineItems} />;
        case AMOUNTS_ONLY_PRICING_DETAIL:
            return <AmountsOnlyTable lineItems={lineItems} />;
        case LUMP_SUM_PRICING_DETAIL:
            return <LumpSumTable totalCents={lumpSumTotalCents} />;
    }
}

type LineItemsProps = {
    readonly lineItems: readonly QuoteDetailDocumentLineItem[];
};

/** Full detail: item with its quantity provenance, quantity, unit, rate, and amount. */
function FullLineItemsTable({ lineItems }: LineItemsProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Table label={t("quoteDetailDocument.lineItemsLabel")}>
            <Table.Head>
                <Table.Row>
                    <Table.Header>
                        {t("quoteDetailDocument.columnItem")}
                    </Table.Header>
                    <Table.Header align="end">
                        {t("quoteDetailDocument.columnQuantity")}
                    </Table.Header>
                    <Table.Header align="end">
                        {t("quoteUnitInput.label")}
                    </Table.Header>
                    <Table.Header align="end">
                        {t("quoteDetailDocument.columnUnitPrice")}
                    </Table.Header>
                    <Table.Header align="end">
                        {t("quoteDetailDocument.columnAmount")}
                    </Table.Header>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {lineItems.map((item) => (
                    <FullLineItemsRow key={item.id} item={item} />
                ))}
            </Table.Body>
        </Table>
    );
}

function FullLineItemsRow({
    item,
}: {
    readonly item: QuoteDetailDocumentLineItem;
}): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Table.Row avoidBreakInside>
            <Table.Cell wrap>
                <Box direction="column" gap="xs">
                    <Text size="base">{item.name}</Text>
                    <Text size="sm" variant="muted">
                        {QuoteDetailDocumentUtils.provenanceLabel(
                            item.quantitySource,
                            t,
                        )}
                    </Text>
                </Box>
            </Table.Cell>
            <Table.Cell align="end">{item.quantity}</Table.Cell>
            <Table.Cell align="end">{item.unit ?? ""}</Table.Cell>
            <Table.Cell align="end">
                {CurrencyUtils.centsToAudDisplayText(item.unitPriceCents)}
            </Table.Cell>
            <Table.Cell align="end">
                {CurrencyUtils.centsToAudDisplayText(
                    lineAmountCents(item.quantity, item.unitPriceCents),
                )}
            </Table.Cell>
        </Table.Row>
    );
}

/**
 * Amounts only: item and amount columns. `item.quantity` and
 * `item.unitPriceCents` are only ever read to compute the amount below, in
 * JavaScript -- never interpolated into a cell -- so no rate or quantity
 * reaches the DOM.
 */
function AmountsOnlyTable({ lineItems }: LineItemsProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Table label={t("quoteDetailDocument.lineItemsLabel")}>
            <Table.Head>
                <Table.Row>
                    <Table.Header>
                        {t("quoteDetailDocument.columnItem")}
                    </Table.Header>
                    <Table.Header align="end">
                        {t("quoteDetailDocument.columnAmount")}
                    </Table.Header>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {lineItems.map((item) => (
                    <Table.Row key={item.id} avoidBreakInside>
                        <Table.Cell wrap>{item.name}</Table.Cell>
                        <Table.Cell align="end">
                            {CurrencyUtils.centsToAudDisplayText(
                                lineAmountCents(
                                    item.quantity,
                                    item.unitPriceCents,
                                ),
                            )}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}

/**
 * Lump sum: one description row and one total, collapsing every line item
 * into a single amount -- `totalCents` is the items' pre-computed subtotal
 * (see `QuoteDetailDocumentUtils.totals`), never a per-item rate or
 * quantity.
 */
function LumpSumTable({
    totalCents,
}: {
    readonly totalCents: number;
}): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Table label={t("quoteDetailDocument.lineItemsLabel")}>
            <Table.Head>
                <Table.Row>
                    <Table.Header>
                        {t("quoteDetailDocument.columnItem")}
                    </Table.Header>
                    <Table.Header align="end">
                        {t("quoteDetailDocument.columnAmount")}
                    </Table.Header>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                <Table.Row avoidBreakInside>
                    <Table.Cell wrap>
                        {t("quoteDetailDocument.lumpSumDescription")}
                    </Table.Cell>
                    <Table.Cell align="end">
                        {CurrencyUtils.centsToAudDisplayText(totalCents)}
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}
