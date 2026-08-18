"use client";

import { useCompaniesService } from "@libraries/plaster-calculator-web-core";
import { Button } from "@libraries/uikit-web";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

import { useAppTranslation } from "../i18n/index.ts";
import { cx, ui } from "../lib/styles.js";
import type { CompanySummary } from "../types.js";

import { CompanyCreatePanel } from "./company-select-create-panel.js";
import { CompanySelectMenu } from "./company-select-menu.js";
import {
    EMPTY_CREATE_DRAFT,
    type CompanyCreateDraft,
    type CompanySelectProps,
} from "./company-select.types.js";
import {
    companyInputValue,
    findNearMatches,
    trimmedOrNull,
} from "./company-select.utils.js";

/** Matching companies shown per debounced search. */
const SEARCH_RESULT_LIMIT = 20;
/** How long to wait after the last keystroke before searching the server. */
const SEARCH_DEBOUNCE_MS = 300;

export function CompanySelect({
    selectedCompanyId,
    onChange,
    disabled = false,
    label,
    placeholder,
    selectedCompanyLabel = null,
    onCreated,
    onCreatePendingChange,
}: CompanySelectProps) {
    const { t } = useAppTranslation();
    const resolvedLabel = label ?? t("companySelect.label");
    const resolvedPlaceholder = placeholder ?? t("companySelect.placeholder");
    const companiesService = useCompaniesService();
    const [companies, setCompanies] = useState<CompanySummary[]>([]);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [createDraft, setCreateDraft] =
        useState<CompanyCreateDraft>(EMPTY_CREATE_DRAFT);
    const [createError, setCreateError] = useState("");
    const [isSubmittingCreate, setIsSubmittingCreate] = useState(false);

    // Closing the popover on blur is deferred so a click on a menu button can
    // preventDefault its mousedown and keep focus on the search input (see
    // below). Once create mode renders its own inputs, focus genuinely moves
    // to them, which would otherwise trigger this same deferred close mid-
    // edit. The ref lets the deferred callback re-check the latest mode
    // rather than the mode captured when blur fired.
    const isCreatingRef = useRef(isCreating);
    isCreatingRef.current = isCreating;

    const selectedCompany = useMemo(
        () => companies.find((company) => company.id === selectedCompanyId),
        [companies, selectedCompanyId],
    );
    const nearMatches = useMemo(
        () => findNearMatches(companies, createDraft.companyName),
        [companies, createDraft.companyName],
    );

    // Debounce the raw query before it drives a server search, matching the
    // pattern used by the Companies list page's own search box.
    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setDebouncedQuery(query);
        }, SEARCH_DEBOUNCE_MS);
        return () => window.clearTimeout(timeoutId);
    }, [query]);

    // Re-searches whenever the debounced term changes while the popover is
    // open. Bails out while closed so typing elsewhere on the page (or the
    // popover being dismissed) doesn't trigger a request.
    useEffect(() => {
        if (!isOpen) return;
        void search(debouncedQuery);
    }, [isOpen, debouncedQuery, companiesService]);

    async function search(term: string): Promise<void> {
        setIsLoading(true);
        setError("");
        try {
            setCompanies(
                await companiesService.listCompanies({
                    search: term.trim() || undefined,
                    limit: SEARCH_RESULT_LIMIT,
                }),
            );
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
        setIsCreating(false);
    }

    function clearCompany(): void {
        onChange(null);
        setQuery("");
        setIsOpen(false);
    }

    function startCreate(): void {
        setCreateDraft({ ...EMPTY_CREATE_DRAFT, companyName: query.trim() });
        setCreateError("");
        setIsCreating(true);
    }

    function cancelCreate(): void {
        setIsCreating(false);
        setCreateError("");
    }

    async function submitCreate(event: FormEvent): Promise<void> {
        event.preventDefault();
        const companyName = createDraft.companyName.trim();
        if (!companyName) {
            setCreateError(t("companySelect.nameRequired"));
            return;
        }
        setIsSubmittingCreate(true);
        onCreatePendingChange?.(true);
        setCreateError("");
        try {
            const created = await companiesService.createCompany({
                companyName,
                businessNumber: trimmedOrNull(createDraft.businessNumber),
                phoneNumber: trimmedOrNull(createDraft.phoneNumber),
            });
            setCompanies((current) => [...current, created]);
            onCreated?.(created);
            selectCompany(created);
            setCreateDraft(EMPTY_CREATE_DRAFT);
        } catch (err) {
            setCreateError(
                err instanceof Error
                    ? err.message
                    : t("companySelect.unableToCreateCompany"),
            );
        } finally {
            setIsSubmittingCreate(false);
            onCreatePendingChange?.(false);
        }
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
                        window.setTimeout(() => {
                            if (!isCreatingRef.current) setIsOpen(false);
                        }, 120);
                    }}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        setIsOpen(true);
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
                    {isCreating ? (
                        <CompanyCreatePanel
                            draft={createDraft}
                            setDraft={setCreateDraft}
                            error={createError}
                            isSubmitting={isSubmittingCreate}
                            suggestions={nearMatches}
                            onSubmit={submitCreate}
                            onUseSuggestion={selectCompany}
                            onCancel={cancelCreate}
                        />
                    ) : (
                        <CompanySelectMenu
                            error={error}
                            filtered={companies}
                            isLoading={isLoading}
                            onSelect={selectCompany}
                            onStartCreate={startCreate}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
