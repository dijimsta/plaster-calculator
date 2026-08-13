import clsx from "clsx";

import type { FormLayoutVariant } from "./form-layout.styles.ts";

export const sectionVariants = Object.freeze({
    "stacked": "border-b border-gray-900/10 pb-12 dark:border-white/10",
    "stacked-wide": "border-b border-gray-900/10 pb-12 dark:border-white/10",
    "two-column":
        "grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3 dark:border-white/10",
    "cards": "grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3",
    "labels-left": "border-b border-gray-900/10 pb-12 dark:border-white/10",
} satisfies Readonly<Record<FormLayoutVariant, string>>);

export const sectionHeader = "max-w-2xl";
export const sectionTitle =
    "text-base/7 font-semibold text-gray-900 dark:text-white";
export const sectionDescription =
    "mt-1 text-sm/6 text-gray-600 dark:text-gray-400";

export const sectionBodyVariants = Object.freeze({
    "stacked": "grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6",
    "stacked-wide": "grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6",
    "two-column":
        "grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2",
    "cards":
        "grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 rounded-xl bg-white p-6 shadow-xs ring-1 ring-gray-900/5 sm:grid-cols-6 md:col-span-2 dark:bg-white/5 dark:ring-white/10",
    "labels-left": "space-y-8",
} satisfies Readonly<Record<FormLayoutVariant, string>>);

export const sectionBodySpacings = Object.freeze({
    default: Object.freeze({
        "stacked": "mt-10",
        "stacked-wide": "mt-10",
        "two-column": "",
        "cards": "",
        "labels-left": "mt-10",
    }),
    compact: Object.freeze({
        "stacked": "mt-6",
        "stacked-wide": "mt-6",
        "two-column": "",
        "cards": "",
        "labels-left": "mt-6",
    }),
} satisfies Readonly<
    Record<string, Readonly<Record<FormLayoutVariant, string>>>
>);

export type FormLayoutSectionBodySpacing = keyof typeof sectionBodySpacings;

export function sectionBodyClassName(
    variant: FormLayoutVariant,
    spacing: FormLayoutSectionBodySpacing,
): string {
    return clsx(
        sectionBodyVariants[variant],
        sectionBodySpacings[spacing][variant],
    );
}
