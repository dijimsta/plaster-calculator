import { Box, Text, useInput } from "ink";
import { useState } from "react";

import { updateAuthUserScopes } from "./firebase-admin.js";
import { editableScopes } from "./user-scopes.js";

import type { AuthUserSummary } from "./firebase-admin.js";

type InkInputHandler = Parameters<typeof useInput>[0];
type InkInputKey = Parameters<InkInputHandler>[1];

interface UserDetailScreenProps {
    readonly user: AuthUserSummary;
    readonly onBack: () => void;
    readonly onUserUpdated: (updatedUser: AuthUserSummary) => void;
    readonly onExit: () => void;
}

export function UserDetailScreen({
    user,
    onBack,
    onUserUpdated,
    onExit,
}: UserDetailScreenProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scopes, setScopes] = useState(user.claims);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    function handleDetailNavigation(input: string, key: InkInputKey) {
        if (input === "q") {
            onExit();
            return true;
        }

        if (input === "b" || key.escape || key.backspace) {
            onBack();
            return true;
        }

        if (key.upArrow) {
            setSelectedIndex((current) =>
                current === 0 ? editableScopes.length - 1 : current - 1,
            );
            return true;
        }

        if (key.downArrow) {
            setSelectedIndex(
                (current) => (current + 1) % editableScopes.length,
            );
            return true;
        }

        return false;
    }

    function toggleSelectedScope() {
        const selectedScope = editableScopes[selectedIndex];

        if (selectedScope) {
            setScopes((current) => ({
                ...current,
                [selectedScope.key]: !current[selectedScope.key],
            }));
        }

        setMessage("Unsaved changes.");
    }

    function saveScopes() {
        setSaving(true);
        setMessage("Saving scopes...");

        updateAuthUserScopes(user.uid, scopes)
            .then((updatedUser) => {
                setMessage(
                    "Saved. New tokens are required for changes to take effect.",
                );
                onUserUpdated(updatedUser);
            })
            .catch((error: unknown) => {
                setMessage(
                    error instanceof Error ? error.message : String(error),
                );
            })
            .finally(() => {
                setSaving(false);
            });
    }

    useInput((input, key) => {
        if (saving) return;
        if (handleDetailNavigation(input, key)) return;

        if (input === " " || key.return) {
            toggleSelectedScope();
            return;
        }

        if (input === "s") saveScopes();
    });

    return (
        <Box flexDirection="column" gap={1}>
            <Box flexDirection="column">
                <Text bold>User details</Text>
                <Text>{user.displayName ?? "No display name"}</Text>
                <Text>Email: {user.email ?? "-"}</Text>
                <Text>UID: {user.uid}</Text>
                <Text>Status: {user.disabled ? "disabled" : "active"}</Text>
                <Text>Email verified: {user.emailVerified ? "yes" : "no"}</Text>
                <Text>Created: {user.createdAt}</Text>
                <Text>Last sign-in: {user.lastSignInAt ?? "-"}</Text>
            </Box>

            <Box flexDirection="column">
                <Text bold>Custom scopes</Text>
                {editableScopes.map((scope, index) => {
                    const selected = index === selectedIndex;
                    const checked = scopes[scope.key];
                    const line = `${selected ? "> " : "  "}[${checked ? "x" : " "}] ${scope.label}`;

                    return selected ? (
                        <Text key={scope.key} color="cyan">
                            {line}
                        </Text>
                    ) : (
                        <Text key={scope.key}>{line}</Text>
                    );
                })}
            </Box>

            {message ? (
                <Text color={message.startsWith("Saved") ? "green" : "yellow"}>
                    {message}
                </Text>
            ) : null}

            <Text dimColor>
                Space/enter toggles. Press s to save, b to go back, q to quit.
            </Text>
        </Box>
    );
}
