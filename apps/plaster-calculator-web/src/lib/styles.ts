export function cx(
    ...classes: Array<string | false | null | undefined>
): string {
    return classes.filter(Boolean).join(" ");
}

const contentWidth =
    "mx-auto w-[min(1600px,calc(100%-48px))] min-[1500px]:w-[min(1600px,80%)]";

export const themes = {
    slate: {
        appBg: "bg-slate-50 dark:bg-slate-950",
        active: "border-slate-900 ring-2 ring-slate-200 dark:border-slate-100 dark:ring-slate-700",
        canvasBg: "bg-slate-200 dark:bg-slate-800",
        controlBg: "bg-white dark:bg-slate-900",
        danger: "text-red-700 dark:text-red-400",
        dangerBorder: "border-red-600",
        dangerRing: "ring-2 ring-red-200 dark:ring-red-950",
        editor: {
            boardColors: {
                "10mm Plasterboard": {
                    edge: "#334155",
                    fill: "rgb(51 65 85 / 0.18)",
                },
                "13mm Plasterboard": {
                    edge: "#52525b",
                    fill: "rgb(82 82 91 / 0.18)",
                },
                "9mm Villaboard": {
                    edge: "#0284c7",
                    fill: "rgb(2 132 199 / 0.18)",
                },
                "6mm Villaboard": {
                    edge: "#0891b2",
                    fill: "rgb(8 145 178 / 0.18)",
                },
                "10mm Acoustic (Soundchek)": {
                    edge: "#c2410c",
                    fill: "rgb(194 65 12 / 0.18)",
                },
                "13mm Acoustic (Soundchek)": {
                    edge: "#b45309",
                    fill: "rgb(180 83 9 / 0.18)",
                },
                "10mm Water Resistant": {
                    edge: "#2563eb",
                    fill: "rgb(37 99 235 / 0.18)",
                },
                "13mm Water Resistant": {
                    edge: "#4f46e5",
                    fill: "rgb(79 70 229 / 0.18)",
                },
                "13mm Fire Resistant - dry area": {
                    edge: "#dc2626",
                    fill: "rgb(220 38 38 / 0.18)",
                },
                "16mm Fire Resistant - dry area": {
                    edge: "#be123c",
                    fill: "rgb(190 18 60 / 0.18)",
                },
                "13mm Fire Resistant - wet area": {
                    edge: "#a21caf",
                    fill: "rgb(162 28 175 / 0.18)",
                },
                "16mm Fire Resistant - wet area": {
                    edge: "#7e22ce",
                    fill: "rgb(126 34 206 / 0.18)",
                },
                "6.5mm Flexible board": {
                    edge: "#059669",
                    fill: "rgb(5 150 105 / 0.18)",
                },
                "Recessed Edge": {
                    edge: "#334155",
                    fill: "rgb(51 65 85 / 0.18)",
                },
                "Water Resistant": {
                    edge: "#2563eb",
                    fill: "rgb(37 99 235 / 0.18)",
                },
                "Sound Check": {
                    edge: "#c2410c",
                    fill: "rgb(194 65 12 / 0.18)",
                },
            },
            draft: "#2563eb",
            highEdge: "#dc2626",
            lowEdge: "#0284c7",
            noPlaster: "#64748b",
            point: "#334155",
            selected: "#f97316",
            selectedPoint: "#7c3aed",
            stageBg: "#f1f5f9",
        },
        fieldText: "text-slate-500 dark:text-slate-400",
        fieldTextNested:
            "[&_label]:text-slate-500 dark:[&_label]:text-slate-400",
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
        toast: "border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900",
        toastLink: "text-slate-900 dark:text-slate-100",
        toastLinkNested: "[&_a]:text-slate-900 dark:[&_a]:text-slate-100",
    },
    zinc: {
        appBg: "bg-zinc-50 dark:bg-zinc-950",
        active: "border-zinc-900 ring-2 ring-zinc-200 dark:border-zinc-100 dark:ring-zinc-700",
        canvasBg: "bg-zinc-200 dark:bg-zinc-800",
        controlBg: "bg-white dark:bg-zinc-900",
        danger: "text-red-700 dark:text-red-400",
        dangerBorder: "border-red-600",
        dangerRing: "ring-2 ring-red-200 dark:ring-red-950",
        editor: {
            boardColors: {
                "10mm Plasterboard": {
                    edge: "#3f3f46",
                    fill: "rgb(63 63 70 / 0.18)",
                },
                "13mm Plasterboard": {
                    edge: "#52525b",
                    fill: "rgb(82 82 91 / 0.18)",
                },
                "9mm Villaboard": {
                    edge: "#0284c7",
                    fill: "rgb(2 132 199 / 0.18)",
                },
                "6mm Villaboard": {
                    edge: "#0891b2",
                    fill: "rgb(8 145 178 / 0.18)",
                },
                "10mm Acoustic (Soundchek)": {
                    edge: "#c2410c",
                    fill: "rgb(194 65 12 / 0.18)",
                },
                "13mm Acoustic (Soundchek)": {
                    edge: "#b45309",
                    fill: "rgb(180 83 9 / 0.18)",
                },
                "10mm Water Resistant": {
                    edge: "#2563eb",
                    fill: "rgb(37 99 235 / 0.18)",
                },
                "13mm Water Resistant": {
                    edge: "#4f46e5",
                    fill: "rgb(79 70 229 / 0.18)",
                },
                "13mm Fire Resistant - dry area": {
                    edge: "#dc2626",
                    fill: "rgb(220 38 38 / 0.18)",
                },
                "16mm Fire Resistant - dry area": {
                    edge: "#be123c",
                    fill: "rgb(190 18 60 / 0.18)",
                },
                "13mm Fire Resistant - wet area": {
                    edge: "#a21caf",
                    fill: "rgb(162 28 175 / 0.18)",
                },
                "16mm Fire Resistant - wet area": {
                    edge: "#7e22ce",
                    fill: "rgb(126 34 206 / 0.18)",
                },
                "6.5mm Flexible board": {
                    edge: "#059669",
                    fill: "rgb(5 150 105 / 0.18)",
                },
                "Recessed Edge": {
                    edge: "#3f3f46",
                    fill: "rgb(63 63 70 / 0.18)",
                },
                "Water Resistant": {
                    edge: "#2563eb",
                    fill: "rgb(37 99 235 / 0.18)",
                },
                "Sound Check": {
                    edge: "#c2410c",
                    fill: "rgb(194 65 12 / 0.18)",
                },
            },
            draft: "#2563eb",
            highEdge: "#dc2626",
            lowEdge: "#0284c7",
            noPlaster: "#71717a",
            point: "#3f3f46",
            selected: "#f97316",
            selectedPoint: "#7c3aed",
            stageBg: "#f4f4f5",
        },
        fieldText: "text-zinc-500 dark:text-zinc-400",
        fieldTextNested: "[&_label]:text-zinc-500 dark:[&_label]:text-zinc-400",
        focus: "focus:border-zinc-500 focus:ring-2 focus:ring-zinc-300 dark:focus:border-zinc-400 dark:focus:ring-zinc-700",
        dropzoneHover:
            "hover:border-zinc-400 hover:bg-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-800",
        line: "border-zinc-200 dark:border-zinc-800",
        muted: "text-zinc-500 dark:text-zinc-400",
        panelBg: "bg-white dark:bg-zinc-900",
        primarySubtle:
            "border-zinc-400 bg-zinc-100 dark:border-zinc-500 dark:bg-zinc-800",
        softBg: "bg-zinc-100 dark:bg-zinc-800",
        text: "text-zinc-900 dark:text-zinc-100",
        toast: "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900",
        toastLink: "text-zinc-900 dark:text-zinc-100",
        toastLinkNested: "[&_a]:text-zinc-900 dark:[&_a]:text-zinc-100",
    },
} as const;

