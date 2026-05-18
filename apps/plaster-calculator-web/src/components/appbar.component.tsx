"use client";

import { signOut } from "firebase/auth";
import { default as LinkModule } from "next/link.js";
import { useRouter } from "next/navigation.js";

import { auth } from "../firebase/firebase.utils.js";
import { activeTheme, cx, ui } from "../lib/styles.js";

const Link = LinkModule.default;

export default function AppBar() {
    const router = useRouter();

    async function handleLogout() {
        await signOut(auth);
        router.replace("/");
    }

    return (
        <header
            className={cx(
                "flex h-16 items-center justify-between border-b px-4",
                activeTheme.appBg,
                activeTheme.line,
            )}
        >
            <Link
                className={cx(
                    "text-xl font-semibold no-underline",
                    activeTheme.text,
                )}
                href="/app"
            >
                Plaster Calculator
            </Link>
            <nav className="flex items-center gap-3">
                <button
                    className={cx(ui.button, ui.buttonDefault)}
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </nav>
        </header>
    );
}
