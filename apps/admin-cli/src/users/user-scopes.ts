import type { AuthUserSummary } from "./firebase-admin.js";

export const editableScopes: Array<{
    key: keyof AuthUserSummary["claims"];
    label: string;
}> = [
    { key: "isDeveloper", label: "isDeveloper" },
    { key: "isTrialUser", label: "isTrialUser" },
];

export function formatScopes(user: AuthUserSummary) {
    return editableScopes
        .filter((scope) => user.claims[scope.key])
        .map((scope) => scope.key)
        .join(",");
}
