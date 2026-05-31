"use client";

import { Button, Input, Label } from "@libraries/uikit-web";
import { LoaderCircle, RefreshCcw, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AccountRow } from "./account-row.js";
import { filterAccounts } from "./account.utils.js";
import { listAccounts } from "../../../lib/api.js";
import { cx, ui } from "../../../lib/styles.js";

import type { AccountSummary } from "../../../types.js";

interface AccountListPanelProps {
    readonly refreshKey: number;
}

export function AccountListPanel({ refreshKey }: AccountListPanelProps) {
    const [accounts, setAccounts] = useState<AccountSummary[]>([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        void refresh();
    }, [refreshKey]);

    const filtered = useMemo(
        () => filterAccounts(accounts, query),
        [accounts, query],
    );
    async function refresh(): Promise<void> {
        setIsLoading(true);
        setMessage("");
        try {
            const nextAccounts = await listAccounts();
            setAccounts(nextAccounts);
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to load accounts",
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className={cx(ui.panel, ui.stack)}>
            <div className={ui.editorToolbar}>
                <h2>Account List</h2>
                <div className={cx(ui.buttonRow, "items-end")}>
                    <div className="grid gap-1.5 min-w-[260px]">
                        <Label htmlFor="account-search">Search</Label>
                        <Input
                            id="account-search"
                            leadingIcon={
                                <Search
                                    size={16}
                                    className="text-gray-400 dark:text-gray-500"
                                />
                            }
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="secondary"
                        onClick={() => void refresh()}
                        title="Refresh account list"
                        type="button"
                    >
                        <RefreshCcw size={18} /> Refresh
                    </Button>
                </div>
            </div>
            {message && <p className={ui.muted}>{message}</p>}
            {isLoading ? (
                <div className={ui.projectListState}>
                    <LoaderCircle className="animate-spin" size={24} />
                    <span className={ui.muted}>Loading accounts...</span>
                </div>
            ) : (
                <div className={ui.projectList}>
                    {filtered.map((account) => (
                        <AccountRow key={account.id} account={account} />
                    ))}
                    {filtered.length === 0 && (
                        <p className={ui.muted}>No accounts found.</p>
                    )}
                </div>
            )}
        </section>
    );
}
