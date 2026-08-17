"use client";

import {
    parseOverlay,
    parseReferencePoints,
    validatePageForExport,
    type PageValidationInput,
    type ValidationIssue,
} from "@libraries/plaster-calculator-ui";
import type { ProjectsService } from "@libraries/plaster-calculator-web-core";
import type { useNotificationsManager } from "@libraries/uikit-web";
import { useCallback, useEffect, useState } from "react";

import type { ProjectDetail } from "../../../../types.js";

type Notifications = ReturnType<typeof useNotificationsManager>;

type UseProjectPageExportOptions = {
    readonly project: ProjectDetail | null;
    readonly setProject: (
        updater: (current: ProjectDetail | null) => ProjectDetail | null,
    ) => void;
    readonly selectedPageId: string | null;
    readonly setSelectedPageId: (pageId: string) => void;
    readonly setError: (message: string) => void;
    readonly projectsService: ProjectsService;
    readonly notify: Notifications["notify"];
    readonly dismiss: Notifications["dismiss"];
};

type UseProjectPageExportResult = {
    readonly pageDrafts: Record<string, PageValidationInput>;
    readonly switchingPage: boolean;
    readonly validationIssues: ValidationIssue[];
    readonly updateDraft: (pageId: string, draft: PageValidationInput) => void;
    readonly selectPage: (pageId: string) => Promise<void>;
    readonly validateAndExport: () => Promise<void>;
    readonly resetForProjectLoad: () => void;
};

export function useProjectPageExport({
    project,
    setProject,
    selectedPageId,
    setSelectedPageId,
    setError,
    projectsService,
    notify,
    dismiss,
}: UseProjectPageExportOptions): UseProjectPageExportResult {
    const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>(
        [],
    );
    const [pageDrafts, setPageDrafts] = useState<
        Record<string, PageValidationInput>
    >({});
    const [switchingPage, setSwitchingPage] = useState(false);
    const [exportNotificationId, setExportNotificationId] = useState<
        string | null
    >(null);

    useEffect(() => {
        if (!project || validationIssues.length === 0) return;
        const issues = project.pages.flatMap((page) =>
            validatePageForExport(pageDrafts[page.id] ?? page),
        );
        setValidationIssues(issues);
        if (issues.length === 0 && exportNotificationId) {
            dismiss(exportNotificationId);
            setExportNotificationId(null);
        }
    }, [pageDrafts]);

    const updateDraft = useCallback(
        (pageId: string, draft: PageValidationInput): void => {
            setPageDrafts((current) => ({ ...current, [pageId]: draft }));
        },
        [],
    );

    const resetForProjectLoad = useCallback((): void => {
        setPageDrafts({});
        setValidationIssues([]);
    }, []);

    const saveDraftBeforeLeavingPage = useCallback(async () => {
        if (!project || !selectedPageId) return;
        const draft = pageDrafts[selectedPageId];
        if (!draft) return;
        const savedPage = await projectsService.savePageOverlay(
            project.id,
            selectedPageId,
            {
                overlay: parseOverlay(draft.overlay),
                scaleMmPerPx: draft.scaleMmPerPx,
                ceilingHeightMm: draft.ceilingHeightMm,
                referencePoints: draft.referencePoints
                    ? parseReferencePoints(draft.referencePoints)
                    : null,
                referenceLengthMm: draft.referenceLengthMm,
            },
        );
        setProject((current) =>
            current
                ? {
                      ...current,
                      pages: current.pages.map((page) =>
                          page.id === savedPage.id ? savedPage : page,
                      ),
                  }
                : current,
        );
        setPageDrafts((current) => {
            const next = { ...current };
            delete next[selectedPageId];
            return next;
        });
    }, [pageDrafts, project, projectsService, selectedPageId, setProject]);

    const selectPage = useCallback(
        async (pageId: string) => {
            if (pageId === selectedPageId || switchingPage) return;
            setSwitchingPage(true);
            try {
                await saveDraftBeforeLeavingPage();
                setSelectedPageId(pageId);
                setError("");
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Unable to save current page before switching",
                );
            } finally {
                setSwitchingPage(false);
            }
        },
        [
            saveDraftBeforeLeavingPage,
            selectedPageId,
            setError,
            setSelectedPageId,
            switchingPage,
        ],
    );

    const validateAndExport = useCallback(async () => {
        if (!project) return;
        const issues = project.pages.flatMap((page) =>
            validatePageForExport(pageDrafts[page.id] ?? page),
        );
        setValidationIssues(issues);
        if (issues.length > 0) {
            setExportNotificationId(
                notify({
                    intent: "error",
                    title: "A few details need attention before export",
                    description: "I've highlighted the first one for you.",
                }),
            );
            setError("");
            const firstIssue = issues[0];
            if (firstIssue) setSelectedPageId(firstIssue.pageId);
            return;
        }
        try {
            await saveDraftBeforeLeavingPage();
            setError("");
            const exportFile = await projectsService.exportProjectCsv(
                project.id,
            );
            const blob = new Blob([exportFile.csv], {
                type: exportFile.mimeType,
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = exportFile.fileName;
            link.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to save current page before exporting",
            );
        }
    }, [
        notify,
        pageDrafts,
        project,
        projectsService,
        saveDraftBeforeLeavingPage,
        setError,
        setSelectedPageId,
    ]);

    return {
        pageDrafts,
        switchingPage,
        validationIssues,
        updateDraft,
        selectPage,
        validateAndExport,
        resetForProjectLoad,
    };
}
