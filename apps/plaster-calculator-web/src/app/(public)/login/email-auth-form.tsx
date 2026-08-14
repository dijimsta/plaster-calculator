"use client";

import { Button, FormLayout, Input } from "@libraries/uikit-web";
import type { FormEventHandler, ReactElement } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";

type EmailAuthFormProps = Readonly<{
    displayName: string;
    email: string;
    password: string;
    isRegistering: boolean;
    loading: boolean;
    onDisplayNameChange: (displayName: string) => void;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    onSubmit: FormEventHandler<HTMLFormElement>;
}>;

export function EmailAuthForm({
    displayName,
    email,
    password,
    isRegistering,
    loading,
    onDisplayNameChange,
    onEmailChange,
    onPasswordChange,
    onSubmit,
}: EmailAuthFormProps): ReactElement {
    const { t } = useAppTranslation();
    const isSubmitDisabled =
        loading || (isRegistering && displayName.trim() === "");

    return (
        <FormLayout onSubmit={onSubmit}>
            {isRegistering && (
                <Input
                    type="text"
                    required
                    autoComplete="name"
                    value={displayName}
                    onChange={(event) =>
                        onDisplayNameChange(event.target.value)
                    }
                    placeholder={t("loginPage.namePlaceholder")}
                />
            )}
            <Input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                placeholder={t("loginPage.emailPlaceholder")}
            />
            <Input
                type="password"
                required
                autoComplete={
                    isRegistering ? "new-password" : "current-password"
                }
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
                placeholder={t("loginPage.passwordPlaceholder")}
            />
            <Button
                type="submit"
                disabled={isSubmitDisabled}
                variant="primary"
                fullWidth
                size="large"
            >
                {loading
                    ? t("loginPage.loading")
                    : isRegistering
                      ? t("loginPage.createAccount")
                      : t("loginPage.logIn")}
            </Button>
        </FormLayout>
    );
}
