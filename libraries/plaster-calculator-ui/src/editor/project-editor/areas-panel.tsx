import type { AreaPolygon } from "@libraries/plaster-calculator-common";

import { cx, ui } from "./project-editor.styles.js";

interface AreasPanelProps {
    readonly selectedAreaIds: string[];
    readonly visibleAreas: AreaPolygon[];
    readonly selectArea: (areaId: string, additive: boolean) => void;
}

export function AreasPanel({
    selectedAreaIds,
    visibleAreas,
    selectArea,
}: AreasPanelProps) {
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
