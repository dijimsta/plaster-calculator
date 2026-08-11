"use client";

import type { ListMyTeamMembersResponse } from "@libraries/plaster-calculator-common";
import { useTeamsService } from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useCallback, useEffect, useState } from "react";

export type UseTeamMembersResult = Readonly<{
    data: ListMyTeamMembersResponse | null;
    error: string | null;
    isLoading: boolean;
    isRemoving: boolean;
    refresh(): Promise<void>;
    remove(userId: string): Promise<boolean>;
}>;

export function useTeamMembers(): UseTeamMembersResult {
    const teamsService = useTeamsService();
    const { notify } = useNotificationsManager();
    const [data, setData] = useState<ListMyTeamMembersResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRemoving, setIsRemoving] = useState(false);

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

    return { data, error, isLoading, isRemoving, refresh, remove };
}

function errorMessage(error: unknown, fallback = "Please try again."): string {
    return error instanceof Error && error.message ? error.message : fallback;
}
