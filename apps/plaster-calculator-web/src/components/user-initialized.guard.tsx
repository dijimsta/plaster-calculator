"use client";

import { type PropsWithChildren } from "react";

import { useEnsureUserTeam } from "../auth/ensure-user-team.hook.js";
import { useUser } from "../auth/user.hook.js";

export function UserInitializedGuard({ children }: PropsWithChildren) {
    const user = useUser();
    const initialized = useEnsureUserTeam(user);

    if (initialized) {
        return <>{children}</>;
    } else {
        return null;
    }
}
