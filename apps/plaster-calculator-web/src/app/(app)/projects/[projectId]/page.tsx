"use client";

import type { SalesStatus } from "@libraries/plaster-calculator-common";
import { useProjectsService } from "@libraries/plaster-calculator-web-core";
import { Box, useNotificationsManager } from "@libraries/uikit-web";
import { useSearchParams } from "next/navigation.js";
import { use, useCallback, useEffect, useMemo, useState } from "react";

import { useAppTranslation } from "../../../../i18n/index.ts";
import { useSalesStatusLabel } from "../../../../lib/sales-status.js";
import { ui } from "../../../../lib/styles.js";
import type { ProjectDetail } from "../../../../types.js";

import { parsePageNumber, parseTool } from "./floorplan-deep-link.utils.js";
import { ProjectHeader } from "./project-page-header.js";
import { ProjectSalesStatusControl } from "./project-sales-status-control.js";
import { ProjectStatusContent } from "./project-status-content.js";
import { useProjectPageExport } from "./use-project-page-export.js";

export default function ProjectPage({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = use(params);
    const { t } = useAppTranslation();
    const salesStatusLabel = useSalesStatusLabel();
    const projectsService = useProjectsService();
    const { notify, dismiss } = useNotificationsManager();
    const searchParams = useSearchParams();
    // Read once, on mount: a WORK-139 deep link (`?page=2&tool=scale`)
    // should pick the initial page/tool and then get out of the way, not
    // keep re-applying itself if the URL is inspected again later or the
    // user navigates within the editor.
    const [deepLinkPageNumber] = useState(() => parsePageNumber(searchParams));
    const [deepLinkTool] = useState(() => parseTool(searchParams));
    const [project, setProject] = useState<ProjectDetail | null>(null);
    const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [renaming, setRenaming] = useState(false);
    const [renameValue, setRenameValue] = useState("");
    const [companyId, setCompanyId] = useState<string | null>(null);
    const [savingCompany, setSavingCompany] = useState(false);
    const [savingSalesStatus, setSavingSalesStatus] = useState(false);
    const [analyzingPage, setAnalyzingPage] = useState(false);
    const [floorplanFullScreen, setFloorplanFullScreen] = useState(false);
    const {
        switchingPage,
        validationIssues,
        updateDraft,
        selectPage,
        validateAndExport,
        resetForProjectLoad,
    } = useProjectPageExport({
        project,
        setProject,
        selectedPageId,
        setSelectedPageId,
        setError,
        projectsService,
        notify,
        dismiss,
    });

    const load = useCallback(async (): Promise<void> => {
        try {
            const detail = await projectsService.getProject(projectId);
            setProject(detail);
            setRenameValue(detail.name);
            setCompanyId(detail.companyId);
            setSelectedPageId((current) => {
                if (
                    current &&
                    detail.pages.some((page) => page.id === current)
                ) {
                    return current;
                }
                // Only reachable on the very first successful load (nothing
                // selected yet) — a later reload (e.g. the PROCESSING poll
                // below) always has a `current` that still exists, so the
                // deep-linked page never overrides a page the user has
                // since switched to.
                const deepLinkPage =
                    deepLinkPageNumber != null
                        ? detail.pages.find(
                              (page) => page.pageNumber === deepLinkPageNumber,
                          )
                        : undefined;
                return deepLinkPage?.id ?? detail.pages[0]?.id ?? null;
            });
            resetForProjectLoad();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Unable to load project",
            );
        }
    }, [deepLinkPageNumber, projectId, projectsService, resetForProjectLoad]);

    useEffect(() => {
        void load();
    }, [load]);

    const hasProcessingPage =
        project?.pages.some((page) => page.status === "PROCESSING") ?? false;

    useEffect(() => {
        if (!hasProcessingPage) return;
        const timer = window.setInterval(() => void load(), 2000);
        return () => window.clearInterval(timer);
    }, [hasProcessingPage, load]);

    const selectedPage = useMemo(
        () => project?.pages.find((page) => page.id === selectedPageId) ?? null,
        [project, selectedPageId],
    );

    async function saveRename() {
        if (!project || !renameValue.trim()) return;
        try {
            const renamed = await projectsService.renameProject(
                project.id,
                renameValue.trim(),
            );
            setProject(renamed);
            setRenaming(false);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Unable to rename project",
            );
        }
    }

    async function saveCompany(overrideCompanyId?: string): Promise<void> {
        // `overrideCompanyId` lets a caller link a company whose id hasn't
        // reached `companyId` state yet -- e.g. right after creating one
        // inline, where waiting for the next render would risk this call
        // still reading the pre-creation (null) value.
        const targetCompanyId = overrideCompanyId ?? companyId;
        if (!project || !targetCompanyId) return;
        setSavingCompany(true);
        try {
            const updated = await projectsService.updateProject({
                projectId: project.id,
                companyId: targetCompanyId,
            });
            setProject(updated);
            setError("");
            notify({ intent: "success", title: "Company linked to project." });
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Unable to link company",
            );
            throw err;
        } finally {
            setSavingCompany(false);
        }
    }

    async function changeSalesStatus(status: SalesStatus): Promise<void> {
        if (!project || project.salesStatus === status) return;
        const confirmed = window.confirm(
            t("projectPage.confirmStatusChange", {
                status: salesStatusLabel(status),
            }),
        );
        if (!confirmed) return;
        await saveSalesStatus(status);
    }

    async function saveSalesStatus(status: SalesStatus): Promise<void> {
        if (!project) return;
        setSavingSalesStatus(true);
        try {
            const updated = await projectsService.updateProject({
                projectId: project.id,
                salesStatus: status,
            });
            setProject(updated);
            setCompanyId(updated.companyId);
            setError("");
            notify({
                intent: "success",
                title: t("projectPage.statusChanged", {
                    status: salesStatusLabel(status),
                }),
            });
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to update project status",
            );
        } finally {
            setSavingSalesStatus(false);
        }
    }

    return (
        <div className={ui.projectPage}>
            {!floorplanFullScreen && (
                <div className={ui.projectPageHeader}>
                    <ProjectHeader
                        project={project}
                        projectId={projectId}
                        activeTab="floorplan"
                        renaming={renaming}
                        renameValue={renameValue}
                        saveRename={saveRename}
                        setRenaming={setRenaming}
                        setRenameValue={setRenameValue}
                        validateAndExport={validateAndExport}
                    />
                </div>
            )}
            <Box padding="none" direction="column" grow scroll>
                {error && <p className={ui.error}>{error}</p>}
                {project && (
                    <ProjectStatusContent
                        companyId={companyId}
                        floorplanFullScreen={floorplanFullScreen}
                        initialTool={deepLinkTool}
                        onFullScreenChange={setFloorplanFullScreen}
                        project={project}
                        salesStatusPanel={
                            <ProjectSalesStatusControl
                                currentStatus={project.salesStatus}
                                disabled={savingSalesStatus}
                                onStatusChange={changeSalesStatus}
                            />
                        }
                        saveCompany={saveCompany}
                        savingCompany={savingCompany}
                        selectedPage={selectedPage}
                        selectedPageId={selectedPageId}
                        selectPage={selectPage}
                        setCompanyId={setCompanyId}
                        switchingPage={switchingPage}
                        analyzingPage={analyzingPage}
                        setAnalyzingPage={setAnalyzingPage}
                        load={load}
                        updateDraft={updateDraft}
                        validationIssues={validationIssues}
                    />
                )}
            </Box>
        </div>
    );
}
