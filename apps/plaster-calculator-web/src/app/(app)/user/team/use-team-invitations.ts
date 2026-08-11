"use client";

import type {
    CreateTeamInvitationRequest,
    CreateTeamInvitationResponse,
    PendingTeamInvitation,
} from "@libraries/plaster-calculator-common";
import { useTeamsService } from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useCallback, useEffect, useState } from "react";

import { buildInvitationUrl } from "./team-invitation-links.js";

const NO_INVITATIONS: readonly PendingTeamInvitation[] = [];

export type UseTeamInvitationsResult = Readonly<{
    data: readonly PendingTeamInvitation[];
    error: string | null;
    isLoading: boolean;
    isInviting: boolean;
    copyingEmail: string | null;
    revokingEmail: string | null;
    refresh(): Promise<void>;
    invite(
        input: CreateTeamInvitationRequest,
    ): Promise<CreateTeamInvitationResponse | null>;
    copyLink(invitation: PendingTeamInvitation): Promise<boolean>;
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
    const [copyingEmail, setCopyingEmail] = useState<string | null>(null);
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
                const response = await teamsService.createTeamInvitation(input);
                await refresh();
                notify({ intent: "success", title: "Invitation created." });
                return response;
            } catch (inviteError) {
                notify({
                    intent: "error",
                    title: "Unable to send invitation.",
                    description: errorMessage(inviteError),
                });
                return null;
            } finally {
                setIsInviting(false);
            }
        },
        [notify, refresh, teamsService],
    );

    const copyLink = useCallback(
        async (invitation: PendingTeamInvitation) => {
            setCopyingEmail(invitation.email);
            try {
                const response = await teamsService.createTeamInvitation({
                    email: invitation.email,
                    role: invitation.role,
                });
                const invitationUrl = buildInvitationUrl(
                    response.path,
                    window.location.origin,
                );
                await navigator.clipboard.writeText(invitationUrl);
                await refresh();
                notify({
                    intent: "success",
                    title: "Invitation link copied.",
                    description:
                        "The previous link was replaced with this new seven-day invitation.",
                });
                return true;
            } catch (copyError) {
                notify({
                    intent: "error",
                    title: "Unable to copy invitation link.",
                    description: errorMessage(copyError),
                });
                return false;
            } finally {
                setCopyingEmail(null);
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
        copyingEmail,
        revokingEmail,
        refresh,
        invite,
        copyLink,
        revoke,
    };
}

function errorMessage(error: unknown, fallback = "Please try again."): string {
    return error instanceof Error && error.message ? error.message : fallback;
}
