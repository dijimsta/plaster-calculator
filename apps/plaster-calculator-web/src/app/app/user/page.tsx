"use client";

import {
    Box,
    Breadcrumb,
    PageHeading,
    Paragraph,
    Text,
} from "@libraries/uikit-web";
import { Home } from "lucide-react";

import { UserSettingsPanel } from "./user-settings.js";
import { useUser } from "../../../auth/user.hook.js";
import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";
import { ThemeSettingsControl } from "../../../components/theme-settings-control.js";
import { activeTheme, cx, ui } from "../../../lib/styles.js";

export default function UserPage() {
    const user = useUser();

    if (!user) return null;

    return (
        <>
            <PageHeading>
                <PageHeading.Breadcrumbs>
                    <Breadcrumb>
                        <RoutedBreadcrumbItem href="/app">
                            <Home size={16} aria-label="Home" />
                        </RoutedBreadcrumbItem>
                        <Breadcrumb.Item current>User</Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>User</PageHeading.Title>
                    <PageHeading.Description>
                        Profile and settings
                    </PageHeading.Description>
                </PageHeading.Content>
            </PageHeading>
            <Box direction="column" padding="md">
                <section className={cx(ui.layoutGrid, "items-start")}>
                    <div className={cx(ui.panel, ui.stack)}>
                        <div className="flex items-center gap-3">
                            {user.photoURL ? (
                                <img
                                    alt=""
                                    className="h-14 w-14 rounded-full object-cover"
                                    src={user.photoURL}
                                />
                            ) : (
                                <div
                                    className={cx(
                                        "flex h-14 w-14 items-center justify-center rounded-full text-xl font-semibold",
                                        activeTheme.softBg,
                                    )}
                                >
                                    {getInitial(user.displayName, user.email)}
                                </div>
                            )}
                            <div>
                                <h2>{user.displayName || "Signed in user"}</h2>
                                <Paragraph textSize="sm" variant="muted">
                                    {user.email || "No email address"}
                                </Paragraph>
                            </div>
                        </div>
                        <dl className="grid gap-3">
                            <ProfileRow label="Name" value={user.displayName} />
                            <ProfileRow label="Email" value={user.email} />
                        </dl>
                        <div className={ui.stack}>
                            <h2>Connected logins</h2>
                            {user.providerData.length > 0 ? (
                                <div className={ui.projectList}>
                                    {user.providerData.map((provider) => (
                                        <div
                                            className={ui.projectItem}
                                            key={`${provider.providerId}-${provider.uid}`}
                                        >
                                            <strong>
                                                {formatProviderId(
                                                    provider.providerId,
                                                )}
                                            </strong>
                                            <Text size="sm" variant="muted">
                                                {provider.email ||
                                                    provider.phoneNumber ||
                                                    provider.uid}
                                            </Text>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Paragraph textSize="sm" variant="muted">
                                    No connected social logins.
                                </Paragraph>
                            )}
                        </div>
                    </div>
                    <div className={ui.stack}>
                        <section className={cx(ui.panel, ui.stack)}>
                            <h2>Appearance</h2>
                            <ThemeSettingsControl />
                        </section>
                        <UserSettingsPanel />
                    </div>
                </section>
            </Box>
        </>
    );
}

function ProfileRow({
    label,
    value,
}: {
    readonly label: string;
    readonly value: string | null | undefined;
}) {
    return (
        <div className="grid gap-1">
            <dt className={ui.label}>{label}</dt>
            <dd className="m-0 break-words">{value || "Not provided"}</dd>
        </div>
    );
}

function getInitial(displayName: string | null, email: string | null): string {
    const source = displayName || email || "U";
    return source.trim().charAt(0).toUpperCase();
}

function formatProviderId(providerId: string): string {
    return providerId
        .replace(".com", "")
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}
