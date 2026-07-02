"use client";

import { Box, Breadcrumb, PageHeading } from "@libraries/uikit-web";
import { Home } from "lucide-react";
import { useState } from "react";

import { AccountListPanel } from "./account-list-panel.js";
import { NewAccountPanel } from "./new-account-panel.js";
import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";
import { cx, ui } from "../../../lib/styles.js";

export default function AccountsPage() {
    const [accountListRefreshKey, setAccountListRefreshKey] = useState(0);

    return (
        <>
            <PageHeading>
                <PageHeading.Breadcrumbs>
                    <Breadcrumb>
                        <RoutedBreadcrumbItem href="/app">
                            <Home size={16} aria-label="Home" />
                        </RoutedBreadcrumbItem>
                        <Breadcrumb.Item current>Accounts</Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>Accounts</PageHeading.Title>
                    <PageHeading.Description>
                        Manage customer accounts and contacts.
                    </PageHeading.Description>
                </PageHeading.Content>
            </PageHeading>

            <Box direction="column" padding="md">
                <section className={cx(ui.layoutGrid, "items-start")}>
                    <NewAccountPanel
                        onCreated={() =>
                            setAccountListRefreshKey((current) => current + 1)
                        }
                    />
                    <AccountListPanel refreshKey={accountListRefreshKey} />
                </section>
            </Box>
        </>
    );
}
