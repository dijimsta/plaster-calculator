"use client";

import { onIdTokenChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";

import { FirebaseService } from "../firebase/firebase.service.ts";

export function useUser(): User | null | undefined {
    const [state, setState] = useState<UserState>({ user: undefined });
    useEffect(
        () =>
            onIdTokenChanged(FirebaseService.getAuth(), (user) => {
                setState({ user });
            }),
        [],
    );
    return state.user;
}

type UserState = Readonly<{
    user: User | null | undefined;
}>;
