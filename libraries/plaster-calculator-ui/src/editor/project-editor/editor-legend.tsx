import {
    normalizeWallBoardType,
    WALL_BOARD_TYPES,
} from "@libraries/plaster-calculator-common";
import type { AreaPolygon } from "@libraries/plaster-calculator-common";
import { Box, Text } from "@libraries/uikit-web";

import { BOARD_SWATCH_CLASSES } from "./board-materials.js";
import { cx, ui } from "./project-editor.styles.js";

interface EditorLegendProps {
    readonly visibleAreas: AreaPolygon[];
}

export function EditorLegend({ visibleAreas }: EditorLegendProps) {
    const legendBoardTypes = wallBoardTypesInUse(visibleAreas);
    if (legendBoardTypes.length === 0) return null;

    return (
        // `ui.editorLegend` is a deliberately-kept gap: `Box` has no
        // border capability, and this footer needs a `border-t` separator
        // from the canvas above it. See `project-editor.styles.ts`.
        <footer className={ui.editorLegend}>
            {legendBoardTypes.map((type) => (
                <Box align="center" gap="xs" key={type}>
                    {/* This colour swatch is a deliberately-kept gap: it
                        maps an open, per-domain-value palette (13 board
                        materials) to a small colour square. `Avatar`,
                        `IconTile`, and `Badge` all expose fixed, closed
                        semantic-colour sets, not an arbitrary colour swatch
                        primitive. */}
                    <span
                        className={cx(
                            "inline-block h-3 w-3 rounded",
                            BOARD_SWATCH_CLASSES[type],
                        )}
                    />
                    <Text size="sm" variant="muted">
                        {type}
                    </Text>
                </Box>
            ))}
        </footer>
    );
}

function wallBoardTypesInUse(areas: AreaPolygon[]) {
    const usedTypes = new Set<string>();
    areas.forEach((area) => {
        if (area.isOutdoor) return;
        usedTypes.add(
            normalizeWallBoardType(area.wallBoardType, area.wallPlasterType),
        );
        Object.values(area.edgeOverrides ?? {}).forEach((override) => {
            if (override.noPlaster) return;
            usedTypes.add(
                normalizeWallBoardType(
                    override.wallBoardType ?? area.wallBoardType,
                    override.wallPlasterType ?? area.wallPlasterType,
                ),
            );
        });
    });

    return WALL_BOARD_TYPES.filter((type) => usedTypes.has(type));
}
