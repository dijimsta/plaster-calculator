"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import { useQuotesTranslation } from "@libraries/plaster-calculator-ui";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { Box, EmptyState, Text } from "@libraries/uikit-web";
import { FileX, LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation.js";
import { use, useEffect } from "react";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

export type LegacyQuotePageProps = {
    readonly params: Promise<{ readonly quoteId: string }>;
};

/** Redirects old quote links to the canonical quote tab for their project. */
export default function LegacyQuotePage({ params }: LegacyQuotePageProps) {
    const { quoteId } = use(params);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { t } = useQuotesTranslation();
    const { data, isLoading, error } = DataConnectorReact.useGetQuoteById(
        dataConnect,
        { id: quoteId },
    );
    const projectId = data?.quote?.project.id;
    const shouldPrint = searchParams.get("print") === "1";

    useEffect(() => {
        if (projectId) {
            router.replace(
                `/projects/${projectId}/quote${shouldPrint ? "?print=1" : ""}`,
            );
        }
    }, [projectId, router, shouldPrint]);

    if (error || (!isLoading && !projectId)) {
        return (
            <Box padding="md">
                <EmptyState
                    icon={<FileX />}
                    title={t("quoteDetailPage.notFoundTitle")}
                    description={t("quoteDetailPage.notFoundDescription")}
                />
            </Box>
        );
    }

    return (
        <Box align="center" justify="center" gap="sm" padding="md" status>
            <LoaderCircle className="animate-spin" size={24} />
            <Text variant="muted">{t("quoteDetailPage.loading")}</Text>
        </Box>
    );
}
