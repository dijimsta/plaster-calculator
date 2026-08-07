"use client";

import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import {
    Alert,
    Button,
    ButtonLink,
    Card,
    Divider,
    FormLayout,
    GoogleIcon,
    Input,
    Paragraph,
} from "@libraries/uikit-web";
import { Heading1 } from "@ui/atoms";
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

import { activeTheme, cx } from "../lib/styles.js";

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
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            router.push("/app");
        } catch (err: unknown) {
            setError(
                err instanceof Error ? err.message : "Authentication failed.",
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
            router.push("/app");
        } catch (err: unknown) {
            setError(
                err instanceof Error ? err.message : "Google sign-in failed.",
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
                        <Heading1>Plaster Calculator</Heading1>
                        <Paragraph textSize="xl">
                            Calculate plaster quantities quickly and accurately
                            for any project.
                        </Paragraph>
                    </div>

                    <div className={cardWrapperClass}>
                        <Card>
                            <Paragraph>
                                Welcome back,{" "}
                                <strong>
                                    {currentUser.displayName ??
                                        currentUser.email}
                                </strong>
                                !
                            </Paragraph>
                            <Card.ButtonGroup>
                                <ButtonLink
                                    href="/app"
                                    variant="primary"
                                    fullWidth
                                    size="large"
                                >
                                    Go to App
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
                    <Heading1>Plaster Calculator</Heading1>
                    <Paragraph textSize="xl">
                        Quote your plastering quickly and accurately for any
                        project.
                    </Paragraph>
                </div>

                <div className={cardWrapperClass}>
                    <Card>
                        {error && (
                            <Alert intent="error" variant="light-with-border">
                                {error}
                            </Alert>
                        )}

                        <FormLayout onSubmit={handleEmailSubmit}>
                            <Input
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                            />
                            <Input
                                type="password"
                                required
                                autoComplete={
                                    isRegistering
                                        ? "new-password"
                                        : "current-password"
                                }
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                            <Button
                                type="submit"
                                disabled={loading}
                                variant="primary"
                                fullWidth
                                size="large"
                            >
                                {loading ? "Please wait…" : "Log in"}
                            </Button>
                        </FormLayout>

                        <Divider>or</Divider>

                        <Button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            variant="secondary"
                            fullWidth
                            size="large"
                            icon={<GoogleIcon />}
                        >
                            Continue with Google
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
                                    ? "Back to log in"
                                    : "Create new account"}
                            </Button>
                        </Card.Footer>
                    </Card>
                </div>
            </div>
        </div>
    );
}
