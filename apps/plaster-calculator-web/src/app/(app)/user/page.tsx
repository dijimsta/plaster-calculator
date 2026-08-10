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

import { UserPageHeader } from "./user-page-header.js";
import { UserSettingsPanel } from "./user-settings.js";

export default function UserPage() {
    const user = useUser();

    if (!user) return null;

    return (
        <>
            <UserPageHeader activeTab="general" />
            <Container size="wide" padding="always">
                <Box direction="column" gap="lg">
                    <Card>
                        <Card.Title>Profile</Card.Title>
                        <Paragraph
                            measure="narrow"
                            textSize="sm"
                            variant="muted"
                        >
                            Account details from your signed-in profile and
                            connected login providers.
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
                                        {user.displayName || "Signed in user"}
                                    </Heading5>
                                    <Paragraph textSize="sm" variant="muted">
                                        {user.email || "No email address"}
                                    </Paragraph>
                                </Box>
                            </Box>
                            <DescriptionList
                                items={[
                                    {
                                        term: "Name",
                                        details:
                                            user.displayName || "Not provided",
                                    },
                                    {
                                        term: "Email",
                                        details: user.email || "Not provided",
                                    },
                                ]}
                            />
                            <Box direction="column" gap="md">
                                <Heading6>Connected logins</Heading6>
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
                                        No connected social logins.
                                    </Paragraph>
                                )}
                            </Box>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Title>Appearance</Card.Title>
                        <Paragraph
                            measure="narrow"
                            textSize="sm"
                            variant="muted"
                        >
                            Choose the colour mode used across the calculator
                            workspace.
                        </Paragraph>
                        <Card.Body>
                            <ThemeSettingsControl />
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Title>Language</Card.Title>
                        <Paragraph
                            measure="narrow"
                            textSize="sm"
                            variant="muted"
                        >
                            Choose the language used for questionnaire forms.
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
