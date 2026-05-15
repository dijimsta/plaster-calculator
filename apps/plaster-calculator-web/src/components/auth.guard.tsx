"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useRouter } from "next/navigation.js";

import { auth } from "../firebase/firebase.utils.js";

export default function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log({ user })
      if (!user) {
        router.replace("/login");
      }
    });
  }, [router]);

  if (user) {
    return <>{children}</>;
  } else {
    return null;
  }
}
