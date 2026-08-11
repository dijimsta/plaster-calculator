"use client";

import { useCompaniesService } from "@libraries/plaster-calculator-web-core";
import { Button, Paragraph, Text } from "@libraries/uikit-web";
import { LoaderCircle, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { useAppTranslation } from "../i18n/index.ts";
import { cx, ui } from "../lib/styles.js";
import type { CompanySummary } from "../types.js";

interface CompanySelectProps {
    readonly selectedCompanyId: string | null;
    readonly onChange: (companyId: string | null) => void;
    readonly disabled?: boolean;
    readonly label?: string;
    readonly placeholder?: string;
    readonly selectedCompanyLabel?: string | null;
}

interface CompanySelectMenuProps {
    readonly error: string;
    readonly filtered: readonly CompanySummary[];
    readonly isLoading: boolean;
    readonly onSelect: (company: CompanySummary) => void;
}

export function CompanySelect({
    selectedCompanyId,
    onChange,
    disabled = false,
    label,
    placeholder,
    selectedCompanyLabel = null,
}: CompanySelectProps) {
    const { t } = useAppTranslation();
    const resolvedLabel = label ?? t("companySelect.label");
    const resolvedPlaceholder = placeholder ?? t("companySelect.placeholder");
    const companiesService = useCompaniesService();
    const [companies, setCompanies] = useState<CompanySummary[] | null>(null);
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const selectedCompany = useMemo(
        () => companies?.find((company) => company.id === selectedCompanyId),
        [companies, selectedCompanyId],
    );
    const filtered = useMemo(
        () => filterCompanies(companies ?? [], query),
        [companies, query],
    );

    async function ensureLoaded(): Promise<void> {
        if (companies || isLoading) return;
        setIsLoading(true);
        setError("");
        try {
            setCompanies(await companiesService.listCompanies());
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : t("companySelect.unableToLoadCompanies"),
            );
        } finally {
            setIsLoading(false);
        }
    }

    function selectCompany(company: CompanySummary): void {
        onChange(company.id);
        setQuery(company.companyName);
        setIsOpen(false);
    }

    function clearCompany(): void {
        onChange(null);
        setQuery("");
        setIsOpen(false);
    }

    return (
        <div className={cx(ui.field, "relative")}>
            <label htmlFor="company-select">{resolvedLabel}</label>
            <div className="relative">
                <Search
                    size={16}
                    className="absolute left-[11px] top-[13px] text-slate-500 dark:text-slate-400"
                />
                <input
                    id="company-select"
                    className={cx(ui.input, "pl-[34px] pr-11")}
                    disabled={disabled}
                    value={companyInputValue(
                        isOpen,
                        query,
                        selectedCompany,
                        selectedCompanyLabel,
                    )}
                    onBlur={() => {
                        window.setTimeout(() => setIsOpen(false), 120);
                    }}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        setIsOpen(true);
                        void ensureLoaded();
                    }}
                    onFocus={() => {
                        if (!query) {
                            setQuery(
                                selectedCompany?.companyName ??
                                    selectedCompanyLabel ??
                                    "",
                            );
                        }
                        setIsOpen(true);
                        void ensureLoaded();
                    }}
                    placeholder={resolvedPlaceholder}
                />
                {selectedCompanyId && (
                    <div className="absolute right-1 top-1">
                        <Button
                            variant="secondary"
                            size="small"
                            icon={<X size={14} aria-hidden="true" />}
                            disabled={disabled}
                            onClick={clearCompany}
                            label={t("companySelect.clearCompany")}
                            type="button"
                        />
                    </div>
                )}
            </div>
            {isOpen && !disabled && (
                <div
                    className={cx(ui.popoverMenu, "left-0 right-0 top-[74px]")}
                >
                    <CompanySelectMenu
                        error={error}
                        filtered={filtered}
                        isLoading={isLoading}
                        onSelect={selectCompany}
                    />
                </div>
            )}
        </div>
    );
}

function CompanySelectMenu({
    error,
    filtered,
    isLoading,
    onSelect,
}: CompanySelectMenuProps) {
    const { t } = useAppTranslation();

    if (isLoading) {
        return (
            <div className="flex items-center gap-2">
                <LoaderCircle className="animate-spin" size={16} />
                <Text size="sm" variant="muted">
                    Loading companies...
                </Text>
            </div>
        );
    }

    if (error) {
        return <p className={ui.error}>{error}</p>;
    }

    if (filtered.length === 0) {
        return (
            <Paragraph textSize="sm" variant="muted">
                No matching companies.
            </Paragraph>
        );
    }

    return (
        <>
            {filtered.map((company) => (
                <Button
                    key={company.id}
                    variant="secondary"
                    align="start"
                    fullWidth
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => onSelect(company)}
                    type="button"
                >
                    <span className="grid gap-0.5">
                        <strong>{company.companyName}</strong>
                        <Text size="sm" variant="muted">
                            {company.businessNumber ||
                                company.phoneNumber ||
                                t("companySelect.noCompanyDetails")}
                        </Text>
                    </span>
                </Button>
            ))}
        </>
    );
}

function companyInputValue(
    isOpen: boolean,
    query: string,
    selectedCompany: CompanySummary | undefined,
    selectedCompanyLabel: string | null,
): string {
    if (isOpen) return query;
    return selectedCompany?.companyName ?? selectedCompanyLabel ?? query;
}

function filterCompanies(
    companies: readonly CompanySummary[],
    query: string,
): CompanySummary[] {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [...companies];
    return companies.filter((company) =>
        company.companyName.toLowerCase().includes(normalizedQuery),
    );
}
