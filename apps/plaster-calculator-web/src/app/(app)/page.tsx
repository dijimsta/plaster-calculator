"use client";

import {
    Alert,
    Box,
    Breadcrumb,
    BusyOverlay,
    PageHeading,
} from "@libraries/uikit-web";
import { Home } from "lucide-react";

import { useAppTranslation } from "../../i18n/index.ts";
import { ui } from "../../lib/styles.js";

import { useDashboardProjects } from "./hooks/use-dashboard-projects.js";
import { useDashboardUpload } from "./hooks/use-dashboard-upload.js";
import { useFollowUpReminders } from "./hooks/use-follow-up-reminders.js";
import { NeedsFollowUpPanel } from "./needs-follow-up-panel.js";
import { NewProjectForm } from "./new-project-form.js";
import { NewProjectWizard } from "./new-project-wizard.js";
import { ProjectHistory } from "./project-history.js";

export default function HomePage() {
    const { t } = useAppTranslation();
    const projects = useDashboardProjects();
    const upload = useDashboardUpload({
        refresh: projects.refresh,
        setMessage: projects.setMessage,
        setProcessingProjectId: projects.setProcessingProjectId,
    });
    const followUpReminders = useFollowUpReminders({
        projects: projects.filtered,
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
                    <PageHeading.Title>{t("home.title")}</PageHeading.Title>
                    <PageHeading.Description>
                        Create a project or continue working on a recent one.
                    </PageHeading.Description>
                </PageHeading.Content>
            </PageHeading>
            <Box direction="column" gap="lg" padding="md">
                <NeedsFollowUpPanel {...followUpReminders} />
                {projects.processingProjectId && (
                    <Alert
                        intent="info"
                        title={t("home.projectProcessingAlert.title")}
                    >
                        {t("home.projectProcessingAlert.description")}
                    </Alert>
                )}
                <section className={ui.layoutGrid}>
                    <NewProjectForm
                        companyCreatePending={upload.companyCreatePending}
                        companyId={upload.companyId}
                        dragActive={upload.dragActive}
                        file={upload.file}
                        loading={upload.loading}
                        message={projects.message}
                        name={upload.name}
                        handleDrop={upload.handleDrop}
                        handleFileSelection={upload.handleFileSelection}
                        onCompanyCreated={upload.handleCompanyCreated}
                        setCompanyCreatePending={upload.setCompanyCreatePending}
                        setCompanyId={upload.setCompanyId}
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
                <NewProjectWizard
                    upload={upload}
                    progressMessage={projects.message}
                />
            </Box>
        </>
    );
}
