export const styles = Object.freeze({
    root: "w-full max-w-sm rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10",
    layout: "flex items-start gap-3",
    iconWrapper: "shrink-0 pt-0.5",
    icon: "size-6",
    content: "min-w-0 flex-1",
    title: "text-sm font-medium text-slate-900 dark:text-white",
    description: "mt-1 text-sm text-slate-500 dark:text-slate-400",
    actions: "mt-3 flex items-center gap-3",
    dismissButton:
        "-m-1.5 shrink-0 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:hover:bg-white/10 dark:hover:text-slate-300",
    dismissIcon: "size-5",
});

export const iconColors = Object.freeze({
    neutral: "text-slate-400",
    info: "text-blue-500",
    warn: "text-amber-500",
    error: "text-red-500",
    success: "text-green-500",
});

export type NotificationIntent = keyof typeof iconColors;
