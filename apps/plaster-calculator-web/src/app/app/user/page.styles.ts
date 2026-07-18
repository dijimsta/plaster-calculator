import { activeTheme, cx } from "../../../lib/styles.js";

const contentWidth =
    "mx-auto w-[min(1180px,calc(100%-48px))] min-[1500px]:w-[min(1180px,76%)]";

export const userPageStyles = {
    actionRow: cx(
        "flex flex-wrap justify-end gap-2 border-t pt-5",
        activeTheme.line,
    ),
    avatar: "h-16 w-16 shrink-0 rounded-full object-cover",
    avatarFallback: cx(
        "flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-2xl font-semibold",
        activeTheme.softBg,
    ),
    fieldGroup: "grid max-w-[220px] gap-2",
    fieldGroupCell: "grid gap-2",
    fieldGroupCellWide: "grid gap-2 sm:col-span-2",
    fieldLabel: "text-sm font-medium text-gray-900 dark:text-white",
    fieldsGrid: "grid gap-4 sm:grid-cols-2",
    metaList: "grid gap-4 sm:grid-cols-2",
    metaRow: "grid min-w-0 gap-1",
    profileHeader: "flex min-w-0 items-center gap-4",
    profileName: "m-0 break-words text-lg font-semibold",
    profileText: "min-w-0",
    providerItem: cx(
        "grid min-w-0 gap-1 rounded-lg border p-3",
        activeTheme.line,
    ),
    providerList: "grid gap-2.5",
    providerSection: "grid gap-3",
    section: cx(
        "grid grid-cols-[minmax(220px,0.34fr)_minmax(0,1fr)] items-start gap-x-8 gap-y-5 border-b pb-10 last:border-b-0 last:pb-0 max-[820px]:grid-cols-1",
        activeTheme.line,
    ),
    sectionCopy: "grid content-start gap-1",
    sectionDescription: cx(
        "max-w-[30rem] text-sm leading-6",
        activeTheme.muted,
    ),
    sectionTitle: "m-0 text-base font-semibold",
    settingsPanel: cx(
        "grid min-w-0 gap-5 rounded-lg border p-5 shadow-lg",
        activeTheme.panelBg,
        activeTheme.line,
    ),
    settingsStack: cx(contentWidth, "grid gap-10", activeTheme.text),
    settingRow: cx(
        "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 rounded-lg border p-4 max-[520px]:grid-cols-1",
        activeTheme.softBg,
        activeTheme.line,
    ),
    settingText: "grid min-w-0 gap-1",
    statusText: "min-h-5",
    value: "m-0 break-words",
};
