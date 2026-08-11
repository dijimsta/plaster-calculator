"use client";

import {
    FirebaseService,
    useUser,
    useUserInitials,
} from "@libraries/plaster-calculator-web-core";
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
import type { PropsWithChildren } from "react";

import { useAppTranslation } from "../i18n/index.ts";

const Link = LinkModule.default;

const navItems = [
    { href: "/" as const, labelKey: "home" as const, Icon: Icons.Home },
    {
        href: "/projects" as const,
        labelKey: "projects" as const,
        Icon: Icons.Building2,
    },
    {
        href: "/questionnaires" as const,
        labelKey: "questionnaires" as const,
        Icon: Icons.ClipboardList,
    },
    {
        href: "/quotes" as const,
        labelKey: "quotes" as const,
        Icon: Icons.FileText,
    },
    {
        href: "/companies" as const,
        labelKey: "companies" as const,
        Icon: Icons.Users,
    },
];

export default function Sidebar({ children }: PropsWithChildren) {
    const pathname = usePathname();
    const router = useRouter();
    const user = useUser();
    const initials = useUserInitials();
    const { t } = useAppTranslation();

    async function handleLogout() {
        await signOut(FirebaseService.getAuth());
        router.replace("/login");
    }

    const userFallback = t("sidebar.userFallback");
    const displayName = user?.displayName ?? userFallback;
    const navLabels: Record<(typeof navItems)[number]["labelKey"], string> = {
        home: t("sidebar.navLabels.home"),
        projects: t("sidebar.navLabels.projects"),
        questionnaires: t("sidebar.navLabels.questionnaires"),
        quotes: t("sidebar.navLabels.quotes"),
        companies: t("sidebar.navLabels.companies"),
    };

    return (
        <SidebarLayout>
            <SidebarLayout.Sidebar>
                <SidebarNavigation>
                    <SidebarNavigation.Header>
                        <Link href="/">
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
                        <VerticalNavigation
                            label={t("sidebar.navigationLabel")}
                        >
                            <VerticalNavigation.Section
                                title={t("sidebar.workspaceSectionTitle")}
                            >
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
                                            {navLabels[item.labelKey]}
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
                                <ButtonLink href="/user" variant="ghost">
                                    <Box direction="column" align="start">
                                        <Text size="sm">{displayName}</Text>
                                        <Text size="xs" variant="muted">
                                            {userFallback}
                                        </Text>
                                    </Box>
                                </ButtonLink>
                            </Box>
                            <Button
                                variant="secondary"
                                icon={<Icons.LogOut aria-hidden="true" />}
                                label={t("sidebar.logOut")}
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
    if (href === "/") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
}
