"use client";

import type {
    CreateTeamInvitationRequest,
    PendingTeamInvitation,
} from "@libraries/plaster-calculator-common";
import { useTeamsService } from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useCallback, useEffect, useState } from "react";

const NO_INVITATIONS: readonly PendingTeamInvitation[] = [];

export type UseTeamInvitationsResult = Readonly<{
    data: readonly PendingTeamInvitation[];
    error: string | null;
    isLoading: boolean;
    isInviting: boolean;
    revokingEmail: string | null;
    refresh(): Promise<void>;
    invite(input: CreateTeamInvitationRequest): Promise<boolean>;
    revoke(email: string): Promise<boolean>;
}>;

export function useTeamInvitations(
    isEnabled: boolean,
): UseTeamInvitationsResult {
    const teamsService = useTeamsService();
    const { notify } = useNotificationsManager();
    const [data, setData] =
        useState<readonly PendingTeamInvitation[]>(NO_INVITATIONS);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isInviting, setIsInviting] = useState(false);
    const [revokingEmail, setRevokingEmail] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        if (!isEnabled) {
            setData(NO_INVITATIONS);
            setError(null);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await teamsService.listPendingTeamInvitations();
            setData(response.invitations);
        } catch (loadError) {
            setError(
                errorMessage(loadError, "Unable to load pending invitations."),
            );
        } finally {
            setIsLoading(false);
        }
    }, [isEnabled, teamsService]);

    useEffect(() => {
        void refresh();
    }, [refresh]);

    const invite = useCallback(
        async (input: CreateTeamInvitationRequest) => {
            setIsInviting(true);
            try {
                await teamsService.createTeamInvitation(input);
                await refresh();
                notify({ intent: "success", title: "Invitation sent." });
                return true;
            } catch (inviteError) {
                notify({
                    intent: "error",
                    title: "Unable to send invitation.",
                    description: errorMessage(inviteError),
                });
                return false;
            } finally {
                setIsInviting(false);
            }
        },
        [notify, refresh, teamsService],
    );

    const revoke = useCallback(
        async (email: string) => {
            setRevokingEmail(email);
            try {
                await teamsService.revokeTeamInvitation(email);
                await refresh();
                notify({ intent: "success", title: "Invitation revoked." });
                return true;
            } catch (revokeError) {
                notify({
                    intent: "error",
                    title: "Unable to revoke invitation.",
                    description: errorMessage(revokeError),
                });
                return false;
            } finally {
                setRevokingEmail(null);
            }
        },
        [notify, refresh, teamsService],
    );

    return {
        data,
        error,
        isLoading,
        isInviting,
        revokingEmail,
        refresh,
        invite,
        revoke,
    };
}

function errorMessage(error: unknown, fallback = "Please try again."): string {
    return error instanceof Error && error.message ? error.message : fallback;
}
