export function cx(
    ...classes: Array<string | false | null | undefined>
): string {
    return classes.filter(Boolean).join(" ");
}

/**
 * Presentation for this subtree that public `@libraries/uikit-web` APIs
 * cannot express yet (see `docs/web-ui-guidelines.md`'s Presentation
 * section). Every entry here is a deliberately-kept gap, not an oversight:
 *
 * - `editorShell` / `editorLeftPanel` / `editorCanvasContainer` /
 *   `editorRightPanel`: the two-pane editor shell needs a fixed-width
 *   (320px) sidebar column with a custom `max-[980px]` breakpoint collapse,
 *   plus regions that must receive `inert` directly (no UIKit layout
 *   primitive forwards `inert` or an arbitrary `ref`). `Grid` only supports
 *   discrete equal column counts; `SidebarLayout` is a full-page app shell
 *   with a mobile hamburger/backdrop, not a nested two-pane layout.
 * - `canvasWrap`: the scrollable canvas viewport needs a raw `ref` (read
 *   directly by the scroll-drag handlers in `editor-canvas.tsx`) and a
 *   responsive height. `Box` doesn't forward refs or support arbitrary/
 *   responsive sizing.
 * - `popoverMenu`: an anchored, absolutely-positioned dropdown of buttons.
 *   UIKit's `overlays/` components are all full-screen/modal (`Backdrop`,
 *   `BusyOverlay`, `Drawer`, `ModalDialog`, `Notification`) -- there's no
 *   small inline popover/menu primitive.
 * - `editorLegend`: a `border-t`-separated footer row. `Box` has no border
 *   capability.
 * - `areaList` / `areaRow` / `areaRowActive`: a scrollable, multi-selectable
 *   (ctrl/cmd-click additive selection) list of buttons with an
 *   active/selected highlight. `StackedList` has no selection-state styling
 *   or max-height scrolling; `RadioGroup`'s list variants are single-choice
 *   only, the wrong semantics for additive multi-select.
 * - `metric`: a compact, soft-bordered single-line stat readout (e.g. "Wall
 *   length: 3.2 m"). UIKit's only bordered-box primitive is `Card`, which
 *   this codebase otherwise only nests once per panel as an outer container
 *   (see `readiness-summary-header.component.tsx`), not repeated inline for
 *   dense stat rows -- and its padding/shadow are heavier than this needs.
 *
 * See the PR description for the full list, including gaps noted inline at
 * their call sites instead of here (e.g. the toolbar's fieldset-disable
 * pattern, the legend's colour swatch).
 */
export const activeTheme = {
    active: "border-slate-900 ring-2 ring-slate-200 dark:border-slate-100 dark:ring-slate-700",
    canvasBg: "bg-slate-200 dark:bg-slate-800",
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
    line: "border-slate-200 dark:border-slate-800",
    panelBg: "bg-white dark:bg-slate-900",
    softBg: "bg-slate-100 dark:bg-slate-800",
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
        metric: cx("rounded-lg border p-2.5", theme.softBg, theme.line),
        popoverMenu: cx(
            "absolute left-0 top-[46px] z-10 grid min-w-[170px] gap-1.5 rounded-lg border p-2 shadow-lg",
            theme.panelBg,
            theme.line,
        ),
    };
}

export const ui = createUi(activeTheme);
