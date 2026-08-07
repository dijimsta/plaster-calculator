"use client";

import { Box } from "@libraries/uikit-web";

import { EmailSignaturePanel } from "../email-signature-panel.js";
import { userPageStyles as styles } from "../page.styles.js";
import { UserPageHeader } from "../user-page-header.js";

export default function UserEmailSignaturePage() {
    return (
        <>
            <UserPageHeader activeTab="email-signature" />
            <Box direction="column" padding="md">
                <div className={styles.settingsStack}>
                    <EmailSignaturePanel />
                </div>
            </Box>
        </>
    );
}
