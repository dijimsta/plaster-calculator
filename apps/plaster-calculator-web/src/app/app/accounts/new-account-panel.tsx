"use client";

import { Button } from "@libraries/uikit-web";
import { Plus } from "lucide-react";
import { useState, type FormEvent } from "react";

import { AccountDraftFields } from "./account-draft-fields.js";
import { EMPTY_ACCOUNT_DRAFT } from "./account.types.js";
import { optionalValue } from "./account.utils.js";
import { createAccount } from "../../../lib/api.js";
import { cx, ui } from "../../../lib/styles.js";

import type { AccountDraft } from "./account.types.js";

interface NewAccountPanelProps {
    readonly onCreated: () => void;
}

export function NewAccountPanel({ onCreated }: NewAccountPanelProps) {
    const [draft, setDraft] = useState<AccountDraft>(EMPTY_ACCOUNT_DRAFT);
    const [message, setMessage] = useState("");

    async function createNewAccount(event: FormEvent): Promise<void> {
        event.preventDefault();
        const companyName = draft.companyName.trim();
        if (!companyName) return;
        try {
            await createAccount({
                companyName,
                businessNumber: optionalValue(draft.businessNumber),
                phoneNumber: optionalValue(draft.phoneNumber),
            });
            setDraft(EMPTY_ACCOUNT_DRAFT);
            setMessage("Account created.");
            onCreated();
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to create account",
            );
        }
    }

    return (
        <form className={cx(ui.panel, ui.stack)} onSubmit={createNewAccount}>
            <h2>New Account</h2>
            <AccountDraftFields draft={draft} setDraft={setDraft} />
            <Button variant="primary">
                <Plus size={18} /> Create account
            </Button>
            {message && <p className={ui.muted}>{message}</p>}
        </form>
    );
}
