"use client";

import {
    useEnsureUserTeam,
    useUser,
} from "@libraries/plaster-calculator-web-core";
import { type PropsWithChildren } from "react";

export function UserInitializedGuard({ children }: PropsWithChildren) {
    const user = useUser();
    const initialized = useEnsureUserTeam(user);

    if (initialized) {
        return <>{children}</>;
    } else {
        return null;
    }
}
