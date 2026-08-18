"use client";

import { Box, Table, Text } from "@libraries/uikit-web";
import { default as LinkModule } from "next/link.js";

import { useAppTranslation } from "../../../i18n/index.ts";
import type { CompanySummary } from "../../../types.js";

const Link = LinkModule.default;

type CompanyRowProps = {
    readonly company: CompanySummary;
};

export function CompanyRow({ company }: CompanyRowProps) {
    const { t } = useAppTranslation();

    return (
        <Table.Row>
            <Table.Cell>
                <Link href={`/companies/${company.id}`}>
                    <Box direction="column" gap="xs">
                        <Text weight="semibold">{company.companyName}</Text>
                        <Text size="sm" variant="muted" truncate>
                            {company.businessNumber ||
                                t("companies.companyRow.noBusinessNumber")}{" "}
                            /{" "}
                            {company.phoneNumber ||
                                t("companies.companyRow.noPhone")}{" "}
                            /{" "}
                            {company.primaryContactId
                                ? t("companies.companyRow.primaryContactSet")
                                : t(
                                      "companies.companyRow.noPrimaryContact",
                                  )}{" "}
                            / {new Date(company.updatedAt).toLocaleString()}
                        </Text>
                    </Box>
                </Link>
            </Table.Cell>
        </Table.Row>
    );
}
