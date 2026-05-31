"use client";

import { Button } from "@libraries/uikit-web";
import { LoaderCircle, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { listAccounts } from "../lib/api.js";
import { cx, ui } from "../lib/styles.js";

import type { AccountSummary } from "../types.js";

interface AccountSelectProps {
    readonly selectedAccountId: string | null;
    readonly onChange: (accountId: string | null) => void;
    readonly disabled?: boolean;
    readonly label?: string;
    readonly placeholder?: string;
    readonly selectedAccountLabel?: string | null;
}

interface AccountSelectMenuProps {
    readonly error: string;
    readonly filtered: readonly AccountSummary[];
    readonly isLoading: boolean;
    readonly onSelect: (account: AccountSummary) => void;
}

export function AccountSelect({
    selectedAccountId,
    onChange,
    disabled = false,
    label = "Account",
    placeholder = "Search accounts",
    selectedAccountLabel = null,
}: AccountSelectProps) {
    const [accounts, setAccounts] = useState<AccountSummary[] | null>(null);
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const selectedAccount = useMemo(
        () => accounts?.find((account) => account.id === selectedAccountId),
        [accounts, selectedAccountId],
    );
    const filtered = useMemo(
        () => filterAccounts(accounts ?? [], query),
        [accounts, query],
    );

    async function ensureLoaded(): Promise<void> {
        if (accounts || isLoading) return;
        setIsLoading(true);
        setError("");
        try {
            setAccounts(await listAccounts());
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Unable to load accounts",
            );
        } finally {
            setIsLoading(false);
        }
    }

    function selectAccount(account: AccountSummary): void {
        onChange(account.id);
        setQuery(account.companyName);
        setIsOpen(false);
    }

    function clearAccount(): void {
        onChange(null);
        setQuery("");
        setIsOpen(false);
    }

    return (
        <div className={cx(ui.field, "relative")}>
            <label htmlFor="account-select">{label}</label>
            <div className="relative">
                <Search
                    size={16}
                    className="absolute left-[11px] top-[13px] text-slate-500 dark:text-slate-400"
                />
                <input
                    id="account-select"
                    className={cx(ui.input, "pl-[34px] pr-11")}
                    disabled={disabled}
                    value={accountInputValue(
                        isOpen,
                        query,
                        selectedAccount,
                        selectedAccountLabel,
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
                                selectedAccount?.companyName ??
                                    selectedAccountLabel ??
                                    "",
                            );
                        }
                        setIsOpen(true);
                        void ensureLoaded();
                    }}
                    placeholder={placeholder}
                />
                {selectedAccountId && (
                    <button
                        className={cx(
                            ui.button,
                            ui.buttonDefault,
                            ui.buttonIcon,
                            "absolute right-1 top-1 h-8 min-h-8 w-8",
                        )}
                        disabled={disabled}
                        onClick={clearAccount}
                        title="Clear account"
                        type="button"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>
            {isOpen && !disabled && (
                <div
                    className={cx(ui.popoverMenu, "left-0 right-0 top-[74px]")}
                >
                    <AccountSelectMenu
                        error={error}
                        filtered={filtered}
                        isLoading={isLoading}
                        onSelect={selectAccount}
                    />
                </div>
            )}
        </div>
    );
}

function AccountSelectMenu({
    error,
    filtered,
    isLoading,
    onSelect,
}: AccountSelectMenuProps) {
    if (isLoading) {
        return (
            <div className={cx(ui.muted, "flex items-center gap-2")}>
                <LoaderCircle className="animate-spin" size={16} />
                Loading accounts...
            </div>
        );
    }

    if (error) {
        return <p className={ui.error}>{error}</p>;
    }

    if (filtered.length === 0) {
        return <p className={ui.muted}>No matching accounts.</p>;
    }

    return (
        <>
            {filtered.map((account) => (
                <Button
                    key={account.id}
                    variant="secondary"
                    className="w-full justify-start text-left"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => onSelect(account)}
                    type="button"
                >
                    <span className="grid gap-0.5">
                        <strong>{account.companyName}</strong>
                        <span className={ui.muted}>
                            {account.businessNumber ||
                                account.phoneNumber ||
                                "No account details"}
                        </span>
                    </span>
                </Button>
            ))}
        </>
    );
}

function accountInputValue(
    isOpen: boolean,
    query: string,
    selectedAccount: AccountSummary | undefined,
    selectedAccountLabel: string | null,
): string {
    if (isOpen) return query;
    return selectedAccount?.companyName ?? selectedAccountLabel ?? query;
}

function filterAccounts(
    accounts: readonly AccountSummary[],
    query: string,
): AccountSummary[] {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [...accounts];
    return accounts.filter((account) =>
        account.companyName.toLowerCase().includes(normalizedQuery),
    );
}
