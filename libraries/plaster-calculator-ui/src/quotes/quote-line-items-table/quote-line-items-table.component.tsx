import { QuoteTotalsUtils } from "@libraries/plaster-calculator-common";
import { Box, Table, Text } from "@libraries/uikit-web";
import { CurrencyUtils } from "@libraries/utilities";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import type { QuoteLineItemsTableRow } from "./quote-line-items-table.types.ts";
import { QuoteLineItemsTableUtils } from "./quote-line-items-table.utils.ts";

export type QuoteLineItemsTableProps = {
    readonly rows: readonly QuoteLineItemsTableRow[];
};

/**
 * The line-items table on a generated quote: one row per `QuoteItem`,
 * naming each row's provenance -- the metric its quantity came from, or the
 * keywords that matched it onto the quote -- beneath its name. Read-only:
 * no editing affordances. Presentational only -- `rows` is data the caller
 * already mapped from a query result; this component owns no data
 * fetching.
 */
export function QuoteLineItemsTable({
    rows,
}: QuoteLineItemsTableProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Table bordered label={t("quoteLineItemsTable.tableLabel")}>
            <Table.Head>
                <Table.Row>
                    <Table.Header>
                        {t("quoteLineItemsTable.columnItem")}
                    </Table.Header>
                    <Table.Header align="end">
                        {t("quoteLineItemsTable.columnQuantity")}
                    </Table.Header>
                    <Table.Header align="end">
                        {t("quoteLineItemsTable.columnUnitPrice")}
                    </Table.Header>
                    <Table.Header align="end">
                        {t("quoteLineItemsTable.columnAmount")}
                    </Table.Header>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {rows.map((row) => (
                    <QuoteLineItemsTableBodyRow key={row.id} row={row} />
                ))}
            </Table.Body>
        </Table>
    );
}

type QuoteLineItemsTableBodyRowProps = {
    readonly row: QuoteLineItemsTableRow;
};

/**
 * One priced line: the item cell wraps its name and provenance in a `Table.
 * Cell wrap` (so a long name wraps onto a second line instead of forcing
 * the row onto a horizontal scrollbar) while the numeric cells stay
 * single-line and right-aligned.
 */
function QuoteLineItemsTableBodyRow({
    row,
}: QuoteLineItemsTableBodyRowProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Table.Row avoidBreakInside>
            <Table.Cell wrap>
                <Box direction="column" gap="xs">
                    <Text size="base">{row.name}</Text>
                    <Text size="sm" variant="muted">
                        {QuoteLineItemsTableUtils.provenanceLabel(row, t)}
                    </Text>
                </Box>
            </Table.Cell>
            <Table.Cell align="end">
                {QuoteLineItemsTableUtils.quantityDisplayText(row)}
            </Table.Cell>
            <Table.Cell align="end">
                {CurrencyUtils.centsToAudDisplayText(row.unitPriceCents)}
            </Table.Cell>
            <Table.Cell align="end">
                {CurrencyUtils.centsToAudDisplayText(
                    QuoteTotalsUtils.lineAmountCents(
                        row.quantity,
                        row.unitPriceCents,
                    ),
                )}
            </Table.Cell>
        </Table.Row>
    );
}
