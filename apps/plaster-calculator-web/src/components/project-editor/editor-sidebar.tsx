import type { ReactNode } from "react";
import { MousePointer2 } from "lucide-react";
import type { AreaPolygon, EdgeOverride, FloorplanPage } from "../../types.js";
import type { ValidationIssue } from "../../lib/validation.js";
import { BOARD_SWATCH_CLASSES, BOARD_TYPES } from "../../lib/editor/board-materials.js";
import { cx, ui } from "../../lib/styles.js";
import type { SelectedEdge } from "../../hooks/use-editor-selection.js";

interface EditorSidebarProps {
    readonly page: FloorplanPage;
    readonly status: string;
    readonly dirty: boolean;
    readonly ceilingHeightMm: number | null;
    readonly scaleMmPerPx: number | null;
    readonly referencePoints: [number, number][];
    readonly referenceLengthMm: string;
    readonly isSettingReference: boolean;
    readonly summary: {
        readonly wallTotals: [string, number][];
        readonly ceilingTotals: [string, number][];
    } | null;
    readonly visibleAreas: AreaPolygon[];
    readonly selectedAreaIds: string[];
    readonly selectedArea: AreaPolygon | null;
    readonly selectedEdgeArea: AreaPolygon | null;
    readonly selectedEdge: SelectedEdge | null;
    readonly selectedEdgeOverride: EdgeOverride | undefined | null;
    readonly selectedPointIndexes: number[];
    readonly metrics: { readonly wallLengthM: number; readonly ceilingAreaM2: number } | null;
    readonly areaIssue: (areaId: string, field: ValidationIssue["field"]) => string;
    readonly applyHeightToAllPages: () => void;
    readonly applyScale: () => void;
    readonly applyScaleToAllPages: () => void;
    readonly clearSelectedEdgeOverride: () => void;
    readonly commonMaterialValue: (field: "wallPlasterType" | "ceilingPlasterType") => string;
    readonly fieldError: (message: string) => ReactNode;
    readonly hasPageHeightIssue: () => boolean;
    readonly pageIssue: (field: ValidationIssue["field"]) => string;
    readonly renderCeilingControls: (area: AreaPolygon) => ReactNode;
    readonly selectArea: (areaId: string, additive: boolean) => void;
    readonly setCeilingHeightMm: (value: number | null) => void;
    readonly setDirty: (dirty: boolean) => void;
    readonly setIsSettingReference: (value: boolean) => void;
    readonly setMaterial: (field: "wallPlasterType" | "ceilingPlasterType", value: string) => void;
    readonly setReferenceLengthMm: (value: string) => void;
    readonly setReferencePoints: (points: [number, number][]) => void;
    readonly setSelectedEdgeMaterial: (value: string) => void;
    readonly setSelectedEdgeNoPlaster: (noPlaster: boolean) => void;
    readonly startReferenceMode: () => void;
    readonly toggleOutdoor: () => void;
    readonly updateArea: (areaId: string, updater: (area: AreaPolygon) => AreaPolygon) => void;
}

