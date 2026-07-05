export const DEFAULT_TONE = "light";

export type NavbarTone = keyof typeof tones;

export const styles = Object.freeze({
    root: "w-full border-b",
    inner: "mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 sm:px-6 lg:px-8",
    brand: "flex h-16 shrink-0 items-center font-semibold [&>a]:inline-flex [&>a]:items-center [&>a]:rounded-md [&>a]:focus-visible:outline-2 [&>a]:focus-visible:outline-offset-4 [&>a]:focus-visible:outline-indigo-500",
    desktopNavigation: "hidden min-w-0 md:block",
    desktopList: "flex items-center gap-1",
    mobilePanel: "order-last w-full border-t px-4 py-3 md:hidden sm:px-6",
    mobilePanelClosed: "hidden",
    mobileList: "grid gap-1",
    item: "block rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
    mobileItem: "w-full",
    actions: "ml-auto flex h-16 items-center gap-2",
    toggle: "inline-flex items-center justify-center rounded-md p-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 md:hidden [&>svg]:size-6",
});

export const tones = Object.freeze({
    light: Object.freeze({
        root: "border-gray-200 bg-white text-gray-900 dark:border-white/10 dark:bg-gray-900 dark:text-white",
        itemCurrent:
            "bg-gray-100 text-gray-900 dark:bg-white/10 dark:text-white",
        itemDefault:
            "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white",
        toggle: "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white",
        mobilePanel: "border-gray-200 dark:border-white/10",
    }),
    dark: Object.freeze({
        root: "border-white/10 bg-gray-900 text-white",
        itemCurrent: "bg-white/10 text-white",
        itemDefault: "text-gray-300 hover:bg-white/5 hover:text-white",
        toggle: "text-gray-300 hover:bg-white/10 hover:text-white",
        mobilePanel: "border-white/10",
    }),
});
