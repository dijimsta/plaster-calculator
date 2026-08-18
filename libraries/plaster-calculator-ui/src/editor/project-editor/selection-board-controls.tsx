import {
    normalizeWallBoardProfile,
    normalizeWallBoardType,
    WALL_BOARD_PROFILES,
    WALL_BOARD_TYPES,
} from "@libraries/plaster-calculator-common";
import type { AreaPolygon } from "@libraries/plaster-calculator-common";
import { Box, Label, SelectMenu } from "@libraries/uikit-web";
import type { SelectMenuOption } from "@libraries/uikit-web";
import type { ReactNode } from "react";

import { useEditorTranslation } from "../i18n/index.js";

import {
    CEILING_BOARD_TYPES,
    normalizeCeilingBoardType,
} from "./board-materials.js";
import type { MaterialField } from "./use-editor-material-actions.js";
import type { ValidationIssue } from "./validation.js";

type BoardControlsProps = {
    readonly areaIssue: (
        areaId: string,
        field: ValidationIssue["field"],
    ) => string;
    readonly fieldError: (message: string) => ReactNode;
    readonly selectedArea: AreaPolygon;
    readonly setMaterial: (field: MaterialField, value: string) => void;
};

export function BoardControls({
    areaIssue,
    fieldError,
    selectedArea,
    setMaterial,
}: BoardControlsProps) {
    const { t } = useEditorTranslation();
    return (
        <>
            {!selectedArea.isOutdoor && (
                <>
                    <MaterialSelect
                        error={areaIssue(selectedArea.id, "wallBoardProfile")}
                        label={t("selectionBoardControls.wallProfileLabel")}
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
                        label={t("selectionBoardControls.wallBoardLabel")}
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
                label={t("selectionBoardControls.ceilingBoardLabel")}
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
    const selectOptions: SelectMenuOption[] = showMixedOption
        ? [
              { value: "", label: "Mixed", disabled: true },
              ...options.map((type) => ({ value: type, label: type })),
          ]
        : options.map((type) => ({ value: type, label: type }));

    return (
        <Box direction="column" gap="xs">
            <Label>{label}</Label>
            <SelectMenu
                options={selectOptions}
                value={value}
                invalid={Boolean(error)}
                onChange={(event) => onChange(event.target.value)}
            />
            {fieldError?.(error)}
        </Box>
    );
}
