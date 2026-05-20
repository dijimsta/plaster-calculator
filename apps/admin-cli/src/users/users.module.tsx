import { Box, Text, useApp, useInput } from "ink";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { type AuthUserSummary, listAuthUsers } from "./firebase-admin.js";
import { UserDetailScreen } from "./user-detail-screen.js";
import { UserSearchScreen } from "./user-search-screen.js";

type UsersState =
    | { status: "loading" }
    | { status: "loaded"; users: AuthUserSummary[] }
    | { status: "error"; error: Error };

type UsersScreen = "search" | "detail";

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
