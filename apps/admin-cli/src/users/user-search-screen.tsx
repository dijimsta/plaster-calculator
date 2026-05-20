import { Box, Text, useInput } from "ink";
import { useEffect, useMemo, useState } from "react";

import { formatScopes } from "./user-scopes.js";

import type { AuthUserSummary } from "./firebase-admin.js";

type InkInputHandler = Parameters<typeof useInput>[0];
type InkInputKey = Parameters<InkInputHandler>[1];

interface UserSearchScreenProps {
    readonly users: AuthUserSummary[];
    readonly onBack: () => void;
    readonly onExit: () => void;
    readonly onSelect: (user: AuthUserSummary) => void;
}

export function UserSearchScreen({
    users,
    onBack,
    onExit,
    onSelect,
}: UserSearchScreenProps) {
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    const filteredUsers = useMemo(
        () => users.filter((user) => matchesUser(user, query)).slice(0, 12),
        [users, query],
    );

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    function handleNavigationKey(key: InkInputKey) {
        if (key.escape) {
            onBack();
            return true;
        }

        if (key.upArrow) {
            setSelectedIndex((current) =>
                current === 0
                    ? Math.max(0, filteredUsers.length - 1)
                    : current - 1,
            );
            return true;
        }

        if (key.downArrow) {
            setSelectedIndex((current) =>
                filteredUsers.length === 0
                    ? 0
                    : (current + 1) % filteredUsers.length,
            );
            return true;
        }

        if (key.return) {
            const selectedUser = filteredUsers[selectedIndex];
            if (selectedUser) onSelect(selectedUser);
            return true;
        }

        return false;
    }

    function handleQueryInput(input: string, key: InkInputKey) {
        if (key.backspace || key.delete) {
            setQuery((current) => current.slice(0, -1));
            return;
        }

        if (input === "b" && query.length === 0) {
            onBack();
            return;
        }

        if (input && !key.ctrl && !key.meta) {
            setQuery((current) => `${current}${input}`);
        }
    }

    useInput((input, key) => {
        if (input === "q") {
            onExit();
            return;
        }

        if (handleNavigationKey(key)) return;
        handleQueryInput(input, key);
    });

    return (
        <Box flexDirection="column" gap={1}>
            <Box flexDirection="column">
                <Text bold>Find users</Text>
                <Text>
                    Search: <Text color="cyan">{query || " "}</Text>
                </Text>
                <Text dimColor>
                    Type to filter by name, email, uid, or custom scope. Use
                    arrows and enter to open a user.
                </Text>
            </Box>

            <Box flexDirection="column">
                <Text dimColor>
                    Showing {filteredUsers.length} of {users.length} users
                </Text>
                {filteredUsers.length === 0 ? (
                    <Text>No matching users.</Text>
                ) : (
                    filteredUsers.map((user, index) => (
                        <UserResultRow
                            key={user.uid}
                            user={user}
                            selected={index === selectedIndex}
                        />
                    ))
                )}
            </Box>

            <Text dimColor>
                Backspace edits search. Press escape to return, q to quit.
            </Text>
        </Box>
    );
}

function UserResultRow({
    user,
    selected,
}: {
    user: AuthUserSummary;
    selected: boolean;
}) {
    const label = user.displayName
        ? `${user.displayName} <${user.email ?? user.uid}>`
        : (user.email ?? user.uid);
    const scopes = formatScopes(user);

    return (
        <Box>
            {selected ? (
                <Text color="cyan">&gt; {pad(truncate(label, 46), 46)}</Text>
            ) : (
                <Text> {pad(truncate(label, 46), 46)}</Text>
            )}
            <Text dimColor>
                {" "}
                {pad(user.disabled ? "disabled" : "active", 8)}
            </Text>
            <Text dimColor> {scopes || "-"}</Text>
        </Box>
    );
}

function matchesUser(user: AuthUserSummary, query: string) {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return true;

    const searchableValues = [
        user.uid,
        user.email,
        user.displayName,
        user.disabled ? "disabled" : "active",
        formatScopes(user),
    ].filter((value): value is string => typeof value === "string");

    return searchableValues.some((value) =>
        value.toLowerCase().includes(normalizedQuery),
    );
}

function pad(value: string, width: number) {
    return value.padEnd(width, " ");
}

function truncate(value: string, width: number) {
    if (value.length <= width) return value;
    return `${value.slice(0, Math.max(0, width - 1))}…`;
}
