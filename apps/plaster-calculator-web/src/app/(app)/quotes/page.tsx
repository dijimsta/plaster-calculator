"use client";

import {
    QuotesTable,
    useQuotesTranslation,
} from "@libraries/plaster-calculator-ui";
import { Box, Breadcrumb, PageHeading, Text } from "@libraries/uikit-web";
import { LoaderCircle, Home } from "lucide-react";

import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";
import { useAppTranslation } from "../../../i18n/index.ts";
import { ui } from "../../../lib/styles.js";

import {
    useDownloadQuoteCallback,
    useOpenQuoteCallback,
    useQuotesListState,
} from "./page.hooks.js";
import { QuotesTabsNavigation } from "./quotes-tabs-navigation.component.js";

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
                    <QuotesTabsNavigation current="all-quotes" />
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
