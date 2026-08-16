"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useQueryClient } from "@tanstack/react-query";
import { QueryFetchPolicy } from "firebase/data-connect";
import { useEffect, useRef } from "react";

import type { QuoteTemplate } from "./quote-template-panel.types.ts";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);
const quoteTemplatesForTeamRef =
    DataConnector.listQuoteTemplatesForTeamRef(dataConnect);

const DEFAULT_QUOTE_TEMPLATE_NAME = "Default";

export function useActiveQuoteTemplate(): {
    readonly activeTemplate: QuoteTemplate | null;
    readonly isLoading: boolean;
} {
    const { data, isLoading } =
        DataConnectorReact.useListQuoteTemplatesForTeam(dataConnect);
    const { mutateAsync: createTemplate } =
        DataConnectorReact.useCreateQuoteTemplate(dataConnect);
    const queryClient = useQueryClient();
    const isCreatingRef = useRef(false);

    const templates = data?.quoteTemplates ?? [];
    const hasNoTemplates = !isLoading && templates.length === 0;

    useEffect(() => {
        if (!hasNoTemplates || isCreatingRef.current) {
            return;
        }
        isCreatingRef.current = true;
        void createTemplate({
            id: crypto.randomUUID(),
            name: DEFAULT_QUOTE_TEMPLATE_NAME,
        })
            .then(async () => {
                const refreshed = await DataConnector.listQuoteTemplatesForTeam(
                    dataConnect,
                    { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
                );
                queryClient.setQueryData(
                    [
                        quoteTemplatesForTeamRef.name,
                        quoteTemplatesForTeamRef.variables ?? null,
                    ],
                    refreshed.data,
                );
            })
            .finally(() => {
                isCreatingRef.current = false;
            });
    }, [createTemplate, hasNoTemplates, queryClient]);

    return {
        // `ListQuoteTemplatesForTeam` orders `isDefault: DESC`, so `templates[0]`
        // would also resolve to the default today -- but this reads `isDefault`
        // explicitly rather than leaning on that ordering, so the default a
        // team edits doesn't quietly change if the query's `orderBy` ever
        // does.
        activeTemplate:
            templates.find((template) => template.isDefault) ?? null,
        isLoading: isLoading || hasNoTemplates,
    };
}
