"use client";

import { useRouter } from "next/navigation.js";
import { type PropsWithChildren, useEffect } from "react";

import { useUser } from "../auth/user.hook.js";

export function AuthGuard({ children }: PropsWithChildren) {
    const router = useRouter();
    const user = useUser();

    useEffect(() => {
        if (user === null) {
            router.replace("/login");
        }
    }, [user, router]);

    if (user) {
        return <>{children}</>;
    } else {
        return null;
    }
}
