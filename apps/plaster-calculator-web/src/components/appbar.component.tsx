"use client";

import { signOut } from "firebase/auth";
import { default as LinkModule } from "next/link.js";
import { useRouter } from "next/navigation.js";

import { auth } from "../firebase/firebase.utils.js";

const Link = LinkModule.default;

export default function AppBar() {
    const router = useRouter();

    async function handleLogout() {
        await signOut(auth);
        router.replace("/");
    }

    return (
        <header
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 1rem",
                height: "64px",
                borderBottom: "1px solid #e0e0e0",
            }}
        >
            <Link
                href="/app"
                style={{
                    color: "#171a1f",
                    fontWeight: 600,
                    fontSize: "1.25rem",
                    textDecoration: "none",
                }}
            >
                Plaster Calculator
            </Link>
            <nav
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                }}
            >
                <Link
                    href="/app/movies"
                    style={{
                        color: "#165dff",
                        fontWeight: 600,
                        textDecoration: "none",
                    }}
                >
                    Movies
                </Link>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    );
}
