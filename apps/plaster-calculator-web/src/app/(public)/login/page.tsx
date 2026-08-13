"use client";

import {
    Alert,
    Button,
    Card,
    Divider,
    GoogleIcon,
    Heading1,
    Paragraph,
} from "@libraries/uikit-web";
import { Suspense } from "react";
import { Trans } from "react-i18next";

import { useAppTranslation } from "../../../i18n/index.ts";
import { activeTheme, cx } from "../../../lib/styles.js";

import { EmailAuthForm } from "./email-auth-form.js";
import { useLoginPage } from "./use-login-page.ts";

const pageClass = cx(
    "flex min-h-screen items-center justify-center p-5",
    activeTheme.appBg,
    activeTheme.text,
);
const heroClass =
    "flex w-full max-w-[980px] items-center justify-center gap-16 max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-6";
const brandClass =
    "max-w-[480px] flex-1 max-[768px]:max-w-none max-[768px]:text-center";
const cardWrapperClass = "w-full max-w-md shrink-0 max-[768px]:max-w-none";

export default function LoginPage() {
    return (
        <Suspense fallback={null}>
            <LoginPageContent />
        </Suspense>
    );
}

function LoginPageContent() {
    const login = useLoginPage();
    const { t } = useAppTranslation();

    if (!login.authChecked) {
        return null;
    }

    if (login.currentUser) {
        return <SignedInPage login={login} />;
    }

    return (
        <div className={pageClass}>
            <div className={heroClass}>
                <div className={brandClass}>
                    <Heading1>{t("loginPage.brandName")}</Heading1>
                    <Paragraph textSize="xl">
                        {t("loginPage.description")}
                    </Paragraph>
                </div>

                <div className={cardWrapperClass}>
                    <Card>
                        {login.error && (
                            <Alert intent="error" variant="light-with-border">
                                {login.error}
                            </Alert>
                        )}

                        <EmailAuthForm
                            displayName={login.displayName}
                            email={login.email}
                            password={login.password}
                            isRegistering={login.isRegistering}
                            loading={login.loading}
                            onDisplayNameChange={login.setDisplayName}
                            onEmailChange={login.setEmail}
                            onPasswordChange={login.setPassword}
                            onSubmit={login.handleEmailSubmit}
                        />

                        <Divider>{t("loginPage.or")}</Divider>

                        <Button
                            type="button"
                            onClick={login.handleGoogleSignIn}
                            disabled={login.loading}
                            variant="secondary"
                            fullWidth
                            size="large"
                            icon={<GoogleIcon />}
                        >
                            {t("loginPage.continueWithGoogle")}
                        </Button>

                        <Card.Footer>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={login.toggleRegistration}
                            >
                                {login.isRegistering
                                    ? t("loginPage.backToLogin")
                                    : t("loginPage.createNewAccount")}
                            </Button>
                        </Card.Footer>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function SignedInPage({
    login,
}: Readonly<{ login: ReturnType<typeof useLoginPage> }>) {
    const { t } = useAppTranslation();
    const currentUser = login.currentUser;
    if (!currentUser) return null;

    return (
        <div className={pageClass}>
            <div className={heroClass}>
                <div className={brandClass}>
                    <Heading1>{t("loginPage.brandName")}</Heading1>
                    <Paragraph textSize="xl">
                        {t("loginPage.signedInDescription")}
                    </Paragraph>
                </div>

                <div className={cardWrapperClass}>
                    <Card>
                        {login.error && (
                            <Alert intent="error" variant="light-with-border">
                                {login.error}
                            </Alert>
                        )}
                        <Paragraph>
                            <Trans
                                t={t}
                                i18nKey="loginPage.welcomeBack"
                                values={{
                                    name:
                                        currentUser.displayName ??
                                        currentUser.email ??
                                        t("sidebar.userFallback"),
                                }}
                                components={{ strong: <strong /> }}
                            />
                        </Paragraph>
                        <Card.ButtonGroup>
                            <Button
                                type="button"
                                variant="primary"
                                fullWidth
                                size="large"
                                disabled={login.loading}
                                onClick={login.retryTeamSetup}
                            >
                                {login.loading
                                    ? t("loginPage.loading")
                                    : t("loginPage.retryTeamSetup")}
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                fullWidth
                                size="large"
                                disabled={login.loading}
                                onClick={() =>
                                    void login.handleUseAnotherAccount()
                                }
                            >
                                {t("loginPage.backToLogin")}
                            </Button>
                        </Card.ButtonGroup>
                    </Card>
                </div>
            </div>
        </div>
    );
}
