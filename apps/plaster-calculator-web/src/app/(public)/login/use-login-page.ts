"use client";

import {
    FirebaseService,
    initializeUserTeam,
    updateUserDisplayName,
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
    type UserCredential,
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
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [authChecked, setAuthChecked] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isEmailRegistrationPending, setIsEmailRegistrationPending] =
        useState(false);
    const [teamSetupAttempt, setTeamSetupAttempt] = useState(0);

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setAuthChecked(true);
        });
    }, []);

    useEffect(() => {
        let isActive = true;
        if (currentUser && !isEmailRegistrationPending) {
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
        isEmailRegistrationPending,
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
        setIsEmailRegistrationPending(isRegistering);
        try {
            await authenticateWithEmail({
                displayName,
                email,
                isRegistering,
                password,
            });
            setIsEmailRegistrationPending(false);
            setTeamSetupAttempt((attempt) => attempt + 1);
        } catch (submitError: unknown) {
            setIsEmailRegistrationPending(false);
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
        displayName,
        email,
        error,
        handleEmailSubmit,
        handleGoogleSignIn,
        handleUseAnotherAccount,
        isRegistering,
        loading,
        password,
        retryTeamSetup: () => setTeamSetupAttempt((attempt) => attempt + 1),
        setDisplayName,
        setEmail,
        setPassword,
        toggleRegistration: () => {
            setIsRegistering((value) => !value);
            setError(null);
        },
    };
}

type AuthenticateWithEmailOptions = Readonly<{
    displayName: string;
    email: string;
    isRegistering: boolean;
    password: string;
}>;

async function authenticateWithEmail({
    displayName,
    email,
    isRegistering,
    password,
}: AuthenticateWithEmailOptions): Promise<UserCredential> {
    if (!isRegistering) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
    );
    await updateUserDisplayName(credential.user, displayName);
    return credential;
}

function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}
