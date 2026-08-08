"use client";

import { Box, Breadcrumb, PageHeading } from "@libraries/uikit-web";
import { Home } from "lucide-react";
import { useState } from "react";

import { CompanyListPanel } from "./company-list-panel.js";
import { NewCompanyPanel } from "./new-company-panel.js";
import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";
import { cx, ui } from "../../../lib/styles.js";

export default function CompaniesPage() {
    const [companyListRefreshKey, setCompanyListRefreshKey] = useState(0);

    return (
        <>
            <PageHeading>
                <PageHeading.Breadcrumbs>
                    <Breadcrumb>
                        <RoutedBreadcrumbItem href="/">
                            <Home size={16} aria-label="Home" />
                        </RoutedBreadcrumbItem>
                        <Breadcrumb.Item current>Companies</Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>Companies</PageHeading.Title>
                    <PageHeading.Description>
                        Manage customer companies and contacts.
                    </PageHeading.Description>
                </PageHeading.Content>
            </PageHeading>

            <Box direction="column" padding="md">
                <section className={cx(ui.layoutGrid, "items-start")}>
                    <NewCompanyPanel
                        onCreated={() =>
                            setCompanyListRefreshKey((current) => current + 1)
                        }
                    />
                    <CompanyListPanel refreshKey={companyListRefreshKey} />
                </section>
            </Box>
        </>
    );
}
