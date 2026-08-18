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

/** Pending invitations shown per "load more" batch in the panel. */
export const PENDING_INVITATIONS_PAGE_SIZE = 10;

export type UseTeamInvitationsResult = Readonly<{
    data: readonly PendingTeamInvitation[];
    error: string | null;
    isLoading: boolean;
    isLoadingMore: boolean;
    hasMore: boolean;
    isInviting: boolean;
    copyingEmail: string | null;
    revokingEmail: string | null;
    refresh(): Promise<void>;
    loadMore(): Promise<void>;
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
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isInviting, setIsInviting] = useState(false);
    const [copyingEmail, setCopyingEmail] = useState<string | null>(null);
    const [revokingEmail, setRevokingEmail] = useState<string | null>(null);

    /**
     * There's no total-count query backing the invitations list, so this
     * fetches `showCount + 1` rows from the start and slices off the extra
     * row if present, to learn whether more remain without a separate count
     * query.
     */
    const fetchFromStart = useCallback(
        async (showCount: number) => {
            const response = await teamsService.listPendingTeamInvitations({
                limit: showCount + 1,
                offset: 0,
            });
            setHasMore(response.invitations.length > showCount);
            setData(response.invitations.slice(0, showCount));
        },
        [teamsService],
    );

    /**
     * Reloads from the start, re-requesting however many rows were already
     * shown (at least a page). This is what remove/revoke and invite
     * handlers call, so it self-heals the "load more" list: if the row that
     * emptied out was the last one loaded, the recomputed `hasMore` and
     * shorter `data` naturally reflect that, rather than leaving a stale
     * load-more affordance around.
     */
    const refresh = useCallback(async () => {
        if (!isEnabled) {
            setData(NO_INVITATIONS);
            setHasMore(false);
            setError(null);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            await fetchFromStart(
                Math.max(data.length, PENDING_INVITATIONS_PAGE_SIZE),
            );
        } catch (loadError) {
            setError(
                errorMessage(loadError, "Unable to load pending invitations."),
            );
        } finally {
            setIsLoading(false);
        }
    }, [data.length, fetchFromStart, isEnabled]);

    // Runs on mount and whenever the panel becomes enabled/disabled or the
    // service instance changes. Deliberately does not list `refresh` itself:
    // its identity tracks `data.length` so it can re-request however many
    // rows were already loaded, and including it here would refetch on
    // every list update instead of only on mount/enablement changes.
    useEffect(() => {
        void refresh();
    }, [isEnabled, teamsService]);

    const loadMore = useCallback(async () => {
        setIsLoadingMore(true);
        setError(null);
        try {
            const response = await teamsService.listPendingTeamInvitations({
                limit: PENDING_INVITATIONS_PAGE_SIZE + 1,
                offset: data.length,
            });
            setHasMore(
                response.invitations.length > PENDING_INVITATIONS_PAGE_SIZE,
            );
            setData((currentData) => [
                ...currentData,
                ...response.invitations.slice(0, PENDING_INVITATIONS_PAGE_SIZE),
            ]);
        } catch (loadError) {
            setError(
                errorMessage(loadError, "Unable to load pending invitations."),
            );
        } finally {
            setIsLoadingMore(false);
        }
    }, [data.length, teamsService]);

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
        isLoadingMore,
        hasMore,
        isInviting,
        copyingEmail,
        revokingEmail,
        refresh,
        loadMore,
        invite,
        copyLink,
        revoke,
    };
}

function errorMessage(error: unknown, fallback = "Please try again."): string {
    return error instanceof Error && error.message ? error.message : fallback;
}
