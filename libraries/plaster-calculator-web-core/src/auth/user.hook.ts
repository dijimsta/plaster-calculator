"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";

import { FirebaseService } from "../firebase/firebase.service.ts";

export function useUser(): User | null | undefined {
    const [user, setUser] = useState<User | null | undefined>();
    useEffect(() => onAuthStateChanged(FirebaseService.getAuth(), setUser), []);
    return user;
}
