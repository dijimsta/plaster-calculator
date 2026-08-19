export function cx(
    ...classes: Array<string | false | null | undefined>
): string {
    return classes.filter(Boolean).join(" ");
}

const contentWidth =
    "mx-auto w-[min(1600px,calc(100%-48px))] min-[1500px]:w-[min(1600px,80%)]";

export const activeTheme = {
    appBg: "bg-slate-50 dark:bg-slate-950",
    controlBg: "bg-white dark:bg-slate-900",
    danger: "text-red-700 dark:text-red-400",
    dangerBorder: "border-red-600",
    dangerRing: "ring-2 ring-red-200 dark:ring-red-950",
    fieldText: "text-slate-500 dark:text-slate-400",
    fieldTextNested: "[&_label]:text-slate-500 dark:[&_label]:text-slate-400",
    focus: "focus:border-slate-500 focus:ring-2 focus:ring-slate-300 dark:focus:border-slate-400 dark:focus:ring-slate-700",
    dropzoneHover:
        "hover:border-slate-400 hover:bg-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-800",
    line: "border-slate-200 dark:border-slate-800",
    muted: "text-slate-500 dark:text-slate-400",
    panelBg: "bg-white dark:bg-slate-900",
    primarySubtle:
        "border-slate-400 bg-slate-100 dark:border-slate-500 dark:bg-slate-800",
    softBg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-900 dark:text-slate-100",
} as const;

type Theme = typeof activeTheme;

function createUi(theme: Theme) {
    return {
        button: cx(
            "inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-[9px] outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
            theme.line,
            theme.focus,
        ),
        buttonDefault: cx(theme.controlBg, theme.text),
        buttonRow: "flex flex-wrap gap-2",
        editorShell:
            "grid grid-cols-[minmax(0,1fr)_320px] grid-rows-[minmax(0,1fr)] flex-1 min-h-0 max-[980px]:grid-cols-1",
        editorToolbar: "mb-3 flex flex-wrap items-center justify-between gap-2",
        error: cx("text-sm", theme.danger),
        // The full-screen floorplan editor (`fullScreenShell` in
        // `project-editor.styles.ts`) renders `fixed inset-0 z-30`, covering
        // this app's normal document flow entirely. An analysis-failure
        // banner rendered in flow while full screen is active would be
        // visually hidden behind that layer, so it needs a fixed, opaque
        // treatment above it -- `z-50` clears both the editor's `z-30` shell
        // and its inspector `Drawer`'s non-modal `z-40`
        // (`drawer.styles.ts`), so the error stays visible even with the
        // drawer open.
        errorFullScreen: cx(
            "fixed inset-x-4 top-4 z-50 rounded-lg border p-3 shadow-lg",
            theme.panelBg,
            theme.line,
        ),
        field: cx(
            "grid gap-1.5 [&_label]:text-[13px] [&_label]:font-bold",
            theme.fieldTextNested,
        ),
        fieldError: cx("text-xs font-bold", theme.danger),
        fileDropzone: cx(
            "grid min-h-[190px] cursor-pointer justify-items-center gap-2 rounded-lg border-2 border-dashed px-5 py-7 text-center outline-none transition-colors duration-150",
            theme.softBg,
            theme.line,
            theme.text,
            theme.dropzoneHover,
        ),
        fileDropzoneActive: theme.primarySubtle,
        hiddenFileInput: "absolute h-px w-px overflow-hidden opacity-0",
        input: cx(
            "min-h-[42px] w-full rounded-lg border px-3 py-2.5 outline-none",
            theme.softBg,
            theme.line,
            theme.text,
            theme.focus,
        ),
        inputInvalid: cx(theme.dangerBorder, theme.dangerRing),
        label: cx("text-[13px] font-bold", theme.fieldText),
        layoutGrid:
            "grid items-start grid-cols-[minmax(420px,1.3fr)_minmax(360px,1fr)] gap-[18px] max-[980px]:grid-cols-1",
        metric: cx("rounded-lg border p-2.5", theme.softBg, theme.line),
        muted: cx("text-sm", theme.muted),
        panel: cx(
            "rounded-lg border p-[18px] shadow-lg [&_h2]:mb-3.5 [&_h2]:mt-0 [&_h3]:mb-3.5 [&_h3]:mt-0",
            theme.panelBg,
            theme.line,
        ),
        pdfProgress: "grid gap-2",
        pdfProgressLabel: cx("flex justify-between text-sm", theme.muted),
        popoverMenu: cx(
            "absolute left-0 top-[46px] z-10 grid min-w-[170px] gap-1.5 rounded-lg border p-2 shadow-lg",
            theme.panelBg,
            theme.line,
        ),
        previewGrid:
            "grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3",
        previewTile: cx(
            "cursor-pointer overflow-hidden rounded-lg border [&_footer]:flex [&_footer]:items-center [&_footer]:justify-between [&_footer]:px-2.5 [&_footer]:py-[9px] [&_img]:block [&_img]:h-[210px] [&_img]:w-full [&_img]:object-contain",
            theme.line,
        ),
        projectActions: "flex flex-nowrap gap-2 max-[720px]:justify-end",
        projectItem: cx(
            "grid items-center justify-between gap-3 rounded-lg border p-3 [grid-template-columns:minmax(0,1fr)_auto] max-[720px]:grid-cols-1 [&_a]:grid [&_a]:min-w-0 [&_a]:gap-2 [&_strong]:break-words",
            theme.line,
        ),
        projectList: "grid gap-2.5",
        projectListState: cx(
            "flex min-h-40 items-center justify-center gap-2.5",
            theme.muted,
        ),
        projectPage: "flex h-full min-h-0 flex-col",
        projectPageHeader: "shrink-0",
        stack: "grid gap-3.5",
        topbar: cx(
            contentWidth,
            "mb-5 flex items-center justify-between gap-4",
        ),
        validationCta: "grid items-start gap-2.5",
    };
}

export const ui = createUi(activeTheme);