type Theme = (typeof themes)[keyof typeof themes];

export const activeTheme = themes.slate;

function createUi(theme: Theme) {
    return {
        areaList: "grid max-h-[220px] gap-2 overflow-auto",
        areaRow: cx(
            "cursor-pointer rounded-lg border p-[9px] text-left",
            theme.line,
        ),
        areaRowActive: theme.active,
        button: cx(
            "inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-[9px] outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
            theme.line,
            theme.focus,
        ),
        buttonDefault: cx(theme.controlBg, theme.text),
        buttonRow: "flex flex-wrap gap-2",
        canvasWrap: cx(
            "flex-1 min-h-[560px] overflow-auto rounded-lg border max-[980px]:h-[70vh]",
            theme.canvasBg,
            theme.line,
        ),
        editorCanvasContainer: "flex flex-col flex-1 min-h-0",
        editorLeftPanel: cx(
            "flex flex-col min-h-0 rounded-lg border shadow-lg [&_h2]:mb-3.5 [&_h2]:mt-0 [&_h3]:mb-3.5 [&_h3]:mt-0",
            theme.panelBg,
            theme.line,
        ),
        editorLegend: cx(
            "flex shrink-0 flex-wrap items-center gap-2 border-t p-2",
            theme.line,
        ),
        editorRightPanel: "min-h-0",
        editorShell:
            "grid grid-cols-[minmax(0,1fr)_320px] grid-rows-[minmax(0,1fr)] flex-1 min-h-0 max-[980px]:grid-cols-1",
        editorToolbar: "mb-3 flex flex-wrap items-center justify-between gap-2",
        error: cx("text-sm", theme.danger),
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
        inspector: "h-full",
        label: cx("text-[13px] font-bold", theme.fieldText),
        layoutGrid: cx(
            contentWidth,
            "grid grid-cols-[minmax(380px,0.34fr)_minmax(0,1fr)] gap-[18px] max-[980px]:grid-cols-1",
        ),
        metric: cx("rounded-lg border p-2.5", theme.softBg, theme.line),
        modal: cx(
            "grid max-h-[88vh] w-[min(980px,100%)] max-w-[980px] gap-4 overflow-auto rounded-lg p-[18px] shadow-lg",
            theme.panelBg,
        ),
        modalBackdrop:
            "fixed inset-0 z-30 flex items-center justify-center bg-slate-950/60 p-6",
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
        projectMetaLine:
            "block overflow-hidden text-ellipsis whitespace-nowrap max-[720px]:whitespace-normal",
        projectPage: "flex h-full min-h-0 flex-col",
        projectPageBody: "min-h-0 overflow-y-auto",
        projectPageHeader: "shrink-0",
        segmented: cx(
            "inline-flex max-w-full gap-[3px] overflow-x-auto rounded-lg p-[3px]",
            theme.softBg,
        ),
        segmentedButton: cx(
            "shrink-0 cursor-pointer rounded-md border-0 bg-transparent px-[11px] py-2 whitespace-nowrap",
            theme.muted,
        ),
        segmentedButtonActive: cx("shadow-sm", theme.controlBg, theme.text),
        segmentedWide: "grid w-full grid-cols-3",
        stack: "grid gap-3.5",
        toast: cx(
            contentWidth,
            "mb-4 flex items-center gap-2.5 rounded-lg border px-3 py-2.5 shadow-lg [&_a]:font-bold [&_a]:underline [&_a]:underline-offset-3 [&_span]:flex-1",
            theme.toast,
            theme.text,
            theme.toastLinkNested,
        ),
        topbar: cx(
            contentWidth,
            "mb-5 flex items-center justify-between gap-4",
        ),
        validationCta: "grid items-start gap-2.5",
    };
}

export const ui = createUi(activeTheme);
