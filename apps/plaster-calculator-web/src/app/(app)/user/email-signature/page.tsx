"use client";

import { Box, Container } from "@libraries/uikit-web";

import { EmailSignaturePanel } from "../email-signature-panel.js";
import { UserPageHeader } from "../user-page-header.js";

export default function UserEmailSignaturePage() {
    return (
        <>
            <UserPageHeader activeTab="email-signature" />
            <Container size="wide" padding="always">
                <Box direction="column" gap="lg">
                    <EmailSignaturePanel />
                </Box>
            </Container>
        </>
    );
}
