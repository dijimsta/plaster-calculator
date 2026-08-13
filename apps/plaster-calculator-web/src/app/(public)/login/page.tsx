"use client";

import {
    FirebaseService,
    updateUserDisplayName,
} from "@libraries/plaster-calculator-web-core";
import {
    Alert,
    Button,
    ButtonLink,
    Card,
    Divider,
    GoogleIcon,
    Heading1,
    Paragraph,
} from "@libraries/uikit-web";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    type User,
} from "firebase/auth";
import { useRouter } from "next/navigation.js";
import { useEffect, useState } from "react";
import { Trans } from "react-i18next";

import { useAppTranslation } from "../../../i18n/index.ts";
import { activeTheme, cx } from "../../../lib/styles.js";

import { EmailAuthForm } from "./email-auth-form.js";

const googleProvider = new GoogleAuthProvider();
const auth = FirebaseService.getAuth();

const pageClass = cx(
    "flex min-h-screen items-center justify-center p-5",
    activeTheme.appBg,
    activeTheme.text,
);
const heroClass =
    "flex w-full max-w-[980px] items-center justify-center gap-16 max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-6";
const brandClass =
    "max-w-[480px] flex-1 max-[768px]:max-w-none max-[768px]:text-center";
const cardWrapperClass = "w-full max-w-md shrink-0 max-[768px]:max-w-none";

export default function LoginPage() {
    const router = useRouter();
    const { t } = useAppTranslation();
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [authChecked, setAuthChecked] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setAuthChecked(true);
        });
    }, []);

    async function handleEmailSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            if (isRegistering) {
                const credential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password,
                );
                await updateUserDisplayName(credential.user, displayName);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            router.push("/");
        } catch (err: unknown) {
            setError(
                err instanceof Error
                    ? err.message
                    : t("loginPage.authenticationFailed"),
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleSignIn() {
        setError(null);
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            router.push("/");
        } catch (err: unknown) {
            setError(
                err instanceof Error
                    ? err.message
                    : t("loginPage.googleSignInFailed"),
            );
            setLoading(false);
        }
    }

    if (!authChecked) {
        return null;
    }

    if (currentUser) {
        return (
            <div className={pageClass}>
                <div className={heroClass}>
                    <div className={brandClass}>
                        <Heading1>{t("loginPage.brandName")}</Heading1>
                        <Paragraph textSize="xl">
                            {t("loginPage.signedInDescription")}
                        </Paragraph>
                    </div>

                    <div className={cardWrapperClass}>
                        <Card>
                            <Paragraph>
                                <Trans
                                    t={t}
                                    i18nKey="loginPage.welcomeBack"
                                    values={{
                                        name:
                                            currentUser.displayName ??
                                            currentUser.email ??
                                            t("sidebar.userFallback"),
                                    }}
                                    components={{ strong: <strong /> }}
                                />
                            </Paragraph>
                            <Card.ButtonGroup>
                                <ButtonLink
                                    href="/"
                                    variant="primary"
                                    fullWidth
                                    size="large"
                                >
                                    {t("loginPage.goToApp")}
                                </ButtonLink>
                            </Card.ButtonGroup>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={pageClass}>
            <div className={heroClass}>
                <div className={brandClass}>
                    <Heading1>{t("loginPage.brandName")}</Heading1>
                    <Paragraph textSize="xl">
                        {t("loginPage.description")}
                    </Paragraph>
                </div>

                <div className={cardWrapperClass}>
                    <Card>
                        {error && (
                            <Alert intent="error" variant="light-with-border">
                                {error}
                            </Alert>
                        )}

                        <EmailAuthForm
                            displayName={displayName}
                            email={email}
                            password={password}
                            isRegistering={isRegistering}
                            loading={loading}
                            onDisplayNameChange={setDisplayName}
                            onEmailChange={setEmail}
                            onPasswordChange={setPassword}
                            onSubmit={handleEmailSubmit}
                        />

                        <Divider>{t("loginPage.or")}</Divider>

                        <Button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            variant="secondary"
                            fullWidth
                            size="large"
                            icon={<GoogleIcon />}
                        >
                            {t("loginPage.continueWithGoogle")}
                        </Button>

                        <Card.Footer>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => {
                                    setIsRegistering((v) => !v);
                                    setError(null);
                                }}
                            >
                                {isRegistering
                                    ? t("loginPage.backToLogin")
                                    : t("loginPage.createNewAccount")}
                            </Button>
                        </Card.Footer>
                    </Card>
                </div>
            </div>
        </div>
    );
}
