"use client";

import "@libraries/plaster-calculator-ui/quote-detail-document.print.css";

import { DRAFT_QUOTE_STATUS } from "@libraries/plaster-calculator-common";
import type { QuoteDetailDocumentProps } from "@libraries/plaster-calculator-ui";
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
import type { ReactElement } from "react";

import { RoutedBreadcrumbItem } from "../../../../components/routed-breadcrumb-item.js";
import { useAppTranslation } from "../../../../i18n/index.ts";

import {
    useAutoPrintOnMount,
    useQuoteDetailState,
    useQuoteStatusActions,
} from "./page.hooks.js";

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
    const statusActions = useQuoteStatusActions(
        quoteId,
        document?.status ?? DRAFT_QUOTE_STATUS,
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
                    <QuoteDetailActions
                        label={t("quoteDetailPage.breadcrumb")}
                        downloadLabel={t("quoteDetailPage.downloadPdf")}
                        markAsSentLabel={t("quoteDetailPage.markAsSent")}
                        markAcceptedLabel={t("quoteDetailPage.markAccepted")}
                        canDownload={document !== null}
                        canMarkAsSent={statusActions.canMarkAsSent}
                        canMarkAccepted={statusActions.canMarkAccepted}
                        onDownload={printQuoteDocument}
                        onMarkAsSent={() => void statusActions.markAsSent()}
                        onMarkAccepted={() => void statusActions.markAccepted()}
                    />
                </PageHeading.Actions>
            </PageHeading>
            <Box direction="column" gap="lg" padding="md">
                <QuoteDetailBody
                    isLoading={isLoading}
                    isInaccessible={isInaccessible}
                    document={document}
                    loadingLabel={t("quoteDetailPage.loading")}
                    notFoundTitle={t("quoteDetailPage.notFoundTitle")}
                    notFoundDescription={t(
                        "quoteDetailPage.notFoundDescription",
                    )}
                />
            </Box>
        </>
    );
}

type QuoteDetailActionsProps = {
    readonly label: string;
    readonly downloadLabel: string;
    readonly markAsSentLabel: string;
    readonly markAcceptedLabel: string;
    readonly canDownload: boolean;
    readonly canMarkAsSent: boolean;
    readonly canMarkAccepted: boolean;
    readonly onDownload: () => void;
    readonly onMarkAsSent: () => void;
    readonly onMarkAccepted: () => void;
};

/** The Download PDF / Mark as sent / Mark accepted action row. */
function QuoteDetailActions({
    label,
    downloadLabel,
    markAsSentLabel,
    markAcceptedLabel,
    canDownload,
    canMarkAsSent,
    canMarkAccepted,
    onDownload,
    onMarkAsSent,
    onMarkAccepted,
}: QuoteDetailActionsProps): ReactElement {
    return (
        <ButtonGroup label={label}>
            <Button
                variant="secondary"
                icon={<Download size={16} aria-hidden="true" />}
                disabled={!canDownload}
                onClick={onDownload}
            >
                {downloadLabel}
            </Button>
            <Button
                variant="secondary"
                disabled={!canMarkAsSent}
                onClick={onMarkAsSent}
            >
                {markAsSentLabel}
            </Button>
            <Button
                variant="secondary"
                disabled={!canMarkAccepted}
                onClick={onMarkAccepted}
            >
                {markAcceptedLabel}
            </Button>
        </ButtonGroup>
    );
}

type QuoteDetailBodyProps = {
    readonly isLoading: boolean;
    readonly isInaccessible: boolean;
    readonly document: QuoteDetailDocumentProps | null;
    readonly loadingLabel: string;
    readonly notFoundTitle: string;
    readonly notFoundDescription: string;
};

/** Loading spinner, not-found/unauthorised empty state, or the document. */
function QuoteDetailBody({
    isLoading,
    isInaccessible,
    document,
    loadingLabel,
    notFoundTitle,
    notFoundDescription,
}: QuoteDetailBodyProps): ReactElement {
    if (isLoading) {
        return (
            <Box align="center" justify="center" gap="sm" status>
                <LoaderCircle className="animate-spin" size={24} />
                <Text variant="muted">{loadingLabel}</Text>
            </Box>
        );
    }

    if (isInaccessible || document === null) {
        return (
            <EmptyState
                icon={<FileX />}
                title={notFoundTitle}
                description={notFoundDescription}
            />
        );
    }

    return <QuoteDetailDocument {...document} />;
}
