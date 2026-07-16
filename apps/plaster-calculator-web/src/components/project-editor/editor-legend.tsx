import {
    BoardMaterialsHelper,
    WALL_BOARD_TYPES,
} from "@libraries/plaster-calculator-common";

import { BOARD_SWATCH_CLASSES } from "../../lib/editor/board-materials.js";
import { cx, ui } from "../../lib/styles.js";

import type { AreaPolygon } from "@libraries/plaster-calculator-common";

interface EditorLegendProps {
    readonly visibleAreas: AreaPolygon[];
}

export function EditorLegend({ visibleAreas }: EditorLegendProps) {
    const legendBoardTypes = wallBoardTypesInUse(visibleAreas);
    if (legendBoardTypes.length === 0) return null;

    return (
        <footer className={ui.editorLegend}>
            {legendBoardTypes.map((type) => (
                <span
                    className={cx(ui.muted, "inline-flex items-center gap-1.5")}
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
        </footer>
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
