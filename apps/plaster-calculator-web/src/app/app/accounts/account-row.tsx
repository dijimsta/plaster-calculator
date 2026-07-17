"use client";

import { Text } from "@libraries/uikit-web";
import { default as LinkModule } from "next/link.js";

import { ui } from "../../../lib/styles.js";

import type { AccountSummary } from "../../../types.js";

const Link = LinkModule.default;

interface AccountRowProps {
    readonly account: AccountSummary;
}

export function AccountRow({ account }: AccountRowProps) {
    return (
        <div className={ui.projectItem}>
            <div className="grid min-w-0 gap-2">
                <Link href={`/app/accounts/${account.id}`}>
                    <strong>{account.companyName}</strong>
                    <Text
                        size="sm"
                        variant="muted"
                        className={ui.projectMetaLine}
                    >
                        {account.businessNumber || "No business number"} /{" "}
                        {account.phoneNumber || "No phone"} /{" "}
                        {account.primaryContactId
                            ? "Primary contact set"
                            : "No primary contact"}{" "}
                        / {new Date(account.updatedAt).toLocaleString()}
                    </Text>
                </Link>
            </div>
        </div>
    );
}
