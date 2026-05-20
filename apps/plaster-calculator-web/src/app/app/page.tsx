"use client";

import { DashboardToast } from "./dashboard-toast.js";
import { useDashboardProjects } from "./hooks/use-dashboard-projects.js";
import { useDashboardUpload } from "./hooks/use-dashboard-upload.js";
import { NewProjectForm } from "./new-project-form.js";
import { PdfPageModal } from "./pdf-page-modal.js";
import { ProjectHistory } from "./project-history.js";
import { BusyOverlay } from "../../components/busy-overlay.js";
import { ui } from "../../lib/styles.js";

export default function HomePage() {
    const projects = useDashboardProjects();
    const upload = useDashboardUpload({
        refresh: projects.refresh,
        setMessage: projects.setMessage,
        setProcessingProjectId: projects.setProcessingProjectId,
        setToast: projects.setToast,
        setToastProject: projects.setToastProject,
    });

    return (
        <main className={ui.shell}>
            {projects.busyMessage && (
                <BusyOverlay message={projects.busyMessage} />
            )}
            <DashboardToast
                toast={projects.toast}
                toastProject={projects.toastProject}
                processingProjectId={projects.processingProjectId}
                setToast={projects.setToast}
                setToastProject={projects.setToastProject}
            />

            <section className={ui.layoutGrid}>
                <NewProjectForm
                    accountId={upload.accountId}
                    dragActive={upload.dragActive}
                    file={upload.file}
                    loading={upload.loading}
                    message={projects.message}
                    name={upload.name}
                    handleDrop={upload.handleDrop}
                    handleFileSelection={upload.handleFileSelection}
                    setAccountId={upload.setAccountId}
                    setDragActive={upload.setDragActive}
                    setName={upload.setName}
                    submit={upload.submit}
                />
                <ProjectHistory
                    filtered={projects.filtered}
                    projectsLoading={projects.projectsLoading}
                    query={projects.query}
                    renameValue={projects.renameValue}
                    renamingId={projects.renamingId}
                    refresh={projects.refresh}
                    removeProject={projects.removeProject}
                    saveRename={projects.saveRename}
                    setQuery={projects.setQuery}
                    setRenamingId={projects.setRenamingId}
                    setRenameValue={projects.setRenameValue}
                />
            </section>

            {upload.draftProjectId && (
                <PdfPageModal
                    loading={upload.loading}
                    pageUploadProgress={upload.pageUploadProgress}
                    pdfPages={upload.pdfPages}
                    selectedPages={upload.selectedPages}
                    closePdfModal={upload.closePdfModal}
                    processSelectedPdfPages={upload.processSelectedPdfPages}
                    togglePage={upload.togglePage}
                />
            )}
        </main>
    );
}
