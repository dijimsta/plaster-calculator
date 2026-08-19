import { Drawer } from "@libraries/uikit-web";

import { useEditorTranslation } from "../i18n/index.js";

import { EditorSidebar } from "./editor-sidebar.js";
import { editorDrawerSize } from "./project-editor.styles.js";
import type { ProjectEditorProps } from "./project-editor.types.js";
import type { useEditorActions } from "./use-editor-actions.js";
import type { useEditorDerivedState } from "./use-editor-derived-state.js";
import type { useEditorOverlay } from "./use-editor-overlay.js";
import type { useEditorPersistence } from "./use-editor-persistence.js";
import type { useEditorSelection } from "./use-editor-selection.js";
import type { useEditorValidation } from "./use-editor-validation.js";

type FullScreenInspectorDrawerProps = {
    readonly actions: ReturnType<typeof useEditorActions>;
    readonly derivedState: ReturnType<typeof useEditorDerivedState>;
    readonly dirty: boolean;
    readonly drawerOpen: boolean;
    readonly isSettingReference: boolean;
    readonly overlayState: ReturnType<typeof useEditorOverlay>;
    readonly page: ProjectEditorProps["page"];
    readonly pagePickerPanel: ProjectEditorProps["pagePickerPanel"];
    readonly persistence: ReturnType<typeof useEditorPersistence>;
    readonly projectCompanyPanel: ProjectEditorProps["projectCompanyPanel"];
    readonly salesStatusPanel: ProjectEditorProps["salesStatusPanel"];
    readonly selection: ReturnType<typeof useEditorSelection>;
    readonly validation: ReturnType<typeof useEditorValidation>;
    readonly closeDrawer: () => void;
    readonly setDirty: (dirty: boolean) => void;
    readonly setIsSettingReference: (value: boolean) => void;
};

/**
 * The full-screen inspector `Drawer` and the `EditorSidebar` it hosts,
 * split out of `project-editor-fullscreen-view.tsx` purely to keep that
 * file under the `max-lines` ESLint budget -- this component owns no state
 * of its own, it's the same JSX that file rendered directly before.
 */
export function FullScreenInspectorDrawer({
    actions,
    derivedState,
    dirty,
    drawerOpen,
    isSettingReference,
    overlayState,
    page,
    pagePickerPanel,
    persistence,
    projectCompanyPanel,
    salesStatusPanel,
    selection,
    validation,
    closeDrawer,
    setDirty,
    setIsSettingReference,
}: FullScreenInspectorDrawerProps) {
    const { t } = useEditorTranslation();

    return (
        <Drawer
            modal={false}
            placement="right"
            open={drawerOpen}
            onClose={closeDrawer}
            size={editorDrawerSize}
            title={t("editorSidebar.pageDrawerTitle", {
                page: page.pageNumber,
            })}
        >
            <EditorSidebar
                page={page}
                status={persistence.status}
                dirty={dirty}
                ceilingHeightMm={overlayState.ceilingHeightMm}
                scaleMmPerPx={overlayState.scaleMmPerPx}
                referencePoints={overlayState.referencePoints}
                referenceLengthMm={overlayState.referenceLengthMm}
                isSettingReference={isSettingReference}
                summary={derivedState.summary}
                visibleAreas={derivedState.visibleAreas}
                selectedAreaIds={selection.selectedAreaIds}
                selectedArea={derivedState.selectedArea}
                selectedEdgeArea={derivedState.selectedEdgeArea}
                selectedEdge={selection.selectedEdge}
                selectedEdgeOverride={derivedState.selectedEdgeOverride}
                selectedPointIndexes={selection.selectedPointIndexes}
                metrics={derivedState.metrics}
                projectCompanyPanel={projectCompanyPanel}
                salesStatusPanel={salesStatusPanel}
                pagePickerPanel={pagePickerPanel}
                areaIssue={validation.areaIssue}
                applyHeightToAllPages={persistence.applyHeightToAllPages}
                applyScale={actions.applyScale}
                applyScaleToAllPages={persistence.applyScaleToAllPages}
                clearSelectedEdgeOverride={actions.clearSelectedEdgeOverride}
                commonMaterialValue={actions.commonMaterialValue}
                fieldError={validation.fieldError}
                hasPageHeightIssue={validation.hasPageHeightIssue}
                pageIssue={validation.pageIssue}
                renderCeilingControls={validation.renderCeilingControls}
                selectArea={selection.selectArea}
                setCeilingHeightMm={overlayState.setCeilingHeightMm}
                setDirty={setDirty}
                setIsSettingReference={setIsSettingReference}
                setMaterial={actions.setMaterial}
                setReferenceLengthMm={overlayState.setReferenceLengthMm}
                setReferencePoints={overlayState.setReferencePoints}
                setSelectedEdgeMaterial={actions.setSelectedEdgeMaterial}
                setSelectedEdgeNoPlaster={actions.setSelectedEdgeNoPlaster}
                startReferenceMode={actions.startReferenceMode}
                toggleOutdoor={actions.toggleOutdoor}
                updateArea={actions.updateArea}
            />
        </Drawer>
    );
}
