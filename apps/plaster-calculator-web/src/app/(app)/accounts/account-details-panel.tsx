"use client";

import { Button } from "@libraries/uikit-web";
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
                    <Button variant="primary" disabled={!hasAccountChanges}>
                        Save account
                    </Button>
                    <Button
                        variant="secondary"
                        icon={<Trash2 size={18} aria-hidden="true" />}
                        onClick={() => void removeAccount()}
                        title="Delete account"
                        type="button"
                    >
                        Delete
                    </Button>
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
