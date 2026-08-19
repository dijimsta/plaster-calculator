export const en = Object.freeze({
    common: Object.freeze({}),
    editorToolbar: Object.freeze({
        overlayModeLabels: Object.freeze({
            both: "Both",
            ceilings: "Ceilings",
            walls: "Walls",
        }),
        undo: "Undo",
        redo: "Redo",
        deselectAll: "Deselect all",
        addPoint: "Add point",
        straightenSelectedPoints: "Straighten between selected points",
        enterFullScreen: "Enter full screen",
        exitFullScreen: "Exit full screen",
        fullScreenBanner: Object.freeze({
            message:
                "Full screen opened automatically because this window is narrow.",
            keepPanels: "Keep panels",
        }),
    }),
    editorSidebar: Object.freeze({
        statusTitle: "Status",
        companyTitle: "Company",
        pagesTitle: "Pages",
        pageDrawerTitle: "Page {{page}}",
        scaleTitle: "Scale",
        summaryTitle: "Summary",
        areasTitle: "Areas",
        selectionTitle: "Selection",
        selectionCard: Object.freeze({
            roomLabel: "Room",
            wallLabel: "Wall",
            pointSelected: "Point selected",
            editProperties: "Edit properties",
        }),
    }),
    ceilingControls: Object.freeze({
        roomCeilingLabel: "Room ceiling",
        ceilingModeOptions: Object.freeze({
            flat: "Flat",
            raked: "Raked",
        }),
        roomHeightOverrideLabel: "Room height override mm",
        pageHeightNotSet: "Page height not set",
        lowHeightLabel: "Low height mm",
        highHeightLabel: "High height mm",
    }),
    pageSettingsPanel: Object.freeze({
        readyStatus: "Ready",
        ceilingHeightLabel: "Ceiling height mm",
        ceilingHeightRequired: "Ceiling height is required",
    }),
    scalePanel: Object.freeze({
        cancelReference: "Cancel reference",
        setReference: "Set reference",
        clickTwoPoints: "Click two points on the image.",
        referencePointsSet: "{{points}}/2 reference points set.",
        referenceLengthLabel: "Reference length mm",
    }),
    selectionBoardControls: Object.freeze({
        wallProfileLabel: "Wall profile",
        wallBoardLabel: "Wall board",
        ceilingBoardLabel: "Ceiling board",
    }),
    selectionPanel: Object.freeze({
        areaLabelField: "Area label",
    }),
    summaryPanel: Object.freeze({
        unavailable:
            "Summary is not available because reference is not yet set.",
        wallLength: "Wall length",
        ceilingArea: "Ceiling area",
    }),
    projectEditor: Object.freeze({
        confirmReanalyze:
            "Analyze this page? Existing polygons will be replaced.",
        analyzingStatus: "Analyzing floorplan...",
        analysisCompleteStatus: "Analysis complete",
        analysisFailedStatus: "Analysis failed",
    }),
});
