import type { QuotePricingDetail } from "@libraries/plaster-calculator-common";
import {
    AMOUNTS_ONLY_PRICING_DETAIL,
    FULL_LINE_ITEMS_PRICING_DETAIL,
    LUMP_SUM_PRICING_DETAIL,
    lineAmountCents,
} from "@libraries/plaster-calculator-common";
import { Box, Table, Text } from "@libraries/uikit-web";
import { centsToAudDisplayText } from "@libraries/utilities";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";
import { QuoteAppearanceCaption } from "../quote-appearance-panel/quote-appearance-caption.component.tsx";

import type { QuoteDetailDocumentLineItem } from "./quote-detail-document.types.ts";
import {
    provenanceLabel,
    quantityWithUnit,
} from "./quote-detail-document.utils.ts";

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
 * client wasn't meant to see. Every variant renders with `scroll={false}` --
 * a scrollbar can't be interacted with on a printed page, so a table too
 * wide for its container must wrap its content instead (the item name
 * column's own `wrap`) rather than scroll off the edge.
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

/**
 * Full detail: item with its quantity provenance, quantity (with its unit
 * folded into the same cell via `quantityWithUnit` -- e.g. "128 m²" --
 * rather than a separate Unit column), rate, and amount.
 */
function FullLineItemsTable({ lineItems }: LineItemsProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Table label={t("quoteDetailDocument.lineItemsLabel")} scroll={false}>
            <Table.Head>
                <Table.Row>
                    <Table.Header>
                        <QuoteAppearanceCaption>
                            {t("quoteDetailDocument.columnItem")}
                        </QuoteAppearanceCaption>
                    </Table.Header>
                    <Table.Header align="end">
                        <QuoteAppearanceCaption>
                            {t("quoteDetailDocument.columnQuantity")}
                        </QuoteAppearanceCaption>
                    </Table.Header>
                    <Table.Header align="end">
                        <QuoteAppearanceCaption>
                            {t("quoteDetailDocument.columnUnitPrice")}
                        </QuoteAppearanceCaption>
                    </Table.Header>
                    <Table.Header align="end">
                        <QuoteAppearanceCaption>
                            {t("quoteDetailDocument.columnAmount")}
                        </QuoteAppearanceCaption>
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
                        {provenanceLabel(item.quantitySource, t)}
                    </Text>
                </Box>
            </Table.Cell>
            <Table.Cell align="end">
                {quantityWithUnit(item.quantity, item.unit)}
            </Table.Cell>
            <Table.Cell align="end">
                {centsToAudDisplayText(item.unitPriceCents)}
            </Table.Cell>
            <Table.Cell align="end">
                <Text weight="semibold">
                    {centsToAudDisplayText(
                        lineAmountCents(item.quantity, item.unitPriceCents),
                    )}
                </Text>
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
        <Table label={t("quoteDetailDocument.lineItemsLabel")} scroll={false}>
            <Table.Head>
                <Table.Row>
                    <Table.Header>
                        <QuoteAppearanceCaption>
                            {t("quoteDetailDocument.columnItem")}
                        </QuoteAppearanceCaption>
                    </Table.Header>
                    <Table.Header align="end">
                        <QuoteAppearanceCaption>
                            {t("quoteDetailDocument.columnAmount")}
                        </QuoteAppearanceCaption>
                    </Table.Header>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {lineItems.map((item) => (
                    <Table.Row key={item.id} avoidBreakInside>
                        <Table.Cell wrap>{item.name}</Table.Cell>
                        <Table.Cell align="end">
                            <Text weight="semibold">
                                {centsToAudDisplayText(
                                    lineAmountCents(
                                        item.quantity,
                                        item.unitPriceCents,
                                    ),
                                )}
                            </Text>
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
 * (see `totals` in `quote-detail-document.utils.ts`), never a per-item rate
 * or quantity.
 */
function LumpSumTable({
    totalCents,
}: {
    readonly totalCents: number;
}): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Table label={t("quoteDetailDocument.lineItemsLabel")} scroll={false}>
            <Table.Head>
                <Table.Row>
                    <Table.Header>
                        <QuoteAppearanceCaption>
                            {t("quoteDetailDocument.columnItem")}
                        </QuoteAppearanceCaption>
                    </Table.Header>
                    <Table.Header align="end">
                        <QuoteAppearanceCaption>
                            {t("quoteDetailDocument.columnAmount")}
                        </QuoteAppearanceCaption>
                    </Table.Header>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                <Table.Row avoidBreakInside>
                    <Table.Cell wrap>
                        {t("quoteDetailDocument.lumpSumDescription")}
                    </Table.Cell>
                    <Table.Cell align="end">
                        <Text weight="semibold">
                            {centsToAudDisplayText(totalCents)}
                        </Text>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}
