"use client";

import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";

export function useUser() {
    const [user, setUser] = useState<User | null | undefined>();
    useEffect(() => onAuthStateChanged(FirebaseService.getAuth(), setUser), []);
    return user;
}
