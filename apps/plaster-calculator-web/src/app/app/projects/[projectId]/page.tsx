"use client";

import { use, useCallback, useEffect, useMemo, useState } from "react";

import { ProjectHeader } from "./project-page-header.js";
import {
    ProjectOutcomeModal,
    ProjectSalesStatusControl,
} from "./project-sales-status-control.js";
import { ProjectStatusContent } from "./project-status-content.js";
import { ProjectToast } from "./project-toast.js";
import {
    exportProjectCsv,
    getProject,
    renameProject,
    savePageOverlay,
    updateProject,
} from "../../../../lib/api.js";
import { salesStatusLabel } from "../../../../lib/sales-status.js";
import { ui } from "../../../../lib/styles.js";
import {
    type PageValidationInput,
    parseOverlay,
    parseReferencePoints,
    validatePageForExport,
    type ValidationIssue,
} from "../../../../lib/validation.js";

import type { ProjectDetail, SalesStatus } from "../../../../types.js";

export default function ProjectPage({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = use(params);
    const [project, setProject] = useState<ProjectDetail | null>(null);
    const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [toast, setToast] = useState("");
    const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>(
        [],
    );
    const [pageDrafts, setPageDrafts] = useState<
        Record<string, PageValidationInput>
    >({});
    const [switchingPage, setSwitchingPage] = useState(false);
    const [renaming, setRenaming] = useState(false);
    const [renameValue, setRenameValue] = useState("");
    const [accountId, setAccountId] = useState<string | null>(null);
    const [savingAccount, setSavingAccount] = useState(false);
    const [savingSalesStatus, setSavingSalesStatus] = useState(false);
    const [showOutcomeModal, setShowOutcomeModal] = useState(false);

    useEffect(() => {
        load();
    }, [projectId]);

    useEffect(() => {
        if (!project || validationIssues.length === 0) return;
        const issues = project.pages.flatMap((page) =>
            validatePageForExport(pageDrafts[page.id] ?? page),
        );
        setValidationIssues(issues);
        if (issues.length === 0) setToast("");
    }, [pageDrafts]);

    useEffect(() => {
        if (!toast) return;
        const timeout = window.setTimeout(() => setToast(""), 6000);
        return () => window.clearTimeout(timeout);
    }, [toast]);

    async function load() {
        try {
            const detail = await getProject(projectId);
            setProject(detail);
            setRenameValue(detail.name);
            setAccountId(detail.accountId);
            setSelectedPageId((current) =>
                current && detail.pages.some((page) => page.id === current)
                    ? current
                    : (detail.pages[0]?.id ?? null),
            );
            setPageDrafts({});
            setValidationIssues([]);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Unable to load project",
            );
        }
    }

    const selectedPage = useMemo(
        () => project?.pages.find((page) => page.id === selectedPageId) ?? null,
        [project, selectedPageId],
    );

    async function saveRename() {
        if (!project || !renameValue.trim()) return;
        try {
            const renamed = await renameProject(project.id, renameValue.trim());
            setProject(renamed);
            setRenaming(false);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Unable to rename project",
            );
        }
    }

    async function saveAccount(): Promise<void> {
        if (!project || !accountId) return;
        setSavingAccount(true);
        try {
            const updated = await updateProject({
                projectId: project.id,
                accountId,
            });
            setProject(updated);
            setError("");
            setToast("Account linked to project.");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Unable to link account",
            );
            throw err;
        } finally {
            setSavingAccount(false);
        }
    }

    async function changeSalesStatus(status: SalesStatus): Promise<void> {
        if (!project || project.salesStatus === status) return;
        const confirmed = window.confirm(
            `Change status to ${salesStatusLabel(status)}?`,
        );
        if (!confirmed) return;
        await saveSalesStatus(status);
    }

    async function saveSalesStatus(status: SalesStatus): Promise<void> {
        if (!project) return;
        setSavingSalesStatus(true);
        try {
            const updated = await updateProject({
                projectId: project.id,
                salesStatus: status,
            });
            setProject(updated);
            setAccountId(updated.accountId);
            setError("");
            setToast(`Status changed to ${salesStatusLabel(status)}.`);
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

    async function selectOutcome(
        status: Extract<SalesStatus, "WON" | "LOST">,
    ): Promise<void> {
        setShowOutcomeModal(false);
        if (!project || project.salesStatus === status) return;
        await saveSalesStatus(status);
    }

    const updateDraft = useCallback(
        (pageId: string, draft: PageValidationInput) => {
            setPageDrafts((current) => ({ ...current, [pageId]: draft }));
        },
        [],
    );

    async function saveDraftBeforeLeavingPage() {
        if (!project || !selectedPageId) return;
        const draft = pageDrafts[selectedPageId];
        if (!draft) return;
        const savedPage = await savePageOverlay(project.id, selectedPageId, {
            overlay: parseOverlay(draft.overlay),
            scaleMmPerPx: draft.scaleMmPerPx,
            ceilingHeightMm: draft.ceilingHeightMm,
            referencePoints: draft.referencePoints
                ? parseReferencePoints(draft.referencePoints)
                : null,
            referenceLengthMm: draft.referenceLengthMm,
        });
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
    }

    async function selectPage(pageId: string) {
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
    }

    async function validateAndExport() {
        if (!project) return;
        const issues = project.pages.flatMap((page) =>
            validatePageForExport(pageDrafts[page.id] ?? page),
        );
        setValidationIssues(issues);
        if (issues.length > 0) {
            setToast(
                "A few details need attention before export. I've highlighted the first one for you.",
            );
            setError("");
            const firstIssue = issues[0];
            if (firstIssue) setSelectedPageId(firstIssue.pageId);
            return;
        }
        try {
            await saveDraftBeforeLeavingPage();
            setError("");
            const exportFile = await exportProjectCsv(project.id);
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
    }

    return (
        <main className={ui.shell}>
            <ProjectToast toast={toast} setToast={setToast} />
            <ProjectHeader
                project={project}
                renaming={renaming}
                renameValue={renameValue}
                load={load}
                saveRename={saveRename}
                setRenaming={setRenaming}
                setRenameValue={setRenameValue}
                validateAndExport={validateAndExport}
            />

            {error && <p className={ui.error}>{error}</p>}
            {project && (
                <ProjectSalesStatusControl
                    currentStatus={project.salesStatus}
                    disabled={savingSalesStatus}
                    onRequestOutcome={() => setShowOutcomeModal(true)}
                    onStatusChange={changeSalesStatus}
                />
            )}
            {project && (
                <ProjectStatusContent
                    accountId={accountId}
                    project={project}
                    saveAccount={saveAccount}
                    savingAccount={savingAccount}
                    selectedPage={selectedPage}
                    selectedPageId={selectedPageId}
                    selectPage={selectPage}
                    setAccountId={setAccountId}
                    switchingPage={switchingPage}
                    load={load}
                    updateDraft={updateDraft}
                    validationIssues={validationIssues}
                />
            )}
            {showOutcomeModal && (
                <ProjectOutcomeModal
                    disabled={savingSalesStatus}
                    onClose={() => setShowOutcomeModal(false)}
                    onSelect={(status) => void selectOutcome(status)}
                />
            )}
        </main>
    );
}
