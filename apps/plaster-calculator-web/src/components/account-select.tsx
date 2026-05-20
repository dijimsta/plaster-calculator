"use client";

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
                    value={
                        isOpen
                            ? query
                            : (selectedAccount?.companyName ??
                              selectedAccountLabel ??
                              query)
                    }
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
                    {isLoading && (
                        <div
                            className={cx(ui.muted, "flex items-center gap-2")}
                        >
                            <LoaderCircle className="animate-spin" size={16} />
                            Loading accounts...
                        </div>
                    )}
                    {error && <p className={ui.error}>{error}</p>}
                    {!isLoading &&
                        !error &&
                        filtered.map((account) => (
                            <button
                                key={account.id}
                                className={cx(
                                    ui.button,
                                    ui.buttonDefault,
                                    "justify-start text-left",
                                )}
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => selectAccount(account)}
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
                            </button>
                        ))}
                    {!isLoading && !error && filtered.length === 0 && (
                        <p className={ui.muted}>No matching accounts.</p>
                    )}
                </div>
            )}
        </div>
    );
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
