"use client";

import "@libraries/plaster-calculator-ui/quote-detail-document.print.css";

import {
    QuoteDetailDocument,
    usePrintQuoteDocument,
    useQuotesTranslation,
} from "@libraries/plaster-calculator-ui";
import {
    Box,
    Breadcrumb,
    Button,
    ButtonGroup,
    EmptyState,
    PageHeading,
    Text,
} from "@libraries/uikit-web";
import { Download, FileX, Home, LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation.js";
import { use } from "react";

import { RoutedBreadcrumbItem } from "../../../../components/routed-breadcrumb-item.js";
import { useAppTranslation } from "../../../../i18n/index.ts";

import { useAutoPrintOnMount, useQuoteDetailState } from "./page.hooks.js";

export type QuoteDetailPageParams = {
    readonly quoteId: string;
};

export type QuoteDetailPageProps = {
    readonly params: Promise<QuoteDetailPageParams>;
};

export default function QuoteDetailPage({ params }: QuoteDetailPageProps) {
    const { quoteId } = use(params);
    const { t } = useQuotesTranslation();
    const { t: tApp } = useAppTranslation();
    const searchParams = useSearchParams();
    const { document, isLoading, isInaccessible } =
        useQuoteDetailState(quoteId);
    const { printQuoteDocument } = usePrintQuoteDocument();
    useAutoPrintOnMount(
        printQuoteDocument,
        searchParams.get("print") === "1",
        document !== null,
    );

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
                            {document?.reference ??
                                t("quoteDetailPage.breadcrumb")}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>
                        {document?.reference ??
                            document?.projectName ??
                            t("quoteDetailPage.breadcrumb")}
                    </PageHeading.Title>
                </PageHeading.Content>
                <PageHeading.Actions>
                    <ButtonGroup label={t("quoteDetailPage.breadcrumb")}>
                        <Button
                            variant="secondary"
                            icon={<Download size={16} aria-hidden="true" />}
                            disabled={document === null}
                            onClick={printQuoteDocument}
                        >
                            {t("quoteDetailPage.downloadPdf")}
                        </Button>
                        {/* Mark as sent / Mark accepted are rendered inert
                            here — real status-transition mutation wiring,
                            including which of the two is a valid transition
                            from the current status, is WORK-123. */}
                        <Button variant="secondary" disabled>
                            {t("quoteDetailPage.markAsSent")}
                        </Button>
                        <Button variant="secondary" disabled>
                            {t("quoteDetailPage.markAccepted")}
                        </Button>
                    </ButtonGroup>
                </PageHeading.Actions>
            </PageHeading>
            <Box direction="column" gap="lg" padding="md">
                {isLoading ? (
                    <Box align="center" justify="center" gap="sm" status>
                        <LoaderCircle className="animate-spin" size={24} />
                        <Text variant="muted">
                            {t("quoteDetailPage.loading")}
                        </Text>
                    </Box>
                ) : isInaccessible || document === null ? (
                    <EmptyState
                        icon={<FileX />}
                        title={t("quoteDetailPage.notFoundTitle")}
                        description={t("quoteDetailPage.notFoundDescription")}
                    />
                ) : (
                    <QuoteDetailDocument {...document} />
                )}
            </Box>
        </>
    );
}
