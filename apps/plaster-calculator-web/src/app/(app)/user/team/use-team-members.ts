"use client";

import type { ListMyTeamMembersResponse } from "@libraries/plaster-calculator-common";
import {
    useRefreshMyTeamSummary,
    useTeamsService,
} from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useCallback, useEffect, useState } from "react";

/** Team members shown per page in the team members table. */
export const TEAM_MEMBERS_PAGE_SIZE = 20;

export type UseTeamMembersResult = Readonly<{
    data: ListMyTeamMembersResponse | null;
    error: string | null;
    isLoading: boolean;
    isRemoving: boolean;
    isRenaming: boolean;
    page: number;
    pageCount: number;
    setPage(page: number): void;
    refresh(): Promise<void>;
    remove(userId: string): Promise<boolean>;
    rename(name: string): Promise<boolean>;
}>;

export function useTeamMembers(): UseTeamMembersResult {
    const teamsService = useTeamsService();
    const refreshMyTeamSummary = useRefreshMyTeamSummary();
    const { notify } = useNotificationsManager();
    const [data, setData] = useState<ListMyTeamMembersResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRemoving, setIsRemoving] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    /**
     * There's no total-count query backing the members list, so pagination
     * uses the fetch-one-extra-row technique: request `PAGE_SIZE + 1` rows
     * and, if the extra row comes back, report another page exists without a
     * separate count query. If a remove leaves the current page empty (and
     * it isn't page one), step back a page instead of showing a stale,
     * impossible page — the resulting page change re-runs this callback.
     */
    const refresh = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await teamsService.listMyTeamMembers({
                limit: TEAM_MEMBERS_PAGE_SIZE + 1,
                offset: (page - 1) * TEAM_MEMBERS_PAGE_SIZE,
            });
            if (response.members.length === 0 && page > 1) {
                setPage((currentPage) => Math.max(1, currentPage - 1));
                return;
            }
            const hasNextPage =
                response.members.length > TEAM_MEMBERS_PAGE_SIZE;
            setData(
                hasNextPage
                    ? {
                          ...response,
                          members: response.members.slice(
                              0,
                              TEAM_MEMBERS_PAGE_SIZE,
                          ),
                      }
                    : response,
            );
            setPageCount(hasNextPage ? page + 1 : page);
        } catch (loadError) {
            setError(errorMessage(loadError, "Unable to load team members."));
        } finally {
            setIsLoading(false);
        }
    }, [page, teamsService]);

    useEffect(() => {
        void refresh();
    }, [refresh]);

    const remove = useCallback(
        async (userId: string) => {
            setIsRemoving(true);
            try {
                await teamsService.removeTeamMember(userId);
                await refresh();
                notify({ intent: "success", title: "Team member removed." });
                return true;
            } catch (removeError) {
                notify({
                    intent: "error",
                    title: "Unable to remove team member.",
                    description: errorMessage(removeError),
                });
                return false;
            } finally {
                setIsRemoving(false);
            }
        },
        [notify, refresh, teamsService],
    );

    const rename = useCallback(
        async (name: string) => {
            setIsRenaming(true);
            try {
                const response = await teamsService.updateMyTeamName(name);
                setData((currentData) =>
                    currentData === null
                        ? null
                        : { ...currentData, teamName: response.teamName },
                );
                await refreshMyTeamSummary();
                notify({ intent: "success", title: "Team name updated." });
                return true;
            } catch (renameError) {
                notify({
                    intent: "error",
                    title: "Unable to update team name.",
                    description: errorMessage(renameError),
                });
                return false;
            } finally {
                setIsRenaming(false);
            }
        },
        [notify, refreshMyTeamSummary, teamsService],
    );

    return {
        data,
        error,
        isLoading,
        isRemoving,
        isRenaming,
        page,
        pageCount,
        setPage,
        refresh,
        remove,
        rename,
    };
}

function errorMessage(error: unknown, fallback = "Please try again."): string {
    return error instanceof Error && error.message ? error.message : fallback;
}
