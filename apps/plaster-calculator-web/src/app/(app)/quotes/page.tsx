"use client";

import { useQuotesTranslation } from "@libraries/plaster-calculator-ui";
import {
    Box,
    Breadcrumb,
    EmptyState,
    PageHeading,
    Tabs,
} from "@libraries/uikit-web";
import { FileText, Home } from "lucide-react";
import { default as LinkModule } from "next/link.js";

import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";
import { useAppTranslation } from "../../../i18n/index.ts";

const Link = LinkModule.default;

export default function QuotesPage() {
    const { t } = useQuotesTranslation();
    const { t: tApp } = useAppTranslation();

    return (
        <>
            <PageHeading>
                <PageHeading.Breadcrumbs>
                    <Breadcrumb>
                        <RoutedBreadcrumbItem href="/">
                            <Home
                                size={16}
                                aria-label={tApp("sidebar.navLabels.home")}
                            />
                        </RoutedBreadcrumbItem>
                        <Breadcrumb.Item current>
                            {tApp("quotes.title")}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>
                        {tApp("quotes.title")}
                    </PageHeading.Title>
                    <PageHeading.Description>
                        {t("quotesPage.description")}
                    </PageHeading.Description>
                </PageHeading.Content>
                <PageHeading.Navigation>
                    <Tabs>
                        <Tabs.Item current>
                            <Link href="/quotes">
                                {tApp("quotes.allQuotesTab")}
                            </Link>
                        </Tabs.Item>
                        <Tabs.Item>
                            <Link href="/quotes/template">
                                {tApp("quotes.templateTab")}
                            </Link>
                        </Tabs.Item>
                    </Tabs>
                </PageHeading.Navigation>
            </PageHeading>
            <Box direction="column" gap="lg" padding="md">
                <EmptyState
                    icon={<FileText />}
                    title={t("quotesPage.emptyStateTitle")}
                    description={t("quotesPage.emptyStateDescription")}
                />
            </Box>
        </>
    );
}
