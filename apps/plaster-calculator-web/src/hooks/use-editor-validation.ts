import { createElement, useCallback } from "react";

import { CeilingControls } from "../components/project-editor/ceiling-controls.js";
import { ValidationMessage } from "../components/project-editor/validation-message.js";

import type { SelectedEdge } from "./use-editor-selection.js";
import type { ValidationIssue } from "../lib/validation.js";
import type { AreaPolygon } from "@libraries/plaster-calculator-common";
import type { ReactNode } from "react";

interface EditorValidationOptions {
    readonly ceilingHeightMm: number | null;
    readonly selectedEdge: SelectedEdge | null;
    readonly setCeilingMode: (mode: "flat" | "raked") => void;
    readonly setRakedEdge: (role: "low" | "high") => void;
    readonly setRakedHeight: (
        field: "lowHeightMm" | "highHeightMm",
        value: string,
    ) => void;
    readonly setSelectedAreaHeight: (value: string) => void;
    readonly validationIssues: ValidationIssue[];
}

interface EditorValidation {
    readonly areaIssue: (
        areaId: string,
        field: ValidationIssue["field"],
    ) => string;
    readonly fieldError: (message: string) => ReactNode;
    readonly hasPageHeightIssue: () => boolean;
    readonly pageIssue: (field: ValidationIssue["field"]) => string;
    readonly renderCeilingControls: (area: AreaPolygon) => ReactNode;
}

export function useEditorValidation({
    ceilingHeightMm,
    selectedEdge,
    setCeilingMode,
    setRakedEdge,
    setRakedHeight,
    setSelectedAreaHeight,
    validationIssues,
}: EditorValidationOptions): EditorValidation {
    const pageIssue = useCallback(
        (field: ValidationIssue["field"]) =>
            validationIssues.find(
                (issue) => !issue.areaId && issue.field === field,
            )?.message ?? "",
        [validationIssues],
    );

    const areaIssue = useCallback(
        (areaId: string, field: ValidationIssue["field"]) =>
            validationIssues.find(
                (issue) => issue.areaId === areaId && issue.field === field,
            )?.message ?? "",
        [validationIssues],
    );

    const hasPageHeightIssue = useCallback(
        () =>
            validationIssues.some((issue) => issue.field === "ceilingHeightMm"),
        [validationIssues],
    );

    const fieldError = useCallback(
        (message: string) => createElement(ValidationMessage, { message }),
        [],
    );

    const renderCeilingControls = useCallback(
        (area: AreaPolygon) =>
            createElement(CeilingControls, {
                area,
                ceilingHeightMm,
                selectedEdge,
                areaIssue,
                setCeilingMode,
                setRakedEdge,
                setRakedHeight,
                setSelectedAreaHeight,
            }),
        [
            areaIssue,
            ceilingHeightMm,
            selectedEdge,
            setCeilingMode,
            setRakedEdge,
            setRakedHeight,
            setSelectedAreaHeight,
        ],
    );

    return {
        areaIssue,
        fieldError,
        hasPageHeightIssue,
        pageIssue,
        renderCeilingControls,
    };
}
