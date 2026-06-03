import {
    CEILING_BOARD_TYPES,
    normalizeCeilingBoardType,
    normalizeWallBoardProfile,
    normalizeWallBoardType,
    WALL_BOARD_PROFILES,
    WALL_BOARD_TYPES,
} from "../../lib/editor/board-materials.js";
import { cx, ui } from "../../lib/styles.js";

import type { MaterialField } from "../../hooks/use-editor-material-actions.js";
import type { ValidationIssue } from "../../lib/validation.js";
import type { AreaPolygon } from "../../types.js";
import type { ReactNode } from "react";

interface BoardControlsProps {
    readonly areaIssue: (
        areaId: string,
        field: ValidationIssue["field"],
    ) => string;
    readonly fieldError: (message: string) => ReactNode;
    readonly selectedArea: AreaPolygon;
    readonly setMaterial: (field: MaterialField, value: string) => void;
}

export function BoardControls({
    areaIssue,
    fieldError,
    selectedArea,
    setMaterial,
}: BoardControlsProps) {
    return (
        <>
            {!selectedArea.isOutdoor && (
                <>
                    <MaterialSelect
                        error={areaIssue(selectedArea.id, "wallBoardProfile")}
                        label="Wall profile"
                        options={WALL_BOARD_PROFILES}
                        value={normalizeWallBoardProfile(
                            selectedArea.wallBoardProfile,
                        )}
                        onChange={(value) =>
                            setMaterial("wallBoardProfile", value)
                        }
                        fieldError={fieldError}
                    />
                    <MaterialSelect
                        error={areaIssue(selectedArea.id, "wallBoardType")}
                        label="Wall board"
                        options={WALL_BOARD_TYPES}
                        value={normalizeWallBoardType(
                            selectedArea.wallBoardType,
                            selectedArea.wallPlasterType,
                        )}
                        onChange={(value) =>
                            setMaterial("wallBoardType", value)
                        }
                        fieldError={fieldError}
                    />
                </>
            )}
            <MaterialSelect
                error={areaIssue(selectedArea.id, "ceilingPlasterType")}
                label="Ceiling board"
                options={CEILING_BOARD_TYPES}
                value={normalizeCeilingBoardType(
                    selectedArea.ceilingPlasterType,
                )}
                onChange={(value) => setMaterial("ceilingPlasterType", value)}
                fieldError={fieldError}
            />
        </>
    );
}

export function MaterialSelect({
    error = "",
    fieldError,
    label,
    options,
    showMixedOption = false,
    value,
    onChange,
}: {
    readonly error?: string;
    readonly fieldError?: (message: string) => ReactNode;
    readonly label: string;
    readonly options: readonly string[];
    readonly showMixedOption?: boolean;
    readonly value: string;
    readonly onChange: (value: string) => void;
}) {
    return (
        <div className={ui.field}>
            <label>{label}</label>
            <select
                className={cx(ui.input, error && ui.inputInvalid)}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                {showMixedOption && (
                    <option value="" disabled>
                        Mixed
                    </option>
                )}
                {options.map((type) => (
                    <option key={type}>{type}</option>
                ))}
            </select>
            {fieldError?.(error)}
        </div>
    );
}
