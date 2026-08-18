import type { AreaPolygon } from "@libraries/plaster-calculator-common";
import {
    Box,
    Button,
    Input,
    Label,
    SelectMenu,
    Text,
} from "@libraries/uikit-web";

import { useEditorTranslation } from "../i18n/index.js";

import { ui } from "./project-editor.styles.js";
import type { SelectedEdge } from "./use-editor-selection.js";
import { ValidationMessage } from "./validation-message.js";
import type { ValidationIssue } from "./validation.js";

interface CeilingControlsProps {
    readonly area: AreaPolygon;
    readonly ceilingHeightMm: number | null;
    readonly selectedEdge: SelectedEdge | null;
    readonly areaIssue: (
        areaId: string,
        field: ValidationIssue["field"],
    ) => string;
    readonly setCeilingMode: (mode: "flat" | "raked") => void;
    readonly setRakedEdge: (role: "low" | "high") => void;
    readonly setRakedHeight: (
        field: "lowHeightMm" | "highHeightMm",
        value: string,
    ) => void;
    readonly setSelectedAreaHeight: (value: string) => void;
}

export function CeilingControls({
    area,
    ceilingHeightMm,
    selectedEdge,
    areaIssue,
    setCeilingMode,
    setRakedEdge,
    setRakedHeight,
    setSelectedAreaHeight,
}: CeilingControlsProps) {
    const { t } = useEditorTranslation();
    const mode = area.ceilingMode ?? "flat";
    const raked = area.rakedCeiling;
    const roomHeightError = areaIssue(area.id, "ceilingHeightMm");
    const lowEdgeError = areaIssue(area.id, "rakedLowEdge");
    const highEdgeError = areaIssue(area.id, "rakedHighEdge");
    const lowHeightError = areaIssue(area.id, "rakedLowHeight");
    const highHeightError = areaIssue(area.id, "rakedHighHeight");

    return (
        <>
            <Box direction="column" gap="xs">
                <Label>{t("ceilingControls.roomCeilingLabel")}</Label>
                <SelectMenu
                    options={[
                        {
                            value: "flat",
                            label: t("ceilingControls.ceilingModeOptions.flat"),
                        },
                        {
                            value: "raked",
                            label: t(
                                "ceilingControls.ceilingModeOptions.raked",
                            ),
                        },
                    ]}
                    value={mode}
                    onChange={(event) =>
                        setCeilingMode(event.target.value as "flat" | "raked")
                    }
                />
            </Box>
            {mode === "flat" && (
                <FlatCeilingHeightField
                    ceilingHeightMm={ceilingHeightMm}
                    error={roomHeightError}
                    value={area.ceilingHeightMm}
                    setSelectedAreaHeight={setSelectedAreaHeight}
                />
            )}
            {mode === "raked" && (
                <RakedCeilingFields
                    areaId={area.id}
                    raked={raked}
                    selectedEdge={selectedEdge}
                    lowEdgeError={lowEdgeError}
                    highEdgeError={highEdgeError}
                    lowHeightError={lowHeightError}
                    highHeightError={highHeightError}
                    setRakedEdge={setRakedEdge}
                    setRakedHeight={setRakedHeight}
                />
            )}
        </>
    );
}

interface FlatCeilingHeightFieldProps {
    readonly ceilingHeightMm: number | null;
    readonly error: string;
    readonly value: number | null | undefined;
    readonly setSelectedAreaHeight: (value: string) => void;
}

function FlatCeilingHeightField({
    ceilingHeightMm,
    error,
    value,
    setSelectedAreaHeight,
}: FlatCeilingHeightFieldProps) {
    const { t } = useEditorTranslation();
    const placeholder =
        ceilingHeightMm == null
            ? t("ceilingControls.pageHeightNotSet")
            : String(ceilingHeightMm);

    return (
        <Box direction="column" gap="xs">
            <Label>{t("ceilingControls.roomHeightOverrideLabel")}</Label>
            <Input
                type="number"
                invalid={Boolean(error)}
                placeholder={placeholder}
                value={value ?? ""}
                onChange={(event) => setSelectedAreaHeight(event.target.value)}
            />
            <ValidationMessage message={error} />
        </Box>
    );
}

interface RakedCeilingFieldsProps {
    readonly areaId: string;
    readonly raked: AreaPolygon["rakedCeiling"];
    readonly selectedEdge: SelectedEdge | null;
    readonly lowEdgeError: string;
    readonly highEdgeError: string;
    readonly lowHeightError: string;
    readonly highHeightError: string;
    readonly setRakedEdge: (role: "low" | "high") => void;
    readonly setRakedHeight: (
        field: "lowHeightMm" | "highHeightMm",
        value: string,
    ) => void;
}

function RakedCeilingFields({
    areaId,
    raked,
    selectedEdge,
    lowEdgeError,
    highEdgeError,
    lowHeightError,
    highHeightError,
    setRakedEdge,
    setRakedHeight,
}: RakedCeilingFieldsProps) {
    const { t } = useEditorTranslation();
    const edgeError = lowEdgeError || highEdgeError;
    const edgeSelectionDisabled =
        !selectedEdge || selectedEdge.areaId !== areaId;

    return (
        <>
            <Box direction="row" wrap gap="sm">
                <Button
                    variant={lowEdgeError ? "dangerSoft" : "secondary"}
                    onClick={() => setRakedEdge("low")}
                    disabled={edgeSelectionDisabled}
                >
                    Set selected low edge
                </Button>
                <Button
                    variant={highEdgeError ? "dangerSoft" : "secondary"}
                    onClick={() => setRakedEdge("high")}
                    disabled={edgeSelectionDisabled}
                >
                    Set selected high edge
                </Button>
            </Box>
            {edgeError && (
                <Text size="xs" weight="semibold" variant="danger">
                    {edgeError}
                </Text>
            )}
            {/* `ui.metric` is a deliberately-kept gap -- see
                `project-editor.styles.ts`. */}
            <div className={ui.metric}>
                Low edge: {edgeLabel(raked?.lowEdgeIndex)} | High edge:{" "}
                {edgeLabel(raked?.highEdgeIndex)}
            </div>
            <RakedHeightField
                label={t("ceilingControls.lowHeightLabel")}
                field="lowHeightMm"
                error={lowHeightError}
                value={raked?.lowHeightMm}
                setRakedHeight={setRakedHeight}
            />
            <RakedHeightField
                label={t("ceilingControls.highHeightLabel")}
                field="highHeightMm"
                error={highHeightError}
                value={raked?.highHeightMm}
                setRakedHeight={setRakedHeight}
            />
        </>
    );
}

interface RakedHeightFieldProps {
    readonly label: string;
    readonly field: "lowHeightMm" | "highHeightMm";
    readonly error: string;
    readonly value: number | null | undefined;
    readonly setRakedHeight: (
        field: "lowHeightMm" | "highHeightMm",
        value: string,
    ) => void;
}

function RakedHeightField({
    label,
    field,
    error,
    value,
    setRakedHeight,
}: RakedHeightFieldProps) {
    return (
        <Box direction="column" gap="xs">
            <Label>{label}</Label>
            <Input
                type="number"
                invalid={Boolean(error)}
                value={value ?? ""}
                onChange={(event) => setRakedHeight(field, event.target.value)}
            />
            <ValidationMessage message={error} />
        </Box>
    );
}

function edgeLabel(edgeIndex: number | undefined) {
    return edgeIndex != null && edgeIndex >= 0 ? edgeIndex + 1 : "-";
}
