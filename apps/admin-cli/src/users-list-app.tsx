import { useEffect, useMemo, useState } from "react";
import { Box, Text } from "ink";

import { listAuthUsers, type AuthUserSummary } from "./firebase-admin.js";

type UsersListState =
    | { status: "loading" }
    | { status: "loaded"; users: AuthUserSummary[] }
    | { status: "error"; error: Error };

export function UsersListApp() {
    const [state, setState] = useState<UsersListState>({ status: "loading" });

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
        return <Text>Loading Firebase Auth users...</Text>;
    }

    if (state.status === "error") {
        return (
            <Box flexDirection="column">
                <Text color="red">Unable to list users.</Text>
                <Text>{state.error.message}</Text>
                <Text dimColor>
                    Authenticate with gcloud application-default login or set
                    GOOGLE_APPLICATION_CREDENTIALS.
                </Text>
            </Box>
        );
    }

    return <UsersTable users={state.users} />;
}

function UsersTable({ users }: { users: AuthUserSummary[] }) {
    const rows = useMemo(() => formatRows(users), [users]);

    if (users.length === 0) {
        return <Text>No Firebase Auth users found.</Text>;
    }

    return (
        <Box flexDirection="column">
            <Text bold>Firebase Auth users ({users.length})</Text>
            <Text>{rows.header}</Text>
            <Text dimColor>{rows.divider}</Text>
            {rows.items.map((row) => (
                <Text key={row.key}>{row.text}</Text>
            ))}
        </Box>
    );
}

function formatRows(users: AuthUserSummary[]) {
    const rows = users.map((user) => {
        const roles = [
            user.claims.admin ? "admin" : undefined,
            user.claims.developer ? "developer" : undefined,
            user.claims.paidCustomer ? "paid" : undefined,
        ]
            .filter(Boolean)
            .join(",");

        return {
            key: user.uid,
            email: user.email ?? "-",
            uid: user.uid,
            status: user.disabled ? "disabled" : "active",
            verified: user.emailVerified ? "yes" : "no",
            roles: roles || "-",
            lastSignInAt: user.lastSignInAt ?? "-",
        };
    });

    const widths = {
        email: columnWidth(
            "email",
            rows.map((row) => row.email),
            34,
        ),
        uid: columnWidth(
            "uid",
            rows.map((row) => row.uid),
            30,
        ),
        status: columnWidth(
            "status",
            rows.map((row) => row.status),
            8,
        ),
        verified: columnWidth(
            "verified",
            rows.map((row) => row.verified),
            8,
        ),
        roles: columnWidth(
            "roles",
            rows.map((row) => row.roles),
            26,
        ),
        lastSignInAt: columnWidth(
            "last sign-in",
            rows.map((row) => row.lastSignInAt),
            28,
        ),
    };

    const header = [
        pad("email", widths.email),
        pad("uid", widths.uid),
        pad("status", widths.status),
        pad("verified", widths.verified),
        pad("roles", widths.roles),
        pad("last sign-in", widths.lastSignInAt),
    ].join("  ");

    return {
        header,
        divider: "-".repeat(header.length),
        items: rows.map((row) => ({
            key: row.key,
            text: [
                pad(row.email, widths.email),
                pad(row.uid, widths.uid),
                pad(row.status, widths.status),
                pad(row.verified, widths.verified),
                pad(row.roles, widths.roles),
                pad(row.lastSignInAt, widths.lastSignInAt),
            ].join("  "),
        })),
    };
}

function columnWidth(label: string, values: string[], max: number) {
    return Math.min(
        max,
        Math.max(
            label.length,
            ...values.map((value) => truncate(value, max).length),
        ),
    );
}

function pad(value: string, width: number) {
    return truncate(value, width).padEnd(width, " ");
}

function truncate(value: string, width: number) {
    if (value.length <= width) {
        return value;
    }

    return `${value.slice(0, Math.max(0, width - 1))}…`;
}
