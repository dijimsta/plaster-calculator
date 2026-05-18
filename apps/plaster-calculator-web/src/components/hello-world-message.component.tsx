"use client";

import { httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";

import { functions } from "../firebase/firebase.utils.js";

export default function HelloWorldMessage() {
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const helloWorld = httpsCallable<void, { message: string }>(
            functions,
            "helloWorld",
        );
        helloWorld()
            .then((result) => setMessage(result.data.message))
            .catch(() => setMessage("Failed to load message"));
    }, []);

    if (!message) return null;
    return <p>{message}</p>;
}
