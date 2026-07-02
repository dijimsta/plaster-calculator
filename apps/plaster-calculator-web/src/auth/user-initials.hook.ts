import { useUser } from "./user.hook.js";

export function useUserInitials(): string {
    const user = useUser();
    return getInitials(user?.displayName ?? null, user?.email ?? null);
}

function getInitials(displayName: string | null, email: string | null): string {
    if (displayName) {
        const parts = displayName.trim().split(/\s+/).filter(Boolean);
        const first = parts[0]?.[0] ?? "";
        const last =
            parts.length >= 2 ? (parts[parts.length - 1]?.[0] ?? "") : "";
        return (first + last).toUpperCase() || "U";
    }
    if (email) return email.charAt(0).toUpperCase();
    return "U";
}
