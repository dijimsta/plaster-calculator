"use client";

import {
    QuoteAppearancePanel,
    QuoteAppearanceSaveButton,
} from "@libraries/plaster-calculator-ui";
import { Box, Breadcrumb, PageHeading } from "@libraries/uikit-web";
import { Home } from "lucide-react";

import { RoutedBreadcrumbItem } from "../../../../components/routed-breadcrumb-item.js";
import { useAppTranslation } from "../../../../i18n/index.ts";
import { QuotesTabsNavigation } from "../quotes-tabs-navigation.component.js";

export default function QuoteAppearancePage() {
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
                            {tApp("quotes.appearanceTab")}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>
                        {tApp("quotes.appearanceTab")}
                    </PageHeading.Title>
                    <PageHeading.Description>
                        {tApp("quotes.appearanceDescription")}
                    </PageHeading.Description>
                </PageHeading.Content>
                <PageHeading.Actions>
                    <QuoteAppearanceSaveButton />
                </PageHeading.Actions>
                <PageHeading.Navigation>
                    <QuotesTabsNavigation current="appearance" />
                </PageHeading.Navigation>
            </PageHeading>
            <Box direction="column" gap="lg" padding="md">
                <QuoteAppearancePanel />
            </Box>
        </>
    );
}
