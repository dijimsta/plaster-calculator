"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import {
    QuoteTemplatePanel,
    useQuotesTranslation,
} from "@libraries/plaster-calculator-ui";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { Box, Breadcrumb, PageHeading } from "@libraries/uikit-web";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation.js";
import { use } from "react";

import { RoutedBreadcrumbItem } from "../../../../../components/routed-breadcrumb-item.js";
import { useAppTranslation } from "../../../../../i18n/index.ts";
import { QuotesTabsNavigation } from "../../quotes-tabs-navigation.component.js";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

export type QuoteTemplateVariationPageParams = {
    readonly templateId: string;
};

export type QuoteTemplateVariationPageProps = {
    readonly params: Promise<QuoteTemplateVariationPageParams>;
};

export default function QuoteTemplateVariationPage({
    params,
}: QuoteTemplateVariationPageProps) {
    const { templateId } = use(params);
    const router = useRouter();
    const { t } = useQuotesTranslation();
    const { t: tApp } = useAppTranslation();
    // The same `ListQuoteTemplatesForTeam` query `QuoteTemplatePanel` loads
    // for its own list (WORK-194) -- react-query dedupes this against that
    // instance instead of issuing a second request, so this only reads the
    // open template's name for the breadcrumb rather than adding a fetch.
    const { data } =
        DataConnectorReact.useListQuoteTemplatesForTeam(dataConnect);
    const templateName = data?.quoteTemplates.find(
        (template) => template.id === templateId,
    )?.name;

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
                        <RoutedBreadcrumbItem href="/quotes/template">
                            {tApp("quotes.templateTab")}
                        </RoutedBreadcrumbItem>
                        {templateName !== undefined && (
                            <Breadcrumb.Item current>
                                {templateName}
                            </Breadcrumb.Item>
                        )}
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
                    <QuotesTabsNavigation current="template" />
                </PageHeading.Navigation>
            </PageHeading>
            <Box direction="column" gap="lg" padding="md">
                <QuoteTemplatePanel
                    key={templateId}
                    initialOpenVariationId={templateId}
                    onCancel={() => router.push("/quotes")}
                    onOpenVariation={(variationId) =>
                        router.push(`/quotes/template/${variationId}`)
                    }
                    onCloseVariation={() => router.push("/quotes/template")}
                />
            </Box>
        </>
    );
}
