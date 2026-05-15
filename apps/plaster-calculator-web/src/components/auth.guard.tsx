"use client";

import { useEffect, type PropsWithChildren } from "react";
import { useRouter } from "next/navigation.js";

import { useUser } from "../auth/user.hook.js";

export function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  const user = useUser();

  console.log({ user });

  useEffect(() => {
    if (user === null) {
      router.replace("/");
    }
  }, [user, router]);

  if (user) {
    return <>{children}</>;
  } else {
    return null;
  }
}
