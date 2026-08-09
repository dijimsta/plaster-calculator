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
import { Building2, LoaderCircle, RefreshCcw, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { cx, ui } from "../../../lib/styles.js";
import type { CompanySummary } from "../../../types.js";

import { CompanyRow } from "./company-row.js";
import { filterCompanies } from "./company.utils.js";

interface CompanyListPanelProps {
    readonly refreshKey: number;
}

export function CompanyListPanel({ refreshKey }: CompanyListPanelProps) {
    const companiesService = useCompaniesService();
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
                    : "Unable to load companies",
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className={cx(ui.panel, ui.stack)}>
            <div className={ui.editorToolbar}>
                <h2>Company List</h2>
                <div className={cx(ui.buttonRow, "items-end")}>
                    <div className="grid gap-1.5 min-w-[260px]">
                        <Label htmlFor="company-search">Search</Label>
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
                        title="Refresh company list"
                        type="button"
                    >
                        <RefreshCcw size={18} /> Refresh
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
                        Loading companies...
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
                            title="No companies found"
                        />
                    )}
                </div>
            )}
        </section>
    );
}
