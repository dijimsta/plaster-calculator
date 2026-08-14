"use client";

import { updateUserDisplayName } from "@libraries/plaster-calculator-web-core";
import { Button, Input, Paragraph } from "@libraries/uikit-web";
import type { User } from "firebase/auth";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import type { KeyboardEvent, ReactElement } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";

type UserProfileNameEditorProps = Readonly<{
    user: User;
}>;

export function UserProfileNameEditor({
    user,
}: UserProfileNameEditorProps): ReactElement {
    const { t } = useAppTranslation();
    const [displayName, setDisplayName] = useState(user.displayName ?? "");
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setDisplayName(user.displayName ?? "");
    }, [user]);

    async function saveDisplayName(): Promise<void> {
        const normalizedDisplayName = displayName.trim();
        setIsEditing(false);
        if (!normalizedDisplayName) {
            setDisplayName(user.displayName ?? "");
            return;
        }
        if (normalizedDisplayName === (user.displayName ?? "")) return;

        setIsSaving(true);
        setError("");
        try {
            await updateUserDisplayName(user, normalizedDisplayName);
            setDisplayName(normalizedDisplayName);
        } catch (nextError) {
            setDisplayName(user.displayName ?? "");
            setError(
                nextError instanceof Error
                    ? nextError.message
                    : t("userPage.profile.unableToSaveName"),
            );
        } finally {
            setIsSaving(false);
        }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
        if (event.key === "Enter") event.currentTarget.blur();
    }

    return (
        <>
            {isEditing ? (
                <Input
                    autoFocus
                    autoComplete="name"
                    label={t("userPage.profile.fields.name")}
                    value={displayName}
                    variant="subtle"
                    onBlur={() => void saveDisplayName()}
                    onChange={(event) => setDisplayName(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
            ) : (
                <Button
                    type="button"
                    variant="ghost"
                    size="small"
                    align="start"
                    flush
                    disabled={isSaving}
                    icon={<Pencil size={14} aria-hidden="true" />}
                    iconPosition="right"
                    revealIconOnHover
                    title={t("userPage.profile.editName")}
                    onClick={() => {
                        setError("");
                        setIsEditing(true);
                    }}
                >
                    {displayName || t("userPage.profile.signedInUser")}
                </Button>
            )}
            {error && (
                <Paragraph textSize="sm" variant="muted" status>
                    {error}
                </Paragraph>
            )}
        </>
    );
}
