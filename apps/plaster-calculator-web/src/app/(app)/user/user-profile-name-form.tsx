"use client";

import { updateUserDisplayName } from "@libraries/plaster-calculator-web-core";
import {
    Button,
    FormLayout,
    FormLayoutActions,
    FormLayoutField,
    Input,
    Paragraph,
} from "@libraries/uikit-web";
import type { User } from "firebase/auth";
import { useEffect, useState } from "react";
import type { FormEvent, ReactElement } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";

type UserProfileNameFormProps = Readonly<{
    user: User;
}>;

export function UserProfileNameForm({
    user,
}: UserProfileNameFormProps): ReactElement {
    const { t } = useAppTranslation();
    const [displayName, setDisplayName] = useState(user.displayName ?? "");
    const [message, setMessage] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setDisplayName(user.displayName ?? "");
    }, [user]);

    async function saveDisplayName(): Promise<void> {
        const normalizedDisplayName = displayName.trim();
        setSaving(true);
        setMessage("");
        try {
            await updateUserDisplayName(user, normalizedDisplayName);
            setDisplayName(normalizedDisplayName);
            setMessage(t("userPage.profile.nameSaved"));
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : t("userPage.profile.unableToSaveName"),
            );
        } finally {
            setSaving(false);
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        void saveDisplayName();
    }

    const normalizedDisplayName = displayName.trim();
    const isUnchanged = normalizedDisplayName === (user.displayName ?? "");

    return (
        <FormLayout onSubmit={handleSubmit}>
            {message && (
                <Paragraph textSize="sm" variant="muted" status>
                    {message}
                </Paragraph>
            )}
            <FormLayoutField
                label={t("userPage.profile.fields.name")}
                htmlFor="profile-display-name"
                description={t("userPage.profile.nameDescription")}
            >
                <Input
                    id="profile-display-name"
                    autoComplete="name"
                    disabled={saving}
                    required
                    value={displayName}
                    onChange={(event) => {
                        setDisplayName(event.target.value);
                        setMessage("");
                    }}
                />
            </FormLayoutField>
            <FormLayoutActions>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={
                        saving || normalizedDisplayName === "" || isUnchanged
                    }
                >
                    {saving
                        ? t("userPage.profile.savingName")
                        : t("userPage.profile.saveName")}
                </Button>
            </FormLayoutActions>
        </FormLayout>
    );
}
