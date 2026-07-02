export const styles = {
    panel: "overflow-y-auto rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900 [&>*+*]:border-t [&>*+*]:border-slate-200 dark:[&>*+*]:border-white/10",
    section: "bg-white dark:bg-slate-900",
    header: "flex w-full items-center gap-2 bg-slate-50 px-3.5 py-2.5 text-left dark:bg-slate-800",
    openHeader: "border-b border-slate-200 dark:border-white/10",
    chevron:
        "size-4 shrink-0 text-slate-500 transition-transform duration-200 dark:text-slate-400",
    openChevron: "rotate-90",
    icon: "flex size-4 shrink-0 items-center justify-center text-slate-500 dark:text-slate-400 [&>svg]:size-4",
    title: "text-[11px] font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300",
    status: "ml-auto inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium",
    statusDot: "size-1.5 rounded-full",
    bodyGrid: "grid transition-[grid-template-rows] duration-200 ease-out",
    openBodyGrid: "grid-rows-[1fr]",
    closedBodyGrid: "grid-rows-[0fr]",
    bodyOverflow: "overflow-hidden",
    body: "px-3.5 py-3",
} as const;

export const statusTones = {
    ok: {
        status: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
        dot: "bg-emerald-500",
    },
    warn: {
        status: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
        dot: "bg-amber-500",
    },
    muted: {
        status: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
        dot: "bg-slate-400 dark:bg-slate-500",
    },
} as const;

export type InspectorStatusTone = keyof typeof statusTones;
