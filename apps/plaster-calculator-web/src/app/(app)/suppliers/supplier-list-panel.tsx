"use client";

import { useSuppliers } from "@libraries/plaster-calculator-web-core";
import type { Supplier } from "@libraries/plaster-calculator-web-core";
import {
    Box,
    Button,
    EmptyState,
    Heading2,
    Input,
    Label,
    Pagination,
    Paragraph,
    Table,
    Text,
} from "@libraries/uikit-web";
import { LoaderCircle, Plus, Search, Truck } from "lucide-react";
import { useEffect, useState } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";
import { cx, ui } from "../../../lib/styles.js";

import { SupplierRow } from "./supplier-row.js";
import { useQuoteItemTemplateCatalog } from "./use-quote-item-template-catalog.hook.ts";

/** Suppliers shown per page. */
const PAGE_SIZE = 20;
/** How long to wait after the last keystroke before searching the server. */
const SEARCH_DEBOUNCE_MS = 300;

type SupplierListPanelProps = {
    /** Invoked with the trimmed search term when the user asks to create a
     * supplier from an empty search result. */
    readonly onCreateFromSearch: (name: string) => void;
};

export function SupplierListPanel({
    onCreateFromSearch,
}: SupplierListPanelProps) {
    const { t } = useAppTranslation();
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [page, setPage] = useState(1);
    const { itemTemplates } = useQuoteItemTemplateCatalog();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedQuery(query);
        }, SEARCH_DEBOUNCE_MS);
        return () => clearTimeout(timeoutId);
    }, [query]);

    useEffect(() => {
        setPage(1);
    }, [debouncedQuery]);

    // `limit: PAGE_SIZE + 1` asks for one row past the page size, the same
    // "fetch N+1" technique `CompanyListPanel` uses -- there is no
    // total-count query, so a fuller-than-`PAGE_SIZE` response is how the
    // panel learns another page exists.
    const { suppliers, loading, error } = useSuppliers({
        search: debouncedQuery || undefined,
        limit: PAGE_SIZE + 1,
        offset: (page - 1) * PAGE_SIZE,
    });
    const pageSuppliers = (suppliers ?? []).slice(0, PAGE_SIZE);
    const hasNextPage = (suppliers?.length ?? 0) > PAGE_SIZE;
    const pageCount = hasNextPage ? page + 1 : page;

    return (
        <section className={cx(ui.panel, ui.stack)}>
            <div className={ui.editorToolbar}>
                <Heading2>{t("suppliers.list.title")}</Heading2>
                <div className="grid gap-1.5">
                    <Label htmlFor="supplier-search">
                        {t("suppliers.list.search")}
                    </Label>
                    <Input
                        id="supplier-search"
                        leadingIcon={
                            <Search
                                size={16}
                                className="text-gray-400 dark:text-gray-500"
                            />
                        }
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>
            {error && (
                <Paragraph textSize="sm" variant="muted">
                    {error.message || t("suppliers.list.unableToLoad")}
                </Paragraph>
            )}
            <SupplierListPanelBody
                loading={loading}
                suppliers={pageSuppliers}
                debouncedQuery={debouncedQuery}
                totalItemCount={itemTemplates.length}
                onCreateFromSearch={onCreateFromSearch}
            />
            {!loading && pageCount > 1 && (
                <Pagination
                    page={page}
                    pageCount={pageCount}
                    onPageChange={setPage}
                    label={t("suppliers.list.paginationLabel")}
                />
            )}
        </section>
    );
}

type SupplierListPanelBodyProps = {
    readonly loading: boolean;
    readonly suppliers: readonly Supplier[];
    readonly debouncedQuery: string;
    readonly totalItemCount: number;
    readonly onCreateFromSearch: (name: string) => void;
};

/** Split out of `SupplierListPanel` so its loading/empty/table branching
 * stays within this workspace's complexity limit, the same reason
 * `CompanyProjectsPanelBody` is split out of `CompanyProjectsPanel`. */
function SupplierListPanelBody({
    loading,
    suppliers,
    debouncedQuery,
    totalItemCount,
    onCreateFromSearch,
}: SupplierListPanelBodyProps) {
    const { t } = useAppTranslation();
    const trimmedQuery = debouncedQuery.trim();

    if (loading) {
        return (
            <Box align="center" justify="center" gap="sm" status>
                <LoaderCircle className="animate-spin" size={24} />
                <Text size="sm" variant="muted">
                    {t("suppliers.list.loading")}
                </Text>
            </Box>
        );
    }

    if (suppliers.length === 0) {
        return (
            <EmptyState
                icon={<Truck />}
                title={t("suppliers.list.emptyStateTitle")}
                actions={
                    trimmedQuery ? (
                        <Button
                            variant="secondary"
                            icon={<Plus size={16} aria-hidden="true" />}
                            onClick={() => onCreateFromSearch(trimmedQuery)}
                            type="button"
                        >
                            {t("suppliers.list.createFromSearch", {
                                name: trimmedQuery,
                            })}
                        </Button>
                    ) : undefined
                }
            />
        );
    }

    return (
        <Table bordered label={t("suppliers.list.title")}>
            <Table.Head>
                <Table.Row>
                    <Table.Header>
                        {t("suppliers.fields.supplierName")}
                    </Table.Header>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {suppliers.map((supplier) => (
                    <SupplierRow
                        key={supplier.id}
                        supplier={supplier}
                        totalItemCount={totalItemCount}
                    />
                ))}
            </Table.Body>
        </Table>
    );
}
