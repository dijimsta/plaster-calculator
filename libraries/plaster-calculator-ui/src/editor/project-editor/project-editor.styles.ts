export function cx(
    ...classes: Array<string | false | null | undefined>
): string {
    return classes.filter(Boolean).join(" ");
}

export const activeTheme = {
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
    fieldTextNested: "[&_label]:text-slate-500 dark:[&_label]:text-slate-400",
    focus: "focus:border-slate-500 focus:ring-2 focus:ring-slate-300 dark:focus:border-slate-400 dark:focus:ring-slate-700",
    line: "border-slate-200 dark:border-slate-800",
    muted: "text-slate-500 dark:text-slate-400",
    panelBg: "bg-white dark:bg-slate-900",
    softBg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-900 dark:text-slate-100",
} as const;

type Theme = typeof activeTheme;

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
        input: cx(
            "min-h-[42px] w-full rounded-lg border px-3 py-2.5 outline-none",
            theme.softBg,
            theme.line,
            theme.text,
            theme.focus,
        ),
        inputInvalid: cx(theme.dangerBorder, theme.dangerRing),
        label: cx("text-[13px] font-bold", theme.fieldText),
        metric: cx("rounded-lg border p-2.5", theme.softBg, theme.line),
        muted: cx("text-sm", theme.muted),
        popoverMenu: cx(
            "absolute left-0 top-[46px] z-10 grid min-w-[170px] gap-1.5 rounded-lg border p-2 shadow-lg",
            theme.panelBg,
            theme.line,
        ),
        stack: "grid gap-3.5",
        validationCta: "grid items-start gap-2.5",
    };
}

export const ui = createUi(activeTheme);
