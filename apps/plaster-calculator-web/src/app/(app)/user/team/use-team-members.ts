"use client";

import type { ListMyTeamMembersResponse } from "@libraries/plaster-calculator-common";
import {
    useRefreshMyTeamSummary,
    useTeamsService,
} from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useCallback, useEffect, useState } from "react";

export type UseTeamMembersResult = Readonly<{
    data: ListMyTeamMembersResponse | null;
    error: string | null;
    isLoading: boolean;
    isRemoving: boolean;
    isRenaming: boolean;
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

    const refresh = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            setData(await teamsService.listMyTeamMembers());
        } catch (loadError) {
            setError(errorMessage(loadError, "Unable to load team members."));
        } finally {
            setIsLoading(false);
        }
    }, [teamsService]);

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
        refresh,
        remove,
        rename,
    };
}

function errorMessage(error: unknown, fallback = "Please try again."): string {
    return error instanceof Error && error.message ? error.message : fallback;
}
