import { Box, Text, useApp, useInput } from "ink";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import {
    type AuthUserSummary,
    listAuthUsers,
    updateAuthUserScopes,
} from "./firebase-admin.js";

type InkInputHandler = Parameters<typeof useInput>[0];
type InkInputKey = Parameters<InkInputHandler>[1];

type UsersState =
    | { status: "loading" }
    | { status: "loaded"; users: AuthUserSummary[] }
    | { status: "error"; error: Error };

type UsersScreen = "search" | "detail";

const editableScopes: Array<{
    key: keyof AuthUserSummary["claims"];
    label: string;
}> = [
    { key: "isDeveloper", label: "isDeveloper" },
    { key: "isTrialUser", label: "isTrialUser" },
];

export function UsersListApp() {
    const { exit } = useApp();
    const navigate = useNavigate();
    const [state, setState] = useState<UsersState>({ status: "loading" });
    const [screen, setScreen] = useState<UsersScreen>("search");
    const [selectedUser, setSelectedUser] = useState<AuthUserSummary | null>(
        null,
    );

    useEffect(() => {
        let active = true;

        listAuthUsers()
            .then((users) => {
                if (active) {
                    setState({ status: "loaded", users });
                }
            })
            .catch((error: unknown) => {
                if (active) {
                    setState({
                        status: "error",
                        error:
                            error instanceof Error
                                ? error
                                : new Error(String(error)),
                    });
                }
            });

        return () => {
            active = false;
        };
    }, []);

    if (state.status === "loading") {
        return (
            <Box flexDirection="column">
                <Text>Loading Firebase Auth users...</Text>
                <Text dimColor>Press b to go back, q to quit.</Text>
            </Box>
        );
    }

    if (state.status === "error") {
        return (
            <UsersError
                error={state.error}
                onBack={() => {
                    navigate("/");
                }}
                onExit={exit}
            />
        );
    }

    if (screen === "detail" && selectedUser) {
        return (
            <UserDetailScreen
                user={selectedUser}
                onBack={() => {
                    setScreen("search");
                }}
                onUserUpdated={(updatedUser) => {
                    setState({
                        status: "loaded",
                        users: state.users.map((user) =>
                            user.uid === updatedUser.uid ? updatedUser : user,
                        ),
                    });
                    setSelectedUser(updatedUser);
                }}
                onExit={exit}
            />
        );
    }

    return (
        <UserSearchScreen
            users={state.users}
            onBack={() => {
                navigate("/");
            }}
            onExit={exit}
            onSelect={(user) => {
                setSelectedUser(user);
                setScreen("detail");
            }}
        />
    );
}

function UsersError({
    error,
    onBack,
    onExit,
}: {
    error: Error;
    onBack: () => void;
    onExit: () => void;
}) {
    useInput((input, key) => {
        if (input === "q") {
            onExit();
            return;
        }

        if (input === "b" || key.escape || key.backspace) {
            onBack();
        }
    });

    return (
        <Box flexDirection="column">
            <Text color="red">Unable to load users.</Text>
            <Text>{error.message}</Text>
            <Text dimColor>
                Set GOOGLE_APPLICATION_CREDENTIALS to a Firebase Admin SDK
                private key and GOOGLE_CLOUD_PROJECT to the Firebase project ID.
            </Text>
            <Text dimColor>Press b to go back, q to quit.</Text>
        </Box>
    );
}

function UserSearchScreen({
    users,
    onBack,
    onExit,
    onSelect,
}: {
    users: AuthUserSummary[];
    onBack: () => void;
    onExit: () => void;
    onSelect: (user: AuthUserSummary) => void;
}) {
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

            if (selectedUser) {
                onSelect(selectedUser);
            }

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

        if (handleNavigationKey(key)) {
            return;
        }

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

function UserDetailScreen({
    user,
    onBack,
    onUserUpdated,
    onExit,
}: {
    user: AuthUserSummary;
    onBack: () => void;
    onUserUpdated: (updatedUser: AuthUserSummary) => void;
    onExit: () => void;
}) {
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
        if (saving) {
            return;
        }

        if (handleDetailNavigation(input, key)) {
            return;
        }

        if (input === " " || key.return) {
            toggleSelectedScope();
            return;
        }

        if (input === "s") {
            saveScopes();
        }
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

function matchesUser(user: AuthUserSummary, query: string) {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return true;
    }

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

function formatScopes(user: AuthUserSummary) {
    return editableScopes
        .filter((scope) => user.claims[scope.key])
        .map((scope) => scope.key)
        .join(",");
}

function pad(value: string, width: number) {
    return value.padEnd(width, " ");
}

function truncate(value: string, width: number) {
    if (value.length <= width) {
        return value;
    }

    return `${value.slice(0, Math.max(0, width - 1))}…`;
}
