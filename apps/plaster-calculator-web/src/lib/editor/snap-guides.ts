import type { SnapGuide } from "../../components/project-editor/project-editor.types.js";
import type { Point } from "../../types.js";

const SNAP_THRESHOLD_PX = 10;

export function snapToReferences(
    pointer: Point,
    references: Point[],
    zoom: number,
): { point: Point; guide: SnapGuide } {
    const threshold = SNAP_THRESHOLD_PX / zoom;
    let x = pointer[0];
    let y = pointer[1];
    let guide: SnapGuide = null;
    references.forEach((reference) => {
        if (Math.abs(pointer[0] - reference[0]) <= threshold) {
            x = reference[0];
            guide = { ...(guide ?? {}), x };
        }
        if (Math.abs(pointer[1] - reference[1]) <= threshold) {
            y = reference[1];
            guide = { ...(guide ?? {}), y };
        }
    });
    return { point: [x, y], guide };
}
