import { Box, Button, EmptyState, Table, Text } from "@libraries/uikit-web";
import { CurrencyUtils } from "@libraries/utilities";
import { Download, Receipt } from "lucide-react";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";
import { QuoteStatusBadge } from "../quote-status-badge/index.ts";

import type { QuotesTableRow } from "./quotes-table.types.ts";

export type QuotesTableProps = {
    readonly rows: readonly QuotesTableRow[];
    readonly onOpen: (quoteId: string) => void;
    readonly onDownload: (quoteId: string) => void;
};

/** The all-quotes table: one row per quote, with a count line and empty state. */
export function QuotesTable({
    rows,
    onOpen,
    onDownload,
}: QuotesTableProps): ReactElement {
    const { t } = useQuotesTranslation();

    if (rows.length === 0) {
        return (
            <EmptyState
                icon={<Receipt />}
                title={t("quotesPage.emptyStateTitle")}
                description={t("quotesPage.emptyStateDescription")}
            />
        );
    }

    return (
        <Box direction="column" gap="sm">
            <Text size="sm" variant="muted">
                {t("quotesTable.quoteCount", { count: rows.length })}
            </Text>
            <Table bordered label={t("quotesTable.tableLabel")}>
                <Table.Head>
                    <Table.Row>
                        <Table.Header>
                            {t("quotesTable.columnQuote")}
                        </Table.Header>
                        <Table.Header>
                            {t("quotesTable.columnProject")}
                        </Table.Header>
                        <Table.Header>
                            {t("quotesTable.columnCompany")}
                        </Table.Header>
                        <Table.Header>
                            {t("quotesTable.columnStatus")}
                        </Table.Header>
                        <Table.Header align="end">
                            {t("quotesTable.columnTotal")}
                        </Table.Header>
                        <Table.Header align="end">
                            {t("quotesTable.columnDate")}
                        </Table.Header>
                        <Table.Header fit />
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {rows.map((row) => (
                        <QuotesTableBodyRow
                            key={row.quoteId}
                            row={row}
                            onOpen={onOpen}
                            onDownload={onDownload}
                        />
                    ))}
                </Table.Body>
            </Table>
        </Box>
    );
}

type QuotesTableBodyRowProps = {
    readonly row: QuotesTableRow;
    readonly onOpen: (quoteId: string) => void;
    readonly onDownload: (quoteId: string) => void;
};

function QuotesTableBodyRow({
    row,
    onOpen,
    onDownload,
}: QuotesTableBodyRowProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Table.Row onClick={() => onOpen(row.quoteId)}>
            <Table.Cell>{row.reference ?? "—"}</Table.Cell>
            <Table.Cell>
                <Text truncate>{row.projectName}</Text>
            </Table.Cell>
            <Table.Cell>
                <Text truncate variant="muted">
                    {row.companyName ?? "—"}
                </Text>
            </Table.Cell>
            <Table.Cell>
                <QuoteStatusBadge status={row.status} />
            </Table.Cell>
            <Table.Cell align="end">
                ${CurrencyUtils.centsToDollarsText(row.totalIncGstCents)}
            </Table.Cell>
            <Table.Cell align="end">
                {new Date(row.createdAt).toLocaleDateString()}
            </Table.Cell>
            <Table.Cell fit>
                <Button
                    variant="secondary"
                    size="small"
                    label={t("quotesTable.downloadAction", {
                        reference: row.reference ?? row.projectName,
                    })}
                    icon={<Download size={16} aria-hidden="true" />}
                    onClick={(event) => {
                        event.stopPropagation();
                        onDownload(row.quoteId);
                    }}
                />
            </Table.Cell>
        </Table.Row>
    );
}
