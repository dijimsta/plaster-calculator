import { InspectorPanel, InspectorSection } from "@libraries/uikit-web";

import { useEditorTranslation } from "../i18n/index.js";

import { AreasPanel } from "./areas-panel.js";
import type { EditorSidebarProps } from "./editor-sidebar.types.js";
import { PageSettingsPanel } from "./page-settings-panel.js";
import { ScalePanel } from "./scale-panel.js";
import { SelectionPanel } from "./selection-panel.js";
import { SummaryPanel } from "./summary-panel.js";

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
    projectCompanyPanel,
    salesStatusPanel,
    pagePickerPanel,
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
    const { t } = useEditorTranslation();

    return (
        <InspectorPanel fullHeight>
            {salesStatusPanel && (
                <InspectorSection
                    title={t("editorSidebar.statusTitle")}
                    defaultOpen
                >
                    {salesStatusPanel}
                </InspectorSection>
            )}
            <InspectorSection
                title={t("editorSidebar.companyTitle")}
                defaultOpen
            >
                {projectCompanyPanel}
            </InspectorSection>
            {pagePickerPanel && (
                <InspectorSection
                    title={t("editorSidebar.pagesTitle")}
                    defaultOpen
                >
                    {pagePickerPanel}
                </InspectorSection>
            )}
            <InspectorSection title={`Page ${page.pageNumber}`} defaultOpen>
                <PageSettingsPanel
                    ceilingHeightMm={ceilingHeightMm}
                    dirty={dirty}
                    status={status}
                    applyHeightToAllPages={applyHeightToAllPages}
                    fieldError={fieldError}
                    hasPageHeightIssue={hasPageHeightIssue}
                    setCeilingHeightMm={setCeilingHeightMm}
                    setDirty={setDirty}
                />
            </InspectorSection>
            <InspectorSection title={t("editorSidebar.scaleTitle")} defaultOpen>
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
            </InspectorSection>
            <InspectorSection
                title={t("editorSidebar.summaryTitle")}
                defaultOpen
            >
                <SummaryPanel
                    summary={summary}
                    pageIssue={pageIssue}
                    startReferenceMode={startReferenceMode}
                />
            </InspectorSection>
            <InspectorSection title={t("editorSidebar.areasTitle")} defaultOpen>
                <AreasPanel
                    selectedAreaIds={selectedAreaIds}
                    visibleAreas={visibleAreas}
                    selectArea={selectArea}
                />
            </InspectorSection>
            <InspectorSection
                title={t("editorSidebar.selectionTitle")}
                defaultOpen
            >
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
            </InspectorSection>
        </InspectorPanel>
    );
}
