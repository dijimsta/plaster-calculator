"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "../firebase/firebase.utils.js";

export function useUser() {
    const [user, setUser] = useState<User | null | undefined>();
    useEffect(() => onAuthStateChanged(auth, setUser), []);
    return user;
}
