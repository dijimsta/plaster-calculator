export const styles = Object.freeze({
    root: "fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto bg-transparent p-0 backdrop:bg-transparent",
    positioner:
        "pointer-events-none relative flex min-h-full items-end justify-center p-4 text-center sm:items-center",
    panel: "pointer-events-auto relative w-full overflow-hidden rounded-lg bg-white text-left text-gray-900 shadow-xl transition duration-300 starting:translate-y-4 starting:opacity-0 sm:starting:translate-y-0 sm:starting:scale-95 dark:bg-slate-900 dark:text-white",
    closeButton:
        "absolute top-3 right-3 rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:hover:bg-white/10 dark:hover:text-slate-300",
    closeIcon: "size-5",
    header: "px-4 pt-5 pr-12 sm:px-6 sm:pt-6 sm:pr-12",
    title: "text-base font-semibold text-slate-900 dark:text-white",
    description: "mt-2 text-sm text-slate-500 dark:text-slate-400",
    body: "px-4 py-5 sm:px-6",
    footer: "flex flex-col-reverse gap-3 bg-slate-50 px-4 py-3 sm:flex-row sm:justify-end sm:px-6 dark:bg-white/5",
});

export const modalDialogSizes = Object.freeze({
    sm: "sm:max-w-sm",
    md: "sm:max-w-lg",
    lg: "sm:max-w-2xl",
    xl: "sm:max-w-4xl",
});

export type ModalDialogSize = keyof typeof modalDialogSizes;
