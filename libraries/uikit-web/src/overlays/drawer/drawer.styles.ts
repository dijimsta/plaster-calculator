export const styles = Object.freeze({
    root: "fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-transparent",
    rootNonModal:
        "absolute inset-0 z-40 m-0 h-full w-full max-h-none max-w-none overflow-hidden bg-transparent p-0 pointer-events-none backdrop:bg-transparent",
    positioner: "pointer-events-none relative flex h-full w-full",
    // Insets the panel from every edge of its container so the non-modal
    // panel reads as floating rather than docked. Padding on the positioner
    // (not margin on the panel) keeps the panel's own `h-full`/`w-full`
    // sizing correct: flex children size against the parent's padded
    // content box automatically, so no separate height math is needed.
    positionerNonModal: "p-4",
    leftPositioner: "justify-start",
    rightPositioner: "justify-end",
    panel: "pointer-events-auto flex h-full w-full flex-col bg-white text-gray-900 shadow-xl transition-transform duration-300 ease-in-out dark:bg-slate-900 dark:text-white",
    // Rounds every corner for the floating non-modal panel; the modal panel
    // stays flush and square against the viewport edge.
    panelNonModal: "rounded-lg",
    leftPanel: "starting:-translate-x-full",
    rightPanel: "starting:translate-x-full",
    header: "flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 px-4 py-5 sm:px-6 dark:border-white/10",
    heading: "min-w-0",
    title: "text-base font-semibold text-slate-900 dark:text-white",
    description: "mt-1 text-sm text-slate-500 dark:text-slate-400",
    closeButton:
        "-m-2 shrink-0 rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:hover:bg-white/10 dark:hover:text-slate-300",
    closeIcon: "size-6",
    body: "min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6",
    footer: "shrink-0 border-t border-slate-200 px-4 py-4 sm:px-6 dark:border-white/10",
});

export const drawerSizes = Object.freeze({
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
});

export type DrawerSize = keyof typeof drawerSizes;
