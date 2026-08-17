"use client";

import { useCompaniesService } from "@libraries/plaster-calculator-web-core";
import {
    Button,
    EmptyState,
    Input,
    Label,
    Paragraph,
    Text,
} from "@libraries/uikit-web";
import {
    Building2,
    LoaderCircle,
    Plus,
    RefreshCcw,
    Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";
import { cx, ui } from "../../../lib/styles.js";
import type { CompanySummary } from "../../../types.js";

import { CompanyRow } from "./company-row.js";
import { filterCompanies } from "./company.utils.js";

interface CompanyListPanelProps {
    readonly refreshKey: number;
    /** Invoked with the trimmed search term when the user asks to create a
     * company from an empty search result. */
    readonly onCreateFromSearch: (name: string) => void;
}

export function CompanyListPanel({
    refreshKey,
    onCreateFromSearch,
}: CompanyListPanelProps) {
    const companiesService = useCompaniesService();
    const { t } = useAppTranslation();
    const [companies, setCompanies] = useState<CompanySummary[]>([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        void refresh();
    }, [refreshKey, companiesService]);

    const filtered = useMemo(
        () => filterCompanies(companies, query),
        [companies, query],
    );
    async function refresh(): Promise<void> {
        setIsLoading(true);
        setMessage("");
        try {
            const nextCompanies = await companiesService.listCompanies();
            setCompanies(nextCompanies);
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
                <h2>{t("companies.list.title")}</h2>
                <div className={cx(ui.buttonRow, "items-end")}>
                    <div className="grid gap-1.5 min-w-[260px]">
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
                <div className={ui.projectListState}>
                    <LoaderCircle className="animate-spin" size={24} />
                    <Text size="sm" variant="muted">
                        {t("companies.list.loading")}
                    </Text>
                </div>
            ) : (
                <div className={ui.projectList}>
                    {filtered.map((company) => (
                        <CompanyRow key={company.id} company={company} />
                    ))}
                    {filtered.length === 0 && (
                        <EmptyState
                            icon={<Building2 />}
                            title={t("companies.list.emptyStateTitle")}
                            actions={
                                query.trim() ? (
                                    <Button
                                        variant="secondary"
                                        icon={
                                            <Plus
                                                size={16}
                                                aria-hidden="true"
                                            />
                                        }
                                        onClick={() =>
                                            onCreateFromSearch(query.trim())
                                        }
                                        type="button"
                                    >
                                        {t("companies.list.createFromSearch", {
                                            name: query.trim(),
                                        })}
                                    </Button>
                                ) : undefined
                            }
                        />
                    )}
                </div>
            )}
        </section>
    );
}
