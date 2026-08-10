"use client";

import { RadioGroup, RadioGroupOption } from "@libraries/uikit-web";
import { useAppI18n } from "@ui/internationalization";
import { useEffect, useState } from "react";

import {
    readLanguageCookie,
    supportedLanguages,
    writeLanguageCookie,
    type AppLanguage,
} from "./language-cookie.js";

export function LanguageSettingsControl() {
    const i18n = useAppI18n();
    const [language, setLanguage] = useState<AppLanguage>("en");
    const [languageLoaded, setLanguageLoaded] = useState(false);

    useEffect(() => {
        setLanguage(readLanguageCookie());
        setLanguageLoaded(true);
    }, []);

    useEffect(() => {
        if (!languageLoaded) return;

        void i18n.changeLanguage(language);
        writeLanguageCookie(language);
    }, [languageLoaded, language, i18n]);

    return (
        <RadioGroup
            name="app-language"
            legend="Language"
            variant="segmented"
            fullWidth
        >
            {supportedLanguages.map((option) => (
                <RadioGroupOption
                    key={option}
                    value={option}
                    label={getLanguageLabel(option)}
                    checked={language === option}
                    onChange={() => setLanguage(option)}
                />
            ))}
        </RadioGroup>
    );
}

function getLanguageLabel(language: AppLanguage): string {
    if (language === "zh") return "中文";

    return "English";
}
