"use client";

import {
    FirebaseService,
    initializeUserTeam,
    useTeamsService,
} from "@libraries/plaster-calculator-web-core";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    type User,
} from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation.js";
import { useEffect, useState } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";

const googleProvider = new GoogleAuthProvider();
const auth = FirebaseService.getAuth();

export function useLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const teamsService = useTeamsService();
    const { t } = useAppTranslation();
    const invitationToken = searchParams.get("invitation") ?? undefined;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [authChecked, setAuthChecked] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [teamSetupAttempt, setTeamSetupAttempt] = useState(0);

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setAuthChecked(true);
        });
    }, []);

    useEffect(() => {
        let isActive = true;
        if (currentUser) {
            setError(null);
            setLoading(true);
            void initializeUserTeam(currentUser, teamsService, invitationToken)
                .then(() => {
                    if (isActive) router.replace("/");
                })
                .catch((setupError: unknown) => {
                    if (isActive) {
                        setError(
                            errorMessage(
                                setupError,
                                t("loginPage.authenticationFailed"),
                            ),
                        );
                        setLoading(false);
                    }
                });
        }

        return () => {
            isActive = false;
        };
    }, [
        currentUser,
        invitationToken,
        router,
        teamSetupAttempt,
        teamsService,
        t,
    ]);

    async function handleEmailSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await (isRegistering
                ? createUserWithEmailAndPassword(auth, email, password)
                : signInWithEmailAndPassword(auth, email, password));
        } catch (submitError: unknown) {
            setError(
                errorMessage(submitError, t("loginPage.authenticationFailed")),
            );
            setLoading(false);
        }
    }

    async function handleGoogleSignIn() {
        setError(null);
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (signInError: unknown) {
            setError(
                errorMessage(signInError, t("loginPage.googleSignInFailed")),
            );
            setLoading(false);
        }
    }

    async function handleUseAnotherAccount() {
        setLoading(true);
        try {
            await signOut(auth);
            setError(null);
        } catch (signOutError: unknown) {
            setError(
                errorMessage(signOutError, t("loginPage.authenticationFailed")),
            );
        } finally {
            setLoading(false);
        }
    }

    return {
        authChecked,
        currentUser,
        email,
        error,
        handleEmailSubmit,
        handleGoogleSignIn,
        handleUseAnotherAccount,
        isRegistering,
        loading,
        password,
        retryTeamSetup: () => setTeamSetupAttempt((attempt) => attempt + 1),
        setEmail,
        setPassword,
        toggleRegistration: () => {
            setIsRegistering((value) => !value);
            setError(null);
        },
    };
}

function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}
