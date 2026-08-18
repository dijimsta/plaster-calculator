"use client";

import { useCompaniesService } from "@libraries/plaster-calculator-web-core";
import { Button, Paragraph } from "@libraries/uikit-web";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";
import { cx, ui } from "../../../lib/styles.js";

import { CompanyDraftFields } from "./company-draft-fields.js";
import { EMPTY_ACCOUNT_DRAFT } from "./company.types.js";
import type { CompanyDraft } from "./company.types.js";
import { optionalValue } from "./company.utils.js";

type NewCompanyPanelProps = {
    /** Seeds the company name field, e.g. from a Companies-page search that
     * found no match. Applied once, on mount -- callers that want to seed a
     * new value should remount this component (e.g. via a changing `key`). */
    readonly initialName?: string;
    readonly onCreated: () => void;
};

export function NewCompanyPanel({
    initialName = "",
    onCreated,
}: NewCompanyPanelProps) {
    const companiesService = useCompaniesService();
    const { t } = useAppTranslation();
    const [draft, setDraft] = useState<CompanyDraft>({
        ...EMPTY_ACCOUNT_DRAFT,
        companyName: initialName,
    });
    const [message, setMessage] = useState("");
    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialName) nameInputRef.current?.focus();
    }, [initialName]);

    async function createNewCompany(event: FormEvent): Promise<void> {
        event.preventDefault();
        const companyName = draft.companyName.trim();
        if (!companyName) return;
        try {
            await companiesService.createCompany({
                companyName,
                businessNumber: optionalValue(draft.businessNumber),
                phoneNumber: optionalValue(draft.phoneNumber),
            });
            setDraft(EMPTY_ACCOUNT_DRAFT);
            setMessage(t("companies.newCompany.created"));
            onCreated();
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : t("companies.newCompany.unableToCreate"),
            );
        }
    }

    return (
        <form className={cx(ui.panel, ui.stack)} onSubmit={createNewCompany}>
            <h2>{t("companies.newCompany.title")}</h2>
            <CompanyDraftFields
                draft={draft}
                setDraft={setDraft}
                nameInputRef={nameInputRef}
            />
            <Button variant="primary">
                <Plus size={18} /> {t("companies.newCompany.create")}
            </Button>
            {message && (
                <Paragraph textSize="sm" variant="muted">
                    {message}
                </Paragraph>
            )}
        </form>
    );
}
