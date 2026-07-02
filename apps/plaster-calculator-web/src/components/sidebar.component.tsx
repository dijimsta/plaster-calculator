"use client";

import {
    Button,
    ButtonLink,
    SidebarLayout,
    SidebarNavigation,
    VerticalNavigation,
} from "@libraries/uikit-web";
import { signOut } from "firebase/auth";
import * as Icons from "lucide-react";
import { default as LinkModule } from "next/link.js";
import { usePathname, useRouter } from "next/navigation.js";

import { auth } from "../firebase/firebase.utils.js";

import type { PropsWithChildren } from "react";

const Link = LinkModule.default;

const navItems = [
    { href: "/app" as const, label: "Home", Icon: Icons.Home },
    { href: "/app/accounts" as const, label: "Accounts", Icon: Icons.Users },
];

export default function Sidebar({ children }: PropsWithChildren) {
    const pathname = usePathname();
    const router = useRouter();

    async function handleLogout() {
        await signOut(auth);
        router.replace("/");
    }

    return (
        <SidebarLayout>
            <SidebarLayout.Sidebar>
                <SidebarNavigation>
                    <SidebarNavigation.Header>
                        <Link href="/app">
                            <strong>Plaster Calculator</strong>
                        </Link>
                    </SidebarNavigation.Header>
                    <SidebarNavigation.Body>
                        <VerticalNavigation aria-label="Application navigation">
                            <VerticalNavigation.Section>
                                {navItems.map((item) => (
                                    <VerticalNavigation.Item
                                        key={item.href}
                                        isCurrent={isActivePath(
                                            pathname,
                                            item.href,
                                        )}
                                    >
                                        <Link href={item.href}>
                                            <item.Icon aria-hidden="true" />
                                            {item.label}
                                        </Link>
                                    </VerticalNavigation.Item>
                                ))}
                            </VerticalNavigation.Section>
                        </VerticalNavigation>
                    </SidebarNavigation.Body>
                    <SidebarNavigation.Footer>
                        <ButtonLink href="/app/user">
                            <Icons.User aria-hidden="true" />
                            Profile
                        </ButtonLink>
                        <Button
                            variant="secondary"
                            icon={<Icons.LogOut aria-hidden="true" />}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </SidebarNavigation.Footer>
                </SidebarNavigation>
            </SidebarLayout.Sidebar>
            <SidebarLayout.Main>{children}</SidebarLayout.Main>
        </SidebarLayout>
    );
}

function isActivePath(pathname: string, href: string): boolean {
    if (href === "/app") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
}
