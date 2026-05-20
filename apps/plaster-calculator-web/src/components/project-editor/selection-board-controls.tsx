import { BOARD_TYPES } from "../../lib/editor/board-materials.js";
import { cx, ui } from "../../lib/styles.js";

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
    readonly setMaterial: (
        field: "wallPlasterType" | "ceilingPlasterType",
        value: string,
    ) => void;
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
                <BoardSelect
                    error={areaIssue(selectedArea.id, "wallPlasterType")}
                    label="Wall board"
                    value={selectedArea.wallPlasterType}
                    onChange={(value) => setMaterial("wallPlasterType", value)}
                    fieldError={fieldError}
                />
            )}
            <BoardSelect
                error={areaIssue(selectedArea.id, "ceilingPlasterType")}
                label="Ceiling board"
                value={selectedArea.ceilingPlasterType}
                onChange={(value) => setMaterial("ceilingPlasterType", value)}
                fieldError={fieldError}
            />
        </>
    );
}

export function BoardSelect({
    error = "",
    fieldError,
    label,
    showMixedOption = false,
    value,
    onChange,
}: {
    readonly error?: string;
    readonly fieldError?: (message: string) => ReactNode;
    readonly label: string;
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
                {BOARD_TYPES.map((type) => (
                    <option key={type}>{type}</option>
                ))}
            </select>
            {fieldError?.(error)}
        </div>
    );
}
