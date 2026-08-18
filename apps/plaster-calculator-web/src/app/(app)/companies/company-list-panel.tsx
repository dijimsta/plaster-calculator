"use client";

import { useCompaniesService } from "@libraries/plaster-calculator-web-core";
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
import {
    Building2,
    LoaderCircle,
    Plus,
    RefreshCcw,
    Search,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";
import { cx, ui } from "../../../lib/styles.js";
import type { CompanySummary } from "../../../types.js";

import { CompanyRow } from "./company-row.js";

/** Companies shown per page. */
const PAGE_SIZE = 20;
/** How long to wait after the last keystroke before searching the server. */
const SEARCH_DEBOUNCE_MS = 300;

type CompanyListPanelProps = {
    readonly refreshKey: number;
    /** Invoked with the trimmed search term when the user asks to create a
     * company from an empty search result. */
    readonly onCreateFromSearch: (name: string) => void;
};

export function CompanyListPanel({
    refreshKey,
    onCreateFromSearch,
}: CompanyListPanelProps) {
    const companiesService = useCompaniesService();
    const { t } = useAppTranslation();
    const [companies, setCompanies] = useState<CompanySummary[]>([]);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedQuery(query);
        }, SEARCH_DEBOUNCE_MS);
        return () => clearTimeout(timeoutId);
    }, [query]);

    useEffect(() => {
        setPage(1);
    }, [debouncedQuery]);

    useEffect(() => {
        void refresh();
    }, [refreshKey, debouncedQuery, page, companiesService]);

    async function refresh(): Promise<void> {
        setIsLoading(true);
        setMessage("");
        try {
            const nextCompanies = await companiesService.listCompanies({
                search: debouncedQuery || undefined,
                limit: PAGE_SIZE + 1,
                offset: (page - 1) * PAGE_SIZE,
            });
            const hasNextPage = nextCompanies.length > PAGE_SIZE;
            setCompanies(nextCompanies.slice(0, PAGE_SIZE));
            setPageCount(hasNextPage ? page + 1 : page);
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : t("companies.list.unableToLoad"),
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className={cx(ui.panel, ui.stack)}>
            <div className={ui.editorToolbar}>
                <Heading2>{t("companies.list.title")}</Heading2>
                <div className={cx(ui.buttonRow, "items-end")}>
                    <div className="grid gap-1.5">
                        <Label htmlFor="company-search">
                            {t("companies.list.search")}
                        </Label>
                        <Input
                            id="company-search"
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
                    <Button
                        variant="secondary"
                        onClick={() => void refresh()}
                        title={t("companies.list.refreshTitle")}
                        type="button"
                    >
                        <RefreshCcw size={18} /> {t("companies.list.refresh")}
                    </Button>
                </div>
            </div>
            {message && (
                <Paragraph textSize="sm" variant="muted">
                    {message}
                </Paragraph>
            )}
            {isLoading ? (
                <Box align="center" justify="center" gap="sm" status>
                    <LoaderCircle className="animate-spin" size={24} />
                    <Text size="sm" variant="muted">
                        {t("companies.list.loading")}
                    </Text>
                </Box>
            ) : companies.length === 0 ? (
                <EmptyState
                    icon={<Building2 />}
                    title={t("companies.list.emptyStateTitle")}
                    actions={
                        debouncedQuery.trim() ? (
                            <Button
                                variant="secondary"
                                icon={<Plus size={16} aria-hidden="true" />}
                                onClick={() =>
                                    onCreateFromSearch(debouncedQuery.trim())
                                }
                                type="button"
                            >
                                {t("companies.list.createFromSearch", {
                                    name: debouncedQuery.trim(),
                                })}
                            </Button>
                        ) : undefined
                    }
                />
            ) : (
                <Table bordered label={t("companies.list.title")}>
                    <Table.Head>
                        <Table.Row>
                            <Table.Header>
                                {t("companies.fields.companyName")}
                            </Table.Header>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {companies.map((company) => (
                            <CompanyRow key={company.id} company={company} />
                        ))}
                    </Table.Body>
                </Table>
            )}
            {!isLoading && pageCount > 1 && (
                <Pagination
                    page={page}
                    pageCount={pageCount}
                    onPageChange={setPage}
                    label={t("companies.list.paginationLabel")}
                />
            )}
        </section>
    );
}
