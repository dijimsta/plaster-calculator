"use client";

import { useState, useEffect } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    type User,
} from "firebase/auth";
import { useRouter } from "next/navigation.js";
import { default as LinkModule } from "next/link.js";

import { auth } from "../firebase/firebase.utils.js";

import styles from "./login.module.css";

const Link = LinkModule.default;
const googleProvider = new GoogleAuthProvider();

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
            <div className={styles["page"]}>
                <div className={styles["hero"]}>
                    <div className={styles["brand"]}>
                        <h1 className={styles["logo"]}>Plaster Calculator</h1>
                        <p className={styles["tagline"]}>
                            Calculate plaster quantities quickly and accurately
                            for any project.
                        </p>
                    </div>

                    <div className={styles["card"]}>
                        <p
                            style={{
                                margin: "0 0 16px",
                                color: "#1c1e21",
                                fontSize: "1rem",
                            }}
                        >
                            Welcome back,{" "}
                            <strong>
                                {currentUser.displayName ?? currentUser.email}
                            </strong>
                            !
                        </p>
                        <Link
                            href="/app"
                            className={styles["submitButton"]}
                            style={{
                                display: "block",
                                textAlign: "center",
                                textDecoration: "none",
                                boxSizing: "border-box",
                            }}
                        >
                            Go to App
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles["page"]}>
            <div className={styles["hero"]}>
                <div className={styles["brand"]}>
                    <h1 className={styles["logo"]}>Plaster Calculator</h1>
                    <p className={styles["tagline"]}>
                        Quote your plastering quickly and accurately for any
                        project.
                    </p>
                </div>

                <div className={styles["card"]}>
                    {error && <p className={styles["error"]}>{error}</p>}

                    <form
                        className={styles["form"]}
                        onSubmit={handleEmailSubmit}
                    >
                        <input
                            type="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles["input"]}
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
                            className={styles["input"]}
                            placeholder="Password"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className={styles["submitButton"]}
                        >
                            {loading ? "Please wait…" : "Log in"}
                        </button>
                    </form>

                    <div className={styles["divider"]}>or</div>

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className={styles["googleButton"]}
                    >
                        <svg
                            className={styles["googleIcon"]}
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            aria-hidden="true"
                        >
                            <path
                                fill="#4285F4"
                                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
                            />
                            <path
                                fill="#34A853"
                                d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z"
                            />
                            <path
                                fill="#EA4335"
                                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 6.294C4.672 4.169 6.656 3.58 9 3.58Z"
                            />
                        </svg>
                        Continue with Google
                    </button>

                    <div className={styles["registerPanel"]}>
                        <button
                            type="button"
                            className={styles["registerLink"]}
                            onClick={() => {
                                setIsRegistering((v) => !v);
                                setError(null);
                            }}
                        >
                            {isRegistering
                                ? "Back to log in"
                                : "Create new account"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
