"use client";

import { default as LinkModule } from "next/link.js";

import { cx, ui } from "../../../lib/styles.js";

import type { AccountSummary } from "../../../types.js";

const Link = LinkModule.default;

interface AccountRowProps {
    readonly account: AccountSummary;
    readonly projectCount: number;
}

export function AccountRow({ account, projectCount }: AccountRowProps) {
    return (
        <div className={ui.projectItem}>
            <div className="grid min-w-0 gap-2">
                <Link href={`/app/accounts/${account.id}`}>
                    <strong>{account.companyName}</strong>
                    <span className={cx(ui.muted, ui.projectMetaLine)}>
                        {account.businessNumber || "No business number"} /{" "}
                        {account.phoneNumber || "No phone"} /{" "}
                        {account.primaryContactId
                            ? "Primary contact set"
                            : "No primary contact"}{" "}
                        / {projectCount}{" "}
                        {projectCount === 1 ? "project" : "projects"} /{" "}
                        {new Date(account.updatedAt).toLocaleString()}
                    </span>
                </Link>
            </div>
        </div>
    );
}
