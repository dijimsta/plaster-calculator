"use client";

import { Text } from "@libraries/uikit-web";
import { default as LinkModule } from "next/link.js";

import { useAppTranslation } from "../../../i18n/index.ts";
import { ui } from "../../../lib/styles.js";
import type { CompanySummary } from "../../../types.js";

const Link = LinkModule.default;

interface CompanyRowProps {
    readonly company: CompanySummary;
}

export function CompanyRow({ company }: CompanyRowProps) {
    const { t } = useAppTranslation();

    return (
        <div className={ui.projectItem}>
            <div className="grid min-w-0 gap-2">
                <Link href={`/companies/${company.id}`}>
                    <strong>{company.companyName}</strong>
                    <Text size="sm" variant="muted" truncate>
                        {company.businessNumber ||
                            t("companies.companyRow.noBusinessNumber")}{" "}
                        /{" "}
                        {company.phoneNumber ||
                            t("companies.companyRow.noPhone")}{" "}
                        /{" "}
                        {company.primaryContactId
                            ? t("companies.companyRow.primaryContactSet")
                            : t("companies.companyRow.noPrimaryContact")}{" "}
                        / {new Date(company.updatedAt).toLocaleString()}
                    </Text>
                </Link>
            </div>
        </div>
    );
}
