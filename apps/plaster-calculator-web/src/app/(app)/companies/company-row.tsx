"use client";

import { Text } from "@libraries/uikit-web";
import { default as LinkModule } from "next/link.js";

import { ui } from "../../../lib/styles.js";
import type { CompanySummary } from "../../../types.js";

const Link = LinkModule.default;

interface CompanyRowProps {
    readonly company: CompanySummary;
}

export function CompanyRow({ company }: CompanyRowProps) {
    return (
        <div className={ui.projectItem}>
            <div className="grid min-w-0 gap-2">
                <Link href={`/companies/${company.id}`}>
                    <strong>{company.companyName}</strong>
                    <Text size="sm" variant="muted" truncate>
                        {company.businessNumber || "No business number"} /{" "}
                        {company.phoneNumber || "No phone"} /{" "}
                        {company.primaryContactId
                            ? "Primary contact set"
                            : "No primary contact"}{" "}
                        / {new Date(company.updatedAt).toLocaleString()}
                    </Text>
                </Link>
            </div>
        </div>
    );
}
