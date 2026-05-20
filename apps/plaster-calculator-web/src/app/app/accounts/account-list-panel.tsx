"use client";

import { LoaderCircle, RefreshCcw, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AccountRow } from "./account-row.js";
import { countProjectsByAccount, filterAccounts } from "./account.utils.js";
import { listAccounts, listProjects } from "../../../lib/api.js";
import { cx, ui } from "../../../lib/styles.js";

import type { AccountSummary, ProjectSummary } from "../../../types.js";

interface AccountListPanelProps {
    readonly refreshKey: number;
}

export function AccountListPanel({ refreshKey }: AccountListPanelProps) {
    const [accounts, setAccounts] = useState<AccountSummary[]>([]);
    const [projects, setProjects] = useState<ProjectSummary[]>([]);
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
    const projectCounts = useMemo(
        () => countProjectsByAccount(projects),
        [projects],
    );

    async function refresh(): Promise<void> {
        setIsLoading(true);
        setMessage("");
        try {
            const [nextAccounts, nextProjects] = await Promise.all([
                listAccounts(),
                listProjects(),
            ]);
            setAccounts(nextAccounts);
            setProjects(nextProjects);
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
                    <SearchField query={query} setQuery={setQuery} />
                    <button
                        className={cx(ui.button, ui.buttonDefault)}
                        onClick={() => void refresh()}
                        title="Refresh account list"
                        type="button"
                    >
                        <RefreshCcw size={18} /> Refresh
                    </button>
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
                        <AccountRow
                            key={account.id}
                            account={account}
                            projectCount={projectCounts.get(account.id) ?? 0}
                        />
                    ))}
                    {filtered.length === 0 && (
                        <p className={ui.muted}>No accounts found.</p>
                    )}
                </div>
            )}
        </section>
    );
}

function SearchField({
    query,
    setQuery,
}: {
    readonly query: string;
    readonly setQuery: (query: string) => void;
}) {
    return (
        <div className={cx(ui.field, "min-w-[260px]")}>
            <label htmlFor="account-search">Search</label>
            <div className="relative">
                <Search
                    size={16}
                    className="absolute left-[11px] top-[13px] text-slate-500 dark:text-slate-400"
                />
                <input
                    id="account-search"
                    className={cx(ui.input, "pl-[34px]")}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>
        </div>
    );
}
