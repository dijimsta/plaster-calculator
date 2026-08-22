"use client";

import { Box, Breadcrumb, PageHeading } from "@libraries/uikit-web";
import { Home } from "lucide-react";
import { useState } from "react";

import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";
import { useAppTranslation } from "../../../i18n/index.ts";
import { cx, ui } from "../../../lib/styles.js";

import { NewSupplierPanel } from "./new-supplier-panel.js";
import { SupplierListPanel } from "./supplier-list-panel.js";

export default function SuppliersPage() {
    const { t } = useAppTranslation();
    // `token` forces `NewSupplierPanel` to remount (via `key`) so it re-seeds
    // its name field even when the same search term is chosen again.
    const [newSupplierSeed, setNewSupplierSeed] = useState<{
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
                            {t("suppliers.title")}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>
                        {t("suppliers.title")}
                    </PageHeading.Title>
                    <PageHeading.Description>
                        {t("suppliers.description")}
                    </PageHeading.Description>
                </PageHeading.Content>
            </PageHeading>

            <Box direction="column" padding="md">
                <section className={cx(ui.layoutGrid, "items-start")}>
                    <SupplierListPanel
                        onCreateFromSearch={(name) =>
                            setNewSupplierSeed((current) => ({
                                name,
                                token: current.token + 1,
                            }))
                        }
                    />
                    <NewSupplierPanel
                        key={newSupplierSeed.token}
                        initialName={newSupplierSeed.name}
                    />
                </section>
            </Box>
        </>
    );
}
