import {
    BoardMaterialsHelper,
    WALL_BOARD_TYPES,
} from "@libraries/plaster-calculator-common";

import { BOARD_SWATCH_CLASSES } from "../../lib/editor/board-materials.js";
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
    const legendBoardTypes = wallBoardTypesInUse(visibleAreas);

    return (
        <div className={ui.stack}>
            {legendBoardTypes.length > 0 && (
                <div className={ui.buttonRow}>
                    {legendBoardTypes.map((type) => (
                        <span
                            className={cx(
                                ui.muted,
                                "inline-flex items-center gap-1.5",
                            )}
                            key={type}
                        >
                            <span
                                className={cx(
                                    "inline-block h-3 w-3 rounded",
                                    BOARD_SWATCH_CLASSES[type],
                                )}
                            />
                            {type}
                        </span>
                    ))}
                </div>
            )}
            <div className={ui.areaList}>
                {visibleAreas.map((area) => (
                    <button
                        className={cx(
                            ui.areaRow,
                            selectedAreaIds.includes(area.id) &&
                                ui.areaRowActive,
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
        </div>
    );
}

function wallBoardTypesInUse(areas: AreaPolygon[]) {
    const usedTypes = new Set<string>();
    areas.forEach((area) => {
        if (area.isOutdoor) return;
        usedTypes.add(
            BoardMaterialsHelper.normalizeWallBoardType(
                area.wallBoardType,
                area.wallPlasterType,
            ),
        );
        Object.values(area.edgeOverrides ?? {}).forEach((override) => {
            if (override.noPlaster) return;
            usedTypes.add(
                BoardMaterialsHelper.normalizeWallBoardType(
                    override.wallBoardType ?? area.wallBoardType,
                    override.wallPlasterType ?? area.wallPlasterType,
                ),
            );
        });
    });

    return WALL_BOARD_TYPES.filter((type) => usedTypes.has(type));
}
