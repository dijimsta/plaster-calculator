"use client";

import {
    QuoteTemplatePanel,
    useQuotesTranslation,
} from "@libraries/plaster-calculator-ui";
import { Box, Breadcrumb, PageHeading, Tabs } from "@libraries/uikit-web";
import { Home } from "lucide-react";
import { default as LinkModule } from "next/link.js";
import { useRouter } from "next/navigation.js";

import { RoutedBreadcrumbItem } from "../../../../components/routed-breadcrumb-item.js";
import { useAppTranslation } from "../../../../i18n/index.ts";

const Link = LinkModule.default;

export default function QuoteTemplatePage() {
    const router = useRouter();
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
                        <RoutedBreadcrumbItem href="/quotes">
                            {tApp("quotes.title")}
                        </RoutedBreadcrumbItem>
                        <Breadcrumb.Item current>
                            {tApp("quotes.templateTab")}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>
                        {tApp("quotes.templateTab")}
                    </PageHeading.Title>
                    <PageHeading.Description>
                        {t("quoteTemplatePage.description")}
                    </PageHeading.Description>
                </PageHeading.Content>
                <PageHeading.Navigation>
                    <Tabs>
                        <Tabs.Item>
                            <Link href="/quotes">
                                {tApp("quotes.allQuotesTab")}
                            </Link>
                        </Tabs.Item>
                        <Tabs.Item current>
                            <Link href="/quotes/template">
                                {tApp("quotes.templateTab")}
                            </Link>
                        </Tabs.Item>
                    </Tabs>
                </PageHeading.Navigation>
            </PageHeading>
            <Box direction="column" gap="lg" padding="md">
                <QuoteTemplatePanel onCancel={() => router.push("/quotes")} />
            </Box>
        </>
    );
}
