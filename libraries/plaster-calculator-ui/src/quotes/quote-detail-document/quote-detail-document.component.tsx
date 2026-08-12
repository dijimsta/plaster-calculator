import type { QuoteStatus } from "@libraries/plaster-calculator-common";
import { QuoteTotalsUtils } from "@libraries/plaster-calculator-common";
import { Box, Card, Paragraph, Table, Text } from "@libraries/uikit-web";
import { CurrencyUtils } from "@libraries/utilities";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";
import { QuoteStatusBadge } from "../quote-status-badge/index.ts";
import { QuoteTotalsBlock } from "../quote-totals-block/index.ts";

import type { QuoteDetailDocumentLineItem } from "./quote-detail-document.types.ts";
import { QuoteDetailDocumentUtils } from "./quote-detail-document.utils.ts";

/**
 * DOM id of the document's root `Card`. The print stylesheet (WORK-118)
 * isolates exactly this element via an `#id` selector when printing, so
 * this constant is the single source of truth both sides coordinate on.
 */
export const QUOTE_DETAIL_DOCUMENT_PRINT_ROOT_ID =
    "quote-detail-document-print-root";

export type QuoteDetailDocumentProps = {
    readonly reference: string | null;
    readonly projectName: string;
    readonly companyName: string | null;
    /** ISO 8601 timestamp shown as the document date. */
    readonly issuedAt: string;
    readonly status: QuoteStatus;
    readonly lineItems: readonly QuoteDetailDocumentLineItem[];
};

/**
 * The printable quote document: header, priced line items with their
 * quantity provenance, and a subtotal/GST/total block. Presentational
 * only — no action buttons or breadcrumb; those belong to the route that
 * hosts this component.
 */
export function QuoteDetailDocument({
    reference,
    projectName,
    companyName,
    issuedAt,
    status,
    lineItems,
}: QuoteDetailDocumentProps): ReactElement {
    const { t } = useQuotesTranslation();
    const totals = QuoteDetailDocumentUtils.totals(lineItems);

    return (
        <Card id={QUOTE_DETAIL_DOCUMENT_PRINT_ROOT_ID}>
            <Box direction="column" gap="lg">
                <Box direction="row" justify="between" align="start" wrap>
                    <Box direction="column" gap="xs">
                        <Card.Title>
                            {`${reference ?? t("quoteDetailDocument.noReference")} · ${projectName}`}
                        </Card.Title>
                        <Paragraph textSize="sm" variant="muted">
                            {`${companyName ?? t("quoteDetailDocument.noCompany")} · ${new Date(issuedAt).toLocaleDateString()}`}
                        </Paragraph>
                    </Box>
                    <QuoteStatusBadge status={status} />
                </Box>
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
                                {t("quoteDetailDocument.columnUnitPrice")}
                            </Table.Header>
                            <Table.Header align="end">
                                {t("quoteDetailDocument.columnAmount")}
                            </Table.Header>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {lineItems.map((item) => (
                            <Table.Row key={item.id} avoidBreakInside>
                                <Table.Cell>
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
                                <Table.Cell align="end">
                                    {item.quantity}
                                </Table.Cell>
                                <Table.Cell align="end">
                                    $
                                    {CurrencyUtils.centsToDollarsText(
                                        item.unitPriceCents,
                                    )}
                                </Table.Cell>
                                <Table.Cell align="end">
                                    $
                                    {CurrencyUtils.centsToDollarsText(
                                        QuoteTotalsUtils.lineAmountCents(
                                            item.quantity,
                                            item.unitPriceCents,
                                        ),
                                    )}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <QuoteTotalsBlock
                    subtotalCents={totals.subtotalCents}
                    gstCents={totals.gstCents}
                    totalIncGstCents={totals.totalIncGstCents}
                />
            </Box>
        </Card>
    );
}
