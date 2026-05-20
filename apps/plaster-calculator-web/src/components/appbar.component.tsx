"use client";

import { signOut } from "firebase/auth";
import { User } from "lucide-react";
import { default as LinkModule } from "next/link.js";
import { usePathname, useRouter } from "next/navigation.js";

import { auth } from "../firebase/firebase.utils.js";
import { activeTheme, cx, ui } from "../lib/styles.js";

const Link = LinkModule.default;

const navItems = [
    { href: "/app", label: "Home" },
    { href: "/app/accounts", label: "Accounts" },
] as const;

export default function AppBar() {
    const pathname = usePathname();
    const router = useRouter();

    async function handleLogout() {
        await signOut(auth);
        router.replace("/");
    }

    return (
        <header
            className={cx(
                "flex min-h-16 flex-wrap items-center justify-between gap-3 border-b px-4 py-2",
                activeTheme.appBg,
                activeTheme.line,
            )}
        >
            <div className="flex min-w-0 flex-wrap items-center gap-5">
                <Link
                    className={cx(
                        "grid gap-0.5 no-underline",
                        activeTheme.text,
                    )}
                    href="/app"
                >
                    <span className="text-xl font-semibold leading-tight">
                        Plaster Calculator
                    </span>
                    <span className={cx("text-xs", activeTheme.muted)}>
                        Your quoting workspace
                    </span>
                </Link>
                <nav className="flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            className={cx(
                                ui.navLink,
                                isActivePath(pathname, item.href) &&
                                    ui.navLinkActive,
                            )}
                            href={item.href}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <nav className="flex items-center gap-3">
                <Link
                    className={cx(ui.button, ui.buttonDefault, ui.buttonIcon)}
                    href="/app/user"
                    title="User profile"
                >
                    <User size={18} />
                </Link>
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

function isActivePath(pathname: string, href: string): boolean {
    if (href === "/app") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
}
