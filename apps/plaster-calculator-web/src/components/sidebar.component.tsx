"use client";

import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import {
    Avatar,
    Box,
    Button,
    ButtonLink,
    IconTile,
    SidebarLayout,
    SidebarNavigation,
    Text,
    VerticalNavigation,
} from "@libraries/uikit-web";
import { signOut } from "firebase/auth";
import * as Icons from "lucide-react";
import { default as LinkModule } from "next/link.js";
import { usePathname, useRouter } from "next/navigation.js";

import { useUserInitials } from "../auth/user-initials.hook.js";
import { useUser } from "../auth/user.hook.js";

import type { PropsWithChildren } from "react";

const Link = LinkModule.default;

const navItems = [
    { href: "/app" as const, label: "Home", Icon: Icons.Home },
    {
        href: "/app/projects" as const,
        label: "Projects",
        Icon: Icons.Building2,
    },
    {
        href: "/app/questionnaires" as const,
        label: "Questionnaires",
        Icon: Icons.ClipboardList,
    },
    { href: "/app/accounts" as const, label: "Accounts", Icon: Icons.Users },
];

export default function Sidebar({ children }: PropsWithChildren) {
    const pathname = usePathname();
    const router = useRouter();
    const user = useUser();
    const initials = useUserInitials();

    async function handleLogout() {
        await signOut(FirebaseService.getAuth());
        router.replace("/");
    }

    const displayName = user?.displayName ?? "User";

    return (
        <SidebarLayout>
            <SidebarLayout.Sidebar>
                <SidebarNavigation>
                    <SidebarNavigation.Header>
                        <Link href="/app">
                            <Box direction="row" align="center" gap="sm">
                                <IconTile size="sm" tone="dark">
                                    <Icons.Layers
                                        size={16}
                                        aria-hidden="true"
                                    />
                                </IconTile>
                                <Text size="sm">Plaster Calculator</Text>
                            </Box>
                        </Link>
                    </SidebarNavigation.Header>
                    <SidebarNavigation.Body>
                        <VerticalNavigation aria-label="Application navigation">
                            <VerticalNavigation.Section title="Workspace">
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
                        <Box direction="row" align="center">
                            <Avatar
                                initials={initials}
                                shape="circular"
                                size="sm"
                            />
                            <Box grow>
                                <ButtonLink href="/app/user" variant="ghost">
                                    <Box direction="column" align="start">
                                        <Text size="sm">{displayName}</Text>
                                        <Text size="xs" variant="muted">
                                            User
                                        </Text>
                                    </Box>
                                </ButtonLink>
                            </Box>
                            <Button
                                variant="secondary"
                                icon={<Icons.LogOut aria-hidden="true" />}
                                aria-label="Log out"
                                onClick={handleLogout}
                            />
                        </Box>
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
