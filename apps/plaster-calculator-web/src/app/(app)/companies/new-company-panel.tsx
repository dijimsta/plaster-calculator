"use client";

import { Button, Paragraph } from "@libraries/uikit-web";
import { Plus } from "lucide-react";
import { useState, type FormEvent } from "react";

import { CompanyDraftFields } from "./company-draft-fields.js";
import { EMPTY_ACCOUNT_DRAFT } from "./company.types.js";
import { optionalValue } from "./company.utils.js";
import { createCompany } from "../../../lib/api.js";
import { cx, ui } from "../../../lib/styles.js";

import type { CompanyDraft } from "./company.types.js";

interface NewCompanyPanelProps {
    readonly onCreated: () => void;
}

export function NewCompanyPanel({ onCreated }: NewCompanyPanelProps) {
    const [draft, setDraft] = useState<CompanyDraft>(EMPTY_ACCOUNT_DRAFT);
    const [message, setMessage] = useState("");

    async function createNewCompany(event: FormEvent): Promise<void> {
        event.preventDefault();
        const companyName = draft.companyName.trim();
        if (!companyName) return;
        try {
            await createCompany({
                companyName,
                businessNumber: optionalValue(draft.businessNumber),
                phoneNumber: optionalValue(draft.phoneNumber),
            });
            setDraft(EMPTY_ACCOUNT_DRAFT);
            setMessage("Company created.");
            onCreated();
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to create company",
            );
        }
    }

    return (
        <form className={cx(ui.panel, ui.stack)} onSubmit={createNewCompany}>
            <h2>New Company</h2>
            <CompanyDraftFields draft={draft} setDraft={setDraft} />
            <Button variant="primary">
                <Plus size={18} /> Create company
            </Button>
            {message && (
                <Paragraph textSize="sm" variant="muted">
                    {message}
                </Paragraph>
            )}
        </form>
    );
}
