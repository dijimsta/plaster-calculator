import type { AreaPolygon } from "../../types.js";
import {
    BOARD_SWATCH_CLASSES,
    BOARD_TYPES,
} from "../../lib/editor/board-materials.js";
import { cx, ui } from "../../lib/styles.js";

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
        <section className={cx(ui.panel, ui.stack)}>
            <h3>Areas</h3>
            <div className={ui.buttonRow}>
                {BOARD_TYPES.map((type) => (
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
        </section>
    );
}
