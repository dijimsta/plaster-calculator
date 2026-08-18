import type { AreaPolygon } from "@libraries/plaster-calculator-common";

import { cx, ui } from "./project-editor.styles.js";

type AreasPanelProps = {
    readonly selectedAreaIds: string[];
    readonly visibleAreas: AreaPolygon[];
    readonly selectArea: (areaId: string, additive: boolean) => void;
};

export function AreasPanel({
    selectedAreaIds,
    visibleAreas,
    selectArea,
}: AreasPanelProps) {
    // `ui.areaList` / `ui.areaRow` / `ui.areaRowActive` are a
    // deliberately-kept gap: this is a scrollable (max-height),
    // multi-selectable (ctrl/cmd-click additive selection) list with an
    // active/selected highlight per row. `StackedList` has no
    // selection-state styling or max-height scrolling, and `RadioGroup`'s
    // list variants are single-choice only -- the wrong semantics for
    // additive multi-select. See `project-editor.styles.ts`.
    return (
        <div className={ui.areaList}>
            {visibleAreas.map((area) => (
                <button
                    className={cx(
                        ui.areaRow,
                        selectedAreaIds.includes(area.id) && ui.areaRowActive,
                    )}
                    key={area.id}
                    onClick={(event) => {
                        selectArea(area.id, event.ctrlKey || event.metaKey);
                    }}
                >
                    <strong>{area.label}</strong>
                </button>
            ))}
        </div>
    );
}
