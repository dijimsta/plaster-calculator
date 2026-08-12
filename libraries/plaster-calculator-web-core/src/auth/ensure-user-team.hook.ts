"use client";

import type { User } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";

import { useTeamsService } from "../teams/teams.hooks.ts";

import { initializeUserTeam } from "./initialize-user-team.ts";

interface InitializationState {
    uid?: string;
    status: "idle" | "loading" | "ready" | "error";
    error?: unknown;
}

export interface EnsureUserTeamResult {
    initialized: boolean;
    error: unknown;
    retry(): void;
}

export function useEnsureUserTeam(
    user: User | null | undefined,
): EnsureUserTeamResult {
    const teamsService = useTeamsService();
    const [attempt, setAttempt] = useState(0);
    const [state, setState] = useState<InitializationState>({ status: "idle" });

    useEffect(() => {
        let isActive = true;
        if (user !== null && user !== undefined) {
            setState({ uid: user.uid, status: "loading" });
            void (async () => {
                try {
                    await initializeUserTeam(user, teamsService);
                    if (isActive) {
                        setState({ uid: user.uid, status: "ready" });
                    }
                } catch (error: unknown) {
                    if (isActive) {
                        setState({ uid: user.uid, status: "error", error });
                    }
                }
            })();
        }

        return () => {
            isActive = false;
        };
    }, [attempt, user, teamsService]);

    const retry = useCallback(() => {
        setAttempt((value) => value + 1);
    }, []);

    const isCurrentUser =
        user !== null && user !== undefined && state.uid === user.uid;

    return {
        initialized: isCurrentUser && state.status === "ready",
        error: isCurrentUser && state.status === "error" ? state.error : null,
        retry,
    };
}
