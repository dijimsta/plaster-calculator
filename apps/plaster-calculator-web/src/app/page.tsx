"use client";

import { Button, ButtonLink } from "@libraries/uikit-web";
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

import { auth } from "../firebase/firebase.utils.js";
import { activeTheme, cx, ui } from "../lib/styles.js";

const googleProvider = new GoogleAuthProvider();

const pageClass = cx(
    "flex min-h-screen items-center justify-center p-5",
    activeTheme.appBg,
    activeTheme.text,
);
const heroClass =
    "flex w-full max-w-[980px] items-center justify-center gap-16 max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-6";
const brandClass =
    "max-w-[480px] flex-1 max-[768px]:max-w-none max-[768px]:text-center";
const logoClass = "mb-4 text-5xl font-bold leading-none max-[768px]:text-4xl";
const taglineClass =
    "m-0 text-xl leading-relaxed text-slate-600 dark:text-slate-300 max-[768px]:text-lg";
const cardClass = cx(
    "w-full max-w-md shrink-0 max-[768px]:max-w-none",
    ui.panel,
);
const formClass = "flex flex-col gap-3";
const inputClass = cx(ui.input, "py-3.5");

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
                        <h1 className={logoClass}>Plaster Calculator</h1>
                        <p className={taglineClass}>
                            Calculate plaster quantities quickly and accurately
                            for any project.
                        </p>
                    </div>

                    <div className={cardClass}>
                        <p className="mb-4 mt-0 text-base">
                            Welcome back,{" "}
                            <strong>
                                {currentUser.displayName ?? currentUser.email}
                            </strong>
                            !
                        </p>
                        <ButtonLink
                            href="/app"
                            variant="primary"
                            className="w-full py-3.5 font-bold"
                        >
                            Go to App
                        </ButtonLink>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={pageClass}>
            <div className={heroClass}>
                <div className={brandClass}>
                    <h1 className={logoClass}>Plaster Calculator</h1>
                    <p className={taglineClass}>
                        Quote your plastering quickly and accurately for any
                        project.
                    </p>
                </div>

                <div className={cardClass}>
                    {error && (
                        <p className="rounded-md border border-red-300 bg-red-50 px-3.5 py-2.5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
                            {error}
                        </p>
                    )}

                    <form className={formClass} onSubmit={handleEmailSubmit}>
                        <input
                            type="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputClass}
                            placeholder="Email address"
                        />
                        <input
                            type="password"
                            required
                            autoComplete={
                                isRegistering
                                    ? "new-password"
                                    : "current-password"
                            }
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={inputClass}
                            placeholder="Password"
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                            variant="primary"
                            className="w-full py-3.5 font-bold"
                        >
                            {loading ? "Please wait…" : "Log in"}
                        </Button>
                    </form>

                    <div className="my-1 flex items-center gap-3 text-sm text-slate-500 before:h-px before:flex-1 before:bg-slate-200 before:content-[''] after:h-px after:flex-1 after:bg-slate-200 after:content-[''] dark:text-slate-400 dark:before:bg-slate-800 dark:after:bg-slate-800">
                        or
                    </div>

                    <Button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        variant="secondary"
                        className="w-full py-3.5"
                    >
                        <span className="text-lg font-bold leading-none">
                            G
                        </span>
                        Continue with Google
                    </Button>

                    <div className="mt-4 border-t border-slate-200 pt-4 text-center dark:border-slate-800">
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
                    </div>
                </div>
            </div>
        </div>
    );
}
