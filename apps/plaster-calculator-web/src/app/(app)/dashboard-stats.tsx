"use client";

import { Box, Stats } from "@libraries/uikit-web";
import { Info } from "lucide-react";
import type { ReactElement } from "react";

import { useAppTranslation } from "../../i18n/index.ts";

export type DashboardStatsProps = Readonly<{
    activeProjectsCount: number;
    awaitingBuilderCount: number;
    readyToQuoteCount: number;
    companiesCount: number;
}>;

/** Overview's summary stat-cards row: active projects, awaiting builder, ready to quote, and companies counts. */
export function DashboardStats({
    activeProjectsCount,
    awaitingBuilderCount,
    readyToQuoteCount,
    companiesCount,
}: DashboardStatsProps): ReactElement {
    const { t } = useAppTranslation();

    return (
        <Stats
            columns={4}
            variant="cards"
            items={[
                {
                    id: "active",
                    label: t("home.dashboardStats.activeProjects"),
                    value: activeProjectsCount,
                },
                {
                    id: "awaitingBuilder",
                    label: t("home.dashboardStats.awaitingBuilder"),
                    value: awaitingBuilderCount,
                    valueTone: "warning",
                },
                {
                    id: "readyToQuote",
                    label: (
                        <Box direction="row" align="center" gap="xs">
                            {t("home.dashboardStats.readyToQuote")}
                            <span
                                title={t(
                                    "home.dashboardStats.readyToQuoteDescription",
                                )}
                            >
                                <Info size={14} />
                            </span>
                        </Box>
                    ),
                    value: readyToQuoteCount,
                    valueTone: "success",
                },
                {
                    id: "companies",
                    label: t("home.dashboardStats.companies"),
                    value: companiesCount,
                },
            ]}
        />
    );
}
