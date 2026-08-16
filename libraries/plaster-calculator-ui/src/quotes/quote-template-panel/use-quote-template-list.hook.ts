"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useQueryClient } from "@tanstack/react-query";
import { QueryFetchPolicy } from "firebase/data-connect";
import { useCallback } from "react";

import { QuoteTemplateListUtils } from "./quote-template-list.utils.ts";
import type {
    QuoteTemplate,
    QuoteTemplateItem,
} from "./quote-template-panel.types.ts";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);
const quoteTemplatesForTeamRef =
    DataConnector.listQuoteTemplatesForTeamRef(dataConnect);

export type UseQuoteTemplateListResult = {
    /** The default template plus its variations, default pinned first (`ListQuoteTemplatesForTeam` orders `isDefault: DESC`). */
    readonly templates: readonly QuoteTemplate[];
    readonly isLoading: boolean;
    readonly isMutating: boolean;
    readonly createVariation: (name: string) => Promise<void>;
    readonly renameTemplate: (id: string, name: string) => Promise<void>;
    readonly deleteTemplate: (id: string) => Promise<void>;
};

/**
 * Data + mutations for `QuoteTemplateList`: the team's full template roster,
 * and create-variation/rename/delete. There is no "make default" mutation
 * here or anywhere else in this ticket -- the default is whichever
 * `QuoteTemplate` has `isDefault: true`, fixed at first-use creation
 * (`useActiveQuoteTemplate`).
 *
 * `createVariation` copies `defaultTemplateItems` (the default's full,
 * currently-loaded item list -- system + custom, from `useQuoteItemTemplates`)
 * into the new variation via `CreateQuoteTemplateVariation`'s atomic
 * per-slot copy, so a new variation starts priced exactly like the default
 * rather than empty.
 */
export function useQuoteTemplateList(
    defaultTemplateId: string | null,
    defaultTemplateItems: readonly QuoteTemplateItem[],
): UseQuoteTemplateListResult {
    const { data, isLoading } =
        DataConnectorReact.useListQuoteTemplatesForTeam(dataConnect);
    const { mutateAsync: createVariationMutation, isPending: isCreating } =
        DataConnectorReact.useCreateQuoteTemplateVariation(dataConnect);
    const { mutateAsync: renameMutation, isPending: isRenaming } =
        DataConnectorReact.useRenameQuoteTemplate(dataConnect);
    const { mutateAsync: deleteMutation, isPending: isDeleting } =
        DataConnectorReact.useDeleteQuoteTemplate(dataConnect);
    const queryClient = useQueryClient();

    const refresh = useCallback(async (): Promise<void> => {
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
    }, [queryClient]);

    const createVariation = useCallback(
        async (name: string): Promise<void> => {
            if (defaultTemplateId === null) {
                return;
            }
            await createVariationMutation(
                QuoteTemplateListUtils.buildVariationVariables(
                    crypto.randomUUID(),
                    name,
                    defaultTemplateItems,
                ),
            );
            await refresh();
        },
        [
            createVariationMutation,
            defaultTemplateId,
            defaultTemplateItems,
            refresh,
        ],
    );

    const renameTemplate = useCallback(
        async (id: string, name: string): Promise<void> => {
            await renameMutation({ id, name });
            await refresh();
        },
        [renameMutation, refresh],
    );

    const deleteTemplate = useCallback(
        async (id: string): Promise<void> => {
            await deleteMutation({ id });
            await refresh();
        },
        [deleteMutation, refresh],
    );

    return {
        templates: data?.quoteTemplates ?? [],
        isLoading,
        isMutating: isCreating || isRenaming || isDeleting,
        createVariation,
        renameTemplate,
        deleteTemplate,
    };
}
