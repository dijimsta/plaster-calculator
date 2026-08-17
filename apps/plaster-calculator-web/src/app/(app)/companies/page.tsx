"use client";

import { Box, Breadcrumb, PageHeading } from "@libraries/uikit-web";
import { Home } from "lucide-react";
import { useState } from "react";

import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";
import { useAppTranslation } from "../../../i18n/index.ts";
import { cx, ui } from "../../../lib/styles.js";

import { CompanyListPanel } from "./company-list-panel.js";
import { NewCompanyPanel } from "./new-company-panel.js";

export default function CompaniesPage() {
    const { t } = useAppTranslation();
    const [companyListRefreshKey, setCompanyListRefreshKey] = useState(0);
    // `token` forces `NewCompanyPanel` to remount (via `key`) so it re-seeds
    // and re-focuses its name field even when the same search term is
    // chosen again.
    const [newCompanySeed, setNewCompanySeed] = useState<{
        readonly name: string;
        readonly token: number;
    }>({ name: "", token: 0 });

    return (
        <>
            <PageHeading>
                <PageHeading.Breadcrumbs>
                    <Breadcrumb>
                        <RoutedBreadcrumbItem href="/">
                            <Home
                                size={16}
                                aria-label={t("sidebar.navLabels.home")}
                            />
                        </RoutedBreadcrumbItem>
                        <Breadcrumb.Item current>
                            {t("companies.title")}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>
                        {t("companies.title")}
                    </PageHeading.Title>
                    <PageHeading.Description>
                        {t("companies.description")}
                    </PageHeading.Description>
                </PageHeading.Content>
            </PageHeading>

            <Box direction="column" padding="md">
                <section className={cx(ui.layoutGrid, "items-start")}>
                    <NewCompanyPanel
                        key={newCompanySeed.token}
                        initialName={newCompanySeed.name}
                        onCreated={() =>
                            setCompanyListRefreshKey((current) => current + 1)
                        }
                    />
                    <CompanyListPanel
                        refreshKey={companyListRefreshKey}
                        onCreateFromSearch={(name) =>
                            setNewCompanySeed((current) => ({
                                name,
                                token: current.token + 1,
                            }))
                        }
                    />
                </section>
            </Box>
        </>
    );
}
