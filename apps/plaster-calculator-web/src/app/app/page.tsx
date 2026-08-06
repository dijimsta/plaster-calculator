"use client";

import { Alert, Box, Breadcrumb, PageHeading } from "@libraries/uikit-web";
import { Home } from "lucide-react";

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
    });

    return (
        <>
            {projects.busyMessage && (
                <BusyOverlay message={projects.busyMessage} />
            )}
            <PageHeading>
                <PageHeading.Breadcrumbs>
                    <Breadcrumb>
                        <Breadcrumb.Item current>
                            <Home size={16} aria-label="Home" />
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>Home</PageHeading.Title>
                    <PageHeading.Description>
                        Create a project or continue working on a recent one.
                    </PageHeading.Description>
                </PageHeading.Content>
            </PageHeading>
            <Box direction="column" gap="lg" padding="md">
                {projects.processingProjectId && (
                    <Alert intent="info" title="Project processing">
                        This list will update automatically when processing is
                        complete.
                    </Alert>
                )}
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
                        activeSalesStatus={projects.activeSalesStatus}
                        filtered={projects.filtered}
                        projectsLoading={projects.projectsLoading}
                        query={projects.query}
                        renameValue={projects.renameValue}
                        renamingId={projects.renamingId}
                        refresh={projects.refresh}
                        removeProject={projects.removeProject}
                        saveRename={projects.saveRename}
                        setActiveSalesStatus={projects.setActiveSalesStatus}
                        setQuery={projects.setQuery}
                        setRenamingId={projects.setRenamingId}
                        setRenameValue={projects.setRenameValue}
                    />
                </section>
                {upload.draftProjectId && (
                    <PdfPageModal
                        errorMessage={upload.pdfPageError}
                        loading={upload.loading}
                        pageUploadProgress={upload.pageUploadProgress}
                        pdfPages={upload.pdfPages}
                        selectedPages={upload.selectedPages}
                        closePdfModal={upload.closePdfModal}
                        processSelectedPdfPages={upload.processSelectedPdfPages}
                        togglePage={upload.togglePage}
                    />
                )}
            </Box>
        </>
    );
}
