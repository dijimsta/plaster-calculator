"use client";

import { questionnairesI18n } from "@libraries/plaster-calculator-ui";
import { useEffect } from "react";

import { readLanguageCookie } from "./language-cookie.js";

export function LanguageInitializer() {
    useEffect(() => {
        void questionnairesI18n.changeLanguage(readLanguageCookie());
    }, []);

    return null;
}
