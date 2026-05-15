"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation.js";

import { auth } from "../firebase/firebase.utils.js";

export default function AppBar() {
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);
    router.replace("/");
  }

  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1rem", height: "64px", borderBottom: "1px solid #e0e0e0" }}>
      <span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Plaster Calculator</span>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
