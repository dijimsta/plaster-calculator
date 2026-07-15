"use client";

import { Button } from "@libraries/uikit-web";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

import { AccountSelect } from "../../../components/account-select.js";
import { getAccount } from "../../../lib/api.js";
import { cx, ui } from "../../../lib/styles.js";

import type { AccountDetail } from "../../../types.js";

interface ProjectAccountPanelProps {
    readonly accountId: string | null;
    readonly draftAccountId: string | null;
    readonly isSaving: boolean;
    readonly saveAccount: () => Promise<void>;
    readonly setDraftAccountId: (accountId: string | null) => void;
}

export function ProjectAccountPanel({
    accountId,
    draftAccountId,
    isSaving,
    saveAccount,
    setDraftAccountId,
}: ProjectAccountPanelProps) {
    const [account, setAccount] = useState<AccountDetail | null>(null);
    const [isEditing, setIsEditing] = useState(!accountId);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsEditing(!accountId);
        setDraftAccountId(accountId);
        void loadAccount(accountId);
    }, [accountId]);

    async function loadAccount(nextAccountId: string | null): Promise<void> {
        setAccount(null);
        setError("");
        if (!nextAccountId) return;
        try {
            setAccount(await getAccount(nextAccountId));
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Unable to load account",
            );
        }
    }

    async function save(): Promise<void> {
        try {
            await saveAccount();
            setIsEditing(false);
        } catch {
            // Parent page owns the visible error state.
        }
    }

    function cancelEdit(): void {
        setDraftAccountId(accountId);
        setIsEditing(!accountId);
    }

    return (
        <div className={ui.stack}>
            {isEditing ? (
                <>
                    <AccountSelect
                        selectedAccountId={draftAccountId}
                        onChange={setDraftAccountId}
                        disabled={isSaving}
                        label="Project account"
                        placeholder="Search account by company name"
                        selectedAccountLabel={account?.companyName ?? null}
                    />
                    <div className={ui.buttonRow}>
                        <Button
                            variant="primary"
                            disabled={
                                !draftAccountId ||
                                draftAccountId === accountId ||
                                isSaving
                            }
                            onClick={() => void save()}
                            type="button"
                        >
                            Save account
                        </Button>
                        {accountId && (
                            <Button
                                variant="secondary"
                                disabled={isSaving}
                                onClick={cancelEdit}
                                type="button"
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <AccountSummary account={account} error={error} />
                    {accountId && (
                        <Button
                            variant="secondary"
                            icon={<Pencil size={18} aria-hidden="true" />}
                            onClick={() => setIsEditing(true)}
                            aria-label="Edit project account"
                            type="button"
                        />
                    )}
                </>
            )}
        </div>
    );
}

function AccountSummary({
    account,
    error,
}: {
    readonly account: AccountDetail | null;
    readonly error: string;
}) {
    if (error) return <p className={ui.error}>{error}</p>;
    if (!account) return <p className={ui.muted}>Loading account...</p>;
    return (
        <div className={ui.metric}>
            <strong>{account.companyName}</strong>
            <span className={cx(ui.muted, "block")}>
                {account.businessNumber || account.phoneNumber || "No details"}
            </span>
        </div>
    );
}
