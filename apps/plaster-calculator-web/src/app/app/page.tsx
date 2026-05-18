"use client";

import { RefreshCcw } from "lucide-react";
import ThemeSettingsButton from "../../components/ThemeSettingsButton.js";
import { ui } from "../../lib/styles.js";
import { DashboardToast } from "./dashboard-toast.js";
import { useDashboardProjects } from "./hooks/use-dashboard-projects.js";
import { useDashboardUpload } from "./hooks/use-dashboard-upload.js";
import { NewProjectForm } from "./new-project-form.js";
import { PdfPageModal } from "./pdf-page-modal.js";
import { ProjectHistory } from "./project-history.js";

export default function HomePage() {
    const projects = useDashboardProjects();
    const upload = useDashboardUpload({
        refresh: projects.refresh,
        selectedStrategyKey: projects.selectedStrategyKey,
        setMessage: projects.setMessage,
        setProcessingProjectId: projects.setProcessingProjectId,
        setToast: projects.setToast,
        setToastProject: projects.setToastProject,
    });

    return (
        <main className={ui.shell}>
            <DashboardToast
                toast={projects.toast}
                toastProject={projects.toastProject}
                processingProjectId={projects.processingProjectId}
                setToast={projects.setToast}
                setToastProject={projects.setToastProject}
            />

            <header className={ui.topbar}>
                <div className="grid gap-1">
                    <h1 className="m-0 text-2xl leading-tight">
                        Plaster Calculator
                    </h1>
                    <span className={ui.muted}>Your quoting workspace</span>
                </div>
                <div className={ui.buttonRow}>
                    <ThemeSettingsButton />
                    <button
                        className={ui.button}
                        onClick={projects.refresh}
                        title="Refresh projects"
                    >
                        <RefreshCcw size={18} /> Refresh
                    </button>
                </div>
            </header>

            <section className={ui.layoutGrid}>
                <NewProjectForm
                    dragActive={upload.dragActive}
                    file={upload.file}
                    loading={upload.loading}
                    message={projects.message}
                    name={upload.name}
                    processingStrategies={projects.processingStrategies}
                    selectedStrategyKey={projects.selectedStrategyKey}
                    handleDrop={upload.handleDrop}
                    handleFileSelection={upload.handleFileSelection}
                    setDragActive={upload.setDragActive}
                    setName={upload.setName}
                    setSelectedStrategyKey={projects.setSelectedStrategyKey}
                    submit={upload.submit}
                />
                <ProjectHistory
                    filtered={projects.filtered}
                    projectsLoading={projects.projectsLoading}
                    query={projects.query}
                    renameValue={projects.renameValue}
                    renamingId={projects.renamingId}
                    removeProject={projects.removeProject}
                    saveRename={projects.saveRename}
                    setQuery={projects.setQuery}
                    setRenamingId={projects.setRenamingId}
                    setRenameValue={projects.setRenameValue}
                />
            </section>

            {upload.draftProjectId && (
                <PdfPageModal
                    id="pdf-processing-strategy"
                    loading={upload.loading}
                    pageUploadProgress={upload.pageUploadProgress}
                    pdfPages={upload.pdfPages}
                    processingStrategies={projects.processingStrategies}
                    selectedPages={upload.selectedPages}
                    selectedStrategyKey={projects.selectedStrategyKey}
                    closePdfModal={upload.closePdfModal}
                    processSelectedPdfPages={upload.processSelectedPdfPages}
                    setSelectedStrategyKey={projects.setSelectedStrategyKey}
                    togglePage={upload.togglePage}
                />
            )}
        </main>
    );
}
