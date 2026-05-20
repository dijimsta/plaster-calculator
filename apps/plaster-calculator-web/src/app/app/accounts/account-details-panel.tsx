"use client";

import { Trash2 } from "lucide-react";
import { type FormEvent } from "react";

import { AccountDetailFields } from "./account-detail-fields.js";
import { cx, ui } from "../../../lib/styles.js";

import type { AccountDetailDraft } from "./account.types.js";
import type { AccountDetail } from "../../../types.js";

interface AccountDetailsPanelProps {
    readonly account: AccountDetail;
    readonly draft: AccountDetailDraft;
    readonly hasAccountChanges: boolean;
    readonly removeAccount: () => Promise<void>;
    readonly saveAccount: (event: FormEvent) => Promise<void>;
    readonly setDraft: (draft: AccountDetailDraft) => void;
}

export function AccountDetailsPanel({
    account,
    draft,
    hasAccountChanges,
    removeAccount,
    saveAccount,
    setDraft,
}: AccountDetailsPanelProps) {
    return (
        <form
            className={cx(ui.panel, ui.stack, "min-w-0")}
            onSubmit={saveAccount}
        >
            <div className={ui.editorToolbar}>
                <h2>Account Details</h2>
                <div className={ui.buttonRow}>
                    <button
                        className={cx(ui.button, ui.buttonPrimary)}
                        disabled={!hasAccountChanges}
                    >
                        Save account
                    </button>
                    <button
                        className={cx(ui.button, ui.buttonDefault)}
                        onClick={() => void removeAccount()}
                        title="Delete account"
                        type="button"
                    >
                        <Trash2 size={18} /> Delete
                    </button>
                </div>
            </div>
            <AccountDetailFields
                contacts={account.contacts}
                draft={draft}
                setDraft={setDraft}
            />
        </form>
    );
}
