"use client";

import {
    QuotesTable,
    useQuotesTranslation,
} from "@libraries/plaster-calculator-ui";
import { Box, Breadcrumb, PageHeading, Tabs, Text } from "@libraries/uikit-web";
import { LoaderCircle, Home } from "lucide-react";
import { default as LinkModule } from "next/link.js";

import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";
import { useAppTranslation } from "../../../i18n/index.ts";
import { ui } from "../../../lib/styles.js";

import {
    useDownloadQuoteCallback,
    useOpenQuoteCallback,
    useQuotesListState,
} from "./page.hooks.js";

const Link = LinkModule.default;

export default function QuotesPage() {
    const { t } = useQuotesTranslation();
    const { t: tApp } = useAppTranslation();
    const { rows, isLoading, error } = useQuotesListState();
    const openQuote = useOpenQuoteCallback();
    const downloadQuote = useDownloadQuoteCallback();

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
                {isLoading ? (
                    <Box align="center" justify="center" gap="sm" status>
                        <LoaderCircle className="animate-spin" size={24} />
                        <Text variant="muted">{t("quotesPage.loading")}</Text>
                    </Box>
                ) : error ? (
                    <p className={ui.error}>{t("quotesPage.unableToLoad")}</p>
                ) : (
                    <QuotesTable
                        rows={rows}
                        onOpen={openQuote}
                        onDownload={downloadQuote}
                    />
                )}
            </Box>
        </>
    );
}
