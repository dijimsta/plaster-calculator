"use client";

import {
    useEnsureUserTeam,
    useUser,
} from "@libraries/plaster-calculator-web-core";
import { Alert, Button, Card } from "@libraries/uikit-web";
import { type PropsWithChildren } from "react";

import { useAppTranslation } from "../i18n/index.ts";

import {
    initializationErrorCardClass,
    initializationErrorPageClass,
} from "./user-initialized.guard.styles.ts";

export function UserInitializedGuard({ children }: PropsWithChildren) {
    const user = useUser();
    const { t } = useAppTranslation();
    const initialization = useEnsureUserTeam(user);

    if (initialization.initialized) {
        return <>{children}</>;
    } else if (initialization.error) {
        return (
            <div className={initializationErrorPageClass}>
                <div className={initializationErrorCardClass}>
                    <Card>
                        <Alert
                            intent="error"
                            title={t("loginPage.authenticationFailed")}
                        >
                            {errorMessage(
                                initialization.error,
                                t("loginPage.authenticationFailed"),
                            )}
                        </Alert>
                        <Card.ButtonGroup>
                            <Button
                                type="button"
                                variant="primary"
                                fullWidth
                                onClick={initialization.retry}
                            >
                                {t("loginPage.retryTeamSetup")}
                            </Button>
                        </Card.ButtonGroup>
                    </Card>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}