export function EditorSidebar({
    page,
    status,
    dirty,
    ceilingHeightMm,
    scaleMmPerPx,
    referencePoints,
    referenceLengthMm,
    isSettingReference,
    summary,
    visibleAreas,
    selectedAreaIds,
    selectedArea,
    selectedEdgeArea,
    selectedEdge,
    selectedEdgeOverride,
    selectedPointIndexes,
    metrics,
    areaIssue,
    applyHeightToAllPages,
    applyScale,
    applyScaleToAllPages,
    clearSelectedEdgeOverride,
    commonMaterialValue,
    fieldError,
    hasPageHeightIssue,
    pageIssue,
    renderCeilingControls,
    selectArea,
    setCeilingHeightMm,
    setDirty,
    setIsSettingReference,
    setMaterial,
    setReferenceLengthMm,
    setReferencePoints,
    setSelectedEdgeMaterial,
    setSelectedEdgeNoPlaster,
    startReferenceMode,
    toggleOutdoor,
    updateArea,
}: EditorSidebarProps) {
    return (            <aside className={ui.inspector}>
                <section className={cx(ui.panel, ui.stack)}>
                    <h3>Page {page.pageNumber}</h3>
                    <span className={ui.muted}>
                        {status || "Ready"}{" "}
                        {dirty ? "- autosaves every 15 seconds" : ""}
                    </span>
                    <div className={ui.field}>
                        <label>Ceiling height mm</label>
                        <input
                            className={cx(
                                ui.input,
                                hasPageHeightIssue() && ui.inputInvalid,
                            )}
                            type="number"
                            value={ceilingHeightMm ?? ""}
                            onChange={(event) => {
                                setCeilingHeightMm(
                                    event.target.value
                                        ? Number(event.target.value)
                                        : null,
                                );
                                setDirty(true);
                            }}
                        />
                        {hasPageHeightIssue() &&
                            fieldError("Ceiling height is required")}
                    </div>
                    <button
                        className={ui.button}
                        onClick={applyHeightToAllPages}
                    >
                        Apply height to all pages
                    </button>
                </section>

                <section className={cx(ui.panel, ui.stack)}>
                    <h3>Scale</h3>
                    <div className={ui.buttonRow}>
                        <button
                            className={cx(
                                ui.button,
                                isSettingReference && ui.buttonPrimary,
                            )}
                            onClick={
                                isSettingReference
                                    ? () => setIsSettingReference(false)
                                    : startReferenceMode
                            }
                        >
                            <MousePointer2 size={18} />{" "}
                            {isSettingReference
                                ? "Cancel reference"
                                : "Set reference"}
                        </button>
                        <button
                            className={ui.button}
                            onClick={() => {
                                setReferencePoints([]);
                                setIsSettingReference(false);
                            }}
                        >
                            Reset
                        </button>
                    </div>
                    <p className={ui.muted}>
                        {isSettingReference
                            ? "Click two points on the image."
                            : `${referencePoints.length}/2 reference points set.`}
                    </p>
                    <div className={ui.field}>
                        <label>Reference length mm</label>
                        <input
                            className={cx(
                                ui.input,
                                pageIssue("reference") && ui.inputInvalid,
                            )}
                            value={referenceLengthMm}
                            onChange={(event) => {
                                setReferenceLengthMm(event.target.value);
                                setDirty(true);
                            }}
                            type="number"
                        />
                        {fieldError(pageIssue("reference"))}
                    </div>
                    <button
                        className={cx(ui.button, ui.buttonPrimary)}
                        onClick={applyScale}
                        disabled={referencePoints.length !== 2}
                    >
                        Apply scale
                    </button>
                    <button
                        className={ui.button}
                        onClick={applyScaleToAllPages}
                        disabled={!scaleMmPerPx}
                    >
                        Apply scale to all pages
                    </button>
                    <div className={ui.metric}>
                        Scale:{" "}
                        {scaleMmPerPx
                            ? `${scaleMmPerPx.toFixed(3)} mm/px`
                            : "not set"}
                    </div>
                </section>

                <section className={cx(ui.panel, ui.stack)}>
                    <h3>Summary</h3>
                    {!summary && (
                        <div className={ui.validationCta}>
                            <p
                                className={
                                    pageIssue("reference") ? ui.error : ui.muted
                                }
                            >
                                {pageIssue("reference") ||
                                    "Summary is not available because reference is not yet set."}
                            </p>
                            <button
                                className={cx(ui.button, ui.buttonPrimary)}
                                onClick={startReferenceMode}
                            >
                                <MousePointer2 size={18} /> Set reference
                            </button>
                        </div>
                    )}
                    {summary && (
                        <>
                            <div className={ui.field}>
                                <span className={ui.label}>Wall length</span>
                                {summary.wallTotals.length === 0 && (
                                    <p className={ui.muted}>
                                        No counted wall lengths.
                                    </p>
                                )}
                                {summary.wallTotals.map(([type, total]) => (
                                    <div
                                        className={ui.metric}
                                        key={`wall-${type}`}
                                    >
                                        {type}: {total.toFixed(2)} m
                                    </div>
                                ))}
                            </div>
                            <div className={ui.field}>
                                <span className={ui.label}>Ceiling area</span>
                                {summary.ceilingTotals.map(([type, total]) => (
                                    <div
                                        className={ui.metric}
                                        key={`ceiling-${type}`}
                                    >
                                        {type}: {total.toFixed(2)} m2
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </section>

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
                                    selectArea(
                                        area.id,
                                        event.ctrlKey || event.metaKey,
                                    );
                                }}
                            >
                                <strong>{area.label}</strong>
                            </button>
                        ))}
                    </div>
                </section>

                <section className={cx(ui.panel, ui.stack)}>
                    <h3>Selection</h3>
                    {!selectedArea && !selectedEdgeArea && (
                        <p className={ui.muted}>
                            Select an area to edit labels and board types.
                        </p>
                    )}
                    {selectedEdgeArea && selectedEdge && (
                        <>
                            <div className={ui.metric}>
                                Edge {selectedEdge.edgeIndex + 1} selected in{" "}
                                {selectedEdgeArea.label}
                            </div>
                            {selectedAreaIds.length === 1 &&
                                selectedArea?.id === selectedEdgeArea.id &&
                                renderCeilingControls(selectedArea)}
                            <label className={cx(ui.button, "justify-start")}>
                                <input
                                    type="checkbox"
                                    checked={!!selectedEdgeOverride?.noPlaster}
                                    onChange={(event) =>
                                        setSelectedEdgeNoPlaster(
                                            event.target.checked,
                                        )
                                    }
                                />
                                No plaster
                            </label>
                            <div className={ui.field}>
                                <label>Wall board</label>
                                <select
                                    className={ui.input}
                                    value={
                                        selectedEdgeOverride?.wallPlasterType ??
                                        selectedEdgeArea.wallPlasterType
                                    }
                                    onChange={(event) =>
                                        setSelectedEdgeMaterial(
                                            event.target.value,
                                        )
                                    }
                                    disabled={
                                        !!selectedEdgeOverride?.noPlaster ||
                                        !!selectedEdgeArea.isOutdoor
                                    }
                                >
                                    {BOARD_TYPES.map((type) => (
                                        <option key={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                className={ui.button}
                                onClick={clearSelectedEdgeOverride}
                                disabled={!selectedEdgeOverride}
                            >
                                Clear override
                            </button>
                        </>
                    )}
                    {!selectedEdge &&
                        selectedArea &&
                        selectedAreaIds.length > 1 && (
                            <>
                                <div className={ui.metric}>
                                    {selectedAreaIds.length} areas selected.
                                    Material changes apply to all selected
                                    areas.
                                </div>
                                <div className={ui.field}>
                                    <label>Wall board</label>
                                    <select
                                        className={ui.input}
                                        value={commonMaterialValue(
                                            "wallPlasterType",
                                        )}
                                        onChange={(event) =>
                                            setMaterial(
                                                "wallPlasterType",
                                                event.target.value,
                                            )
                                        }
                                    >
                                        <option value="" disabled>
                                            Mixed
                                        </option>
                                        {BOARD_TYPES.map((type) => (
                                            <option key={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={ui.field}>
                                    <label>Ceiling board</label>
                                    <select
                                        className={ui.input}
                                        value={commonMaterialValue(
                                            "ceilingPlasterType",
                                        )}
                                        onChange={(event) =>
                                            setMaterial(
                                                "ceilingPlasterType",
                                                event.target.value,
                                            )
                                        }
                                    >
                                        <option value="" disabled>
                                            Mixed
                                        </option>
                                        {BOARD_TYPES.map((type) => (
                                            <option key={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}
                    {!selectedEdge &&
                        selectedArea &&
                        selectedAreaIds.length <= 1 && (
                            <>
                                <div className={ui.field}>
                                    <label>Area label</label>
                                    <input
                                        className={cx(
                                            ui.input,
                                            areaIssue(
                                                selectedArea.id,
                                                "areaLabel",
                                            ) && ui.inputInvalid,
                                        )}
                                        value={selectedArea.label}
                                        onChange={(event) =>
                                            updateArea(
                                                selectedArea.id,
                                                (area) => ({
                                                    ...area,
                                                    label: event.target.value,
                                                }),
                                            )
                                        }
                                    />
                                    {fieldError(
                                        areaIssue(selectedArea.id, "areaLabel"),
                                    )}
                                </div>
                                <label
                                    className={cx(ui.button, "justify-start")}
                                >
                                    <input
                                        type="checkbox"
                                        checked={!!selectedArea.isOutdoor}
                                        onChange={toggleOutdoor}
                                    />
                                    Outdoor area
                                </label>
                                {renderCeilingControls(selectedArea)}
                                {!selectedArea.isOutdoor && (
                                    <>
                                        <div className={ui.field}>
                                            <label>Wall board</label>
                                            <select
                                                className={cx(
                                                    ui.input,
                                                    areaIssue(
                                                        selectedArea.id,
                                                        "wallPlasterType",
                                                    ) && ui.inputInvalid,
                                                )}
                                                value={
                                                    selectedArea.wallPlasterType
                                                }
                                                onChange={(event) =>
                                                    setMaterial(
                                                        "wallPlasterType",
                                                        event.target.value,
                                                    )
                                                }
                                            >
                                                {BOARD_TYPES.map((type) => (
                                                    <option key={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                            {fieldError(
                                                areaIssue(
                                                    selectedArea.id,
                                                    "wallPlasterType",
                                                ),
                                            )}
                                        </div>
                                        <div className={ui.field}>
                                            <label>Ceiling board</label>
                                            <select
                                                className={cx(
                                                    ui.input,
                                                    areaIssue(
                                                        selectedArea.id,
                                                        "ceilingPlasterType",
                                                    ) && ui.inputInvalid,
                                                )}
                                                value={
                                                    selectedArea.ceilingPlasterType
                                                }
                                                onChange={(event) =>
                                                    setMaterial(
                                                        "ceilingPlasterType",
                                                        event.target.value,
                                                    )
                                                }
                                            >
                                                {BOARD_TYPES.map((type) => (
                                                    <option key={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                            {fieldError(
                                                areaIssue(
                                                    selectedArea.id,
                                                    "ceilingPlasterType",
                                                ),
                                            )}
                                        </div>
                                    </>
                                )}
                                {selectedArea.isOutdoor && (
                                    <div className={ui.field}>
                                        <label>Ceiling board</label>
                                        <select
                                            className={cx(
                                                ui.input,
                                                areaIssue(
                                                    selectedArea.id,
                                                    "ceilingPlasterType",
                                                ) && ui.inputInvalid,
                                            )}
                                            value={
                                                selectedArea.ceilingPlasterType
                                            }
                                            onChange={(event) =>
                                                setMaterial(
                                                    "ceilingPlasterType",
                                                    event.target.value,
                                                )
                                            }
                                        >
                                            {BOARD_TYPES.map((type) => (
                                                <option key={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                        {fieldError(
                                            areaIssue(
                                                selectedArea.id,
                                                "ceilingPlasterType",
                                            ),
                                        )}
                                    </div>
                                )}
                                {fieldError(
                                    areaIssue(selectedArea.id, "polygon"),
                                )}
                                <div className={ui.metric}>
                                    Selected points:{" "}
                                    {selectedPointIndexes.length}
                                </div>
                                <div className={ui.metric}>
                                    Wall length:{" "}
                                    {selectedArea.isOutdoor
                                        ? "not counted"
                                        : metrics
                                          ? `${metrics.wallLengthM.toFixed(2)} m`
                                          : "set scale"}
                                </div>
                                <div className={ui.metric}>
                                    Ceiling area:{" "}
                                    {metrics
                                        ? `${metrics.ceilingAreaM2.toFixed(2)} m2`
                                        : "set scale"}
                                </div>
                            </>
                        )}
                </section>
            </aside>    );
}