import type { i18n as I18nInstance } from "i18next";
import { useContext } from "react";
import { I18nContext } from "react-i18next";

/** The shared i18next instance provided by the nearest `I18nProvider`. */
export function useAppI18n(): I18nInstance {
    return useContext(I18nContext).i18n;
}
