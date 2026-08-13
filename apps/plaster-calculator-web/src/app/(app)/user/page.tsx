"use client";

import { useUser } from "@libraries/plaster-calculator-web-core";
import {
    Avatar,
    Box,
    Card,
    Container,
    DescriptionList,
    Heading5,
    Heading6,
    Paragraph,
    StackedList,
    Text,
} from "@libraries/uikit-web";

import { LanguageSettingsControl } from "../../../components/language-settings-control.js";
import { ThemeSettingsControl } from "../../../components/theme-settings-control.js";
import { useAppTranslation } from "../../../i18n/index.ts";

import { UserPageHeader } from "./user-page-header.js";
import { UserProfileNameForm } from "./user-profile-name-form.js";
import { UserSettingsPanel } from "./user-settings.js";

export default function UserPage() {
    const { t } = useAppTranslation();
    const user = useUser();

    if (!user) return null;

    return (
        <>
            <UserPageHeader activeTab="general" />
            <Container size="wide" padding="always">
                <Box direction="column" gap="lg">
                    <Card>
                        <Card.Title>{t("userPage.profile.title")}</Card.Title>
                        <Paragraph
                            measure="narrow"
                            textSize="sm"
                            variant="muted"
                        >
                            {t("userPage.profile.description")}
                        </Paragraph>
                        <Card.Body>
                            <Box align="center" gap="lg">
                                <Avatar
                                    src={user.photoURL ?? undefined}
                                    initials={
                                        user.photoURL
                                            ? undefined
                                            : getInitial(
                                                  user.displayName,
                                                  user.email,
                                              )
                                    }
                                    size="xl"
                                />
                                <Box direction="column">
                                    <Heading5>
                                        {user.displayName ||
                                            t("userPage.profile.signedInUser")}
                                    </Heading5>
                                    <Paragraph textSize="sm" variant="muted">
                                        {user.email ||
                                            t(
                                                "userPage.profile.noEmailAddress",
                                            )}
                                    </Paragraph>
                                </Box>
                            </Box>
                            <DescriptionList
                                items={[
                                    {
                                        term: t(
                                            "userPage.profile.fields.email",
                                        ),
                                        details:
                                            user.email ||
                                            t("userPage.profile.notProvided"),
                                    },
                                ]}
                            />
                            <UserProfileNameForm user={user} />
                            <Box direction="column" gap="md">
                                <Heading6>
                                    {t("userPage.profile.connectedLogins")}
                                </Heading6>
                                {user.providerData.length > 0 ? (
                                    <StackedList bordered>
                                        {user.providerData.map((provider) => (
                                            <StackedList.Item
                                                key={`${provider.providerId}-${provider.uid}`}
                                            >
                                                <Box
                                                    direction="column"
                                                    gap="xs"
                                                >
                                                    <strong>
                                                        {formatProviderId(
                                                            provider.providerId,
                                                        )}
                                                    </strong>
                                                    <Text
                                                        size="sm"
                                                        variant="muted"
                                                    >
                                                        {provider.email ||
                                                            provider.phoneNumber ||
                                                            provider.uid}
                                                    </Text>
                                                </Box>
                                            </StackedList.Item>
                                        ))}
                                    </StackedList>
                                ) : (
                                    <Paragraph textSize="sm" variant="muted">
                                        {t(
                                            "userPage.profile.noConnectedSocialLogins",
                                        )}
                                    </Paragraph>
                                )}
                            </Box>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Title>
                            {t("userPage.appearance.title")}
                        </Card.Title>
                        <Paragraph
                            measure="narrow"
                            textSize="sm"
                            variant="muted"
                        >
                            {t("userPage.appearance.description")}
                        </Paragraph>
                        <Card.Body>
                            <ThemeSettingsControl />
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Title>{t("userPage.language.title")}</Card.Title>
                        <Paragraph
                            measure="narrow"
                            textSize="sm"
                            variant="muted"
                        >
                            {t("userPage.language.description")}
                        </Paragraph>
                        <Card.Body>
                            <LanguageSettingsControl />
                        </Card.Body>
                    </Card>
                    <UserSettingsPanel />
                </Box>
            </Container>
        </>
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
