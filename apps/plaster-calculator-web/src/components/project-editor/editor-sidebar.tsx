import { AreasPanel } from "./areas-panel.js";
import { PageSettingsPanel } from "./page-settings-panel.js";
import { ScalePanel } from "./scale-panel.js";
import { SelectionPanel } from "./selection-panel.js";
import { SummaryPanel } from "./summary-panel.js";
import { ui } from "../../lib/styles.js";

import type { EditorSidebarProps } from "./editor-sidebar.types.js";

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
    return (
        <aside className={ui.inspector}>
            <PageSettingsPanel
                ceilingHeightMm={ceilingHeightMm}
                dirty={dirty}
                page={page}
                status={status}
                applyHeightToAllPages={applyHeightToAllPages}
                fieldError={fieldError}
                hasPageHeightIssue={hasPageHeightIssue}
                setCeilingHeightMm={setCeilingHeightMm}
                setDirty={setDirty}
            />
            <ScalePanel
                isSettingReference={isSettingReference}
                referenceLengthMm={referenceLengthMm}
                referencePoints={referencePoints}
                scaleMmPerPx={scaleMmPerPx}
                applyScale={applyScale}
                applyScaleToAllPages={applyScaleToAllPages}
                fieldError={fieldError}
                pageIssue={pageIssue}
                setDirty={setDirty}
                setIsSettingReference={setIsSettingReference}
                setReferenceLengthMm={setReferenceLengthMm}
                setReferencePoints={setReferencePoints}
                startReferenceMode={startReferenceMode}
            />
            <SummaryPanel
                summary={summary}
                pageIssue={pageIssue}
                startReferenceMode={startReferenceMode}
            />
            <AreasPanel
                selectedAreaIds={selectedAreaIds}
                visibleAreas={visibleAreas}
                selectArea={selectArea}
            />
            <SelectionPanel
                areaIssue={areaIssue}
                clearSelectedEdgeOverride={clearSelectedEdgeOverride}
                commonMaterialValue={commonMaterialValue}
                fieldError={fieldError}
                metrics={metrics}
                renderCeilingControls={renderCeilingControls}
                selectedArea={selectedArea}
                selectedAreaIds={selectedAreaIds}
                selectedEdge={selectedEdge}
                selectedEdgeArea={selectedEdgeArea}
                selectedEdgeOverride={selectedEdgeOverride}
                selectedPointIndexes={selectedPointIndexes}
                setMaterial={setMaterial}
                setSelectedEdgeMaterial={setSelectedEdgeMaterial}
                setSelectedEdgeNoPlaster={setSelectedEdgeNoPlaster}
                toggleOutdoor={toggleOutdoor}
                updateArea={updateArea}
            />
        </aside>
    );
}
