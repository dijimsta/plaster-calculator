"use client";

import { Box, Paragraph, Text } from "@libraries/uikit-web";

import { userPageStyles as styles } from "./page.styles.js";
import { UserPageHeader } from "./user-page-header.js";
import { UserSettingsPanel } from "./user-settings.js";
import { useUser } from "../../../auth/user.hook.js";
import { ThemeSettingsControl } from "../../../components/theme-settings-control.js";

export default function UserPage() {
    const user = useUser();

    if (!user) return null;

    return (
        <>
            <UserPageHeader activeTab="general" />
            <Box direction="column" padding="md">
                <div className={styles.settingsStack}>
                    <section className={styles.section}>
                        <div className={styles.sectionCopy}>
                            <h2 className={styles.sectionTitle}>Profile</h2>
                            <Paragraph
                                className={styles.sectionDescription}
                                textSize="sm"
                                variant="muted"
                            >
                                Account details from your signed-in profile and
                                connected login providers.
                            </Paragraph>
                        </div>
                        <div className={styles.settingsPanel}>
                            <div className={styles.profileHeader}>
                                {user.photoURL ? (
                                    <img
                                        alt=""
                                        className={styles.avatar}
                                        src={user.photoURL}
                                    />
                                ) : (
                                    <div className={styles.avatarFallback}>
                                        {getInitial(
                                            user.displayName,
                                            user.email,
                                        )}
                                    </div>
                                )}
                                <div className={styles.profileText}>
                                    <h3 className={styles.profileName}>
                                        {user.displayName || "Signed in user"}
                                    </h3>
                                    <Paragraph textSize="sm" variant="muted">
                                        {user.email || "No email address"}
                                    </Paragraph>
                                </div>
                            </div>
                            <dl className={styles.metaList}>
                                <ProfileRow
                                    label="Name"
                                    value={user.displayName}
                                />
                                <ProfileRow label="Email" value={user.email} />
                            </dl>
                            <div className={styles.providerSection}>
                                <h3 className={styles.sectionTitle}>
                                    Connected logins
                                </h3>
                                {user.providerData.length > 0 ? (
                                    <div className={styles.providerList}>
                                        {user.providerData.map((provider) => (
                                            <div
                                                className={styles.providerItem}
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
                    </section>
                    <section className={styles.section}>
                        <div className={styles.sectionCopy}>
                            <h2 className={styles.sectionTitle}>Appearance</h2>
                            <Paragraph
                                className={styles.sectionDescription}
                                textSize="sm"
                                variant="muted"
                            >
                                Choose the colour mode used across the
                                calculator workspace.
                            </Paragraph>
                        </div>
                        <div className={styles.settingsPanel}>
                            <ThemeSettingsControl />
                        </div>
                    </section>
                    <UserSettingsPanel />
                </div>
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
        <div className={styles.metaRow}>
            <dt className={styles.fieldLabel}>{label}</dt>
            <dd className={styles.value}>{value || "Not provided"}</dd>
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
