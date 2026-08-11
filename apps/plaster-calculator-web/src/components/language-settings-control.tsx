"use client";

import { RadioGroup, RadioGroupOption } from "@libraries/uikit-web";
import { useAppI18n } from "@ui/internationalization";
import { useEffect, useState } from "react";

import { useAppTranslation } from "../i18n/index.ts";

import {
    readLanguageCookie,
    supportedLanguages,
    writeLanguageCookie,
    type AppLanguage,
} from "./language-cookie.js";

export function LanguageSettingsControl() {
    const i18n = useAppI18n();
    const { t } = useAppTranslation();
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

    const languageLabels: Record<AppLanguage, string> = {
        en: t("languageSettingsControl.languageLabels.en"),
        zh: t("languageSettingsControl.languageLabels.zh"),
    };

    return (
        <RadioGroup
            name="app-language"
            legend={t("languageSettingsControl.legend")}
            variant="segmented"
            fullWidth
        >
            {supportedLanguages.map((option) => (
                <RadioGroupOption
                    key={option}
                    value={option}
                    label={languageLabels[option]}
                    checked={language === option}
                    onChange={() => setLanguage(option)}
                />
            ))}
        </RadioGroup>
    );
}
