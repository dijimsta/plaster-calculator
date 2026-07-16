import { cx, ui } from "../../lib/styles.js";

import type { AreaPolygon } from "@libraries/plaster-calculator-common";

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
