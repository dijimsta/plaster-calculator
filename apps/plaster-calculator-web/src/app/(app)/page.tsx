"use client";

import { Alert, Box, Breadcrumb, PageHeading } from "@libraries/uikit-web";
import { Home } from "lucide-react";
import { useState } from "react";

import { useAppTranslation } from "../../i18n/index.ts";
import { ui } from "../../lib/styles.js";

import { DashboardStats } from "./dashboard-stats.js";
import { useDashboardOverview } from "./hooks/use-dashboard-overview.js";
import { useDashboardUpload } from "./hooks/use-dashboard-upload.js";
import { useFollowUpReminders } from "./hooks/use-follow-up-reminders.js";
import { NeedsAttentionPanel } from "./needs-attention-panel.js";
import { NeedsFollowUpPanel } from "./needs-follow-up-panel.js";
import { NewProjectForm } from "./new-project-form.js";
import { NewProjectWizard } from "./new-project-wizard.js";
import { RecentProjectsPanel } from "./recent-projects-panel.js";

export default function HomePage() {
    const { t } = useAppTranslation();
    const [message, setMessage] = useState("");
    const overview = useDashboardOverview();
    const upload = useDashboardUpload({
        refresh: overview.refresh,
        setMessage,
        setProcessingProjectId: overview.setProcessingProjectId,
    });
    const followUpReminders = useFollowUpReminders({
        projects: overview.allProjects,
    });

    return (
        <>
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
                <DashboardStats
                    activeProjectsCount={overview.activeProjectsCount}
                    awaitingBuilderCount={overview.awaitingBuilderCount}
                    readyToQuoteCount={overview.readyToQuoteCount}
                    companiesCount={overview.companiesCount}
                />
                {overview.processingProjectId && (
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
                        message={message}
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
                    <NeedsAttentionPanel
                        projects={overview.needsAttentionProjects}
                        loading={overview.panelsLoading}
                        activeProjectsCount={overview.activeProjectsCount}
                    />
                </section>
                <RecentProjectsPanel
                    projects={overview.recentProjects}
                    loading={overview.panelsLoading}
                />
                <NewProjectWizard upload={upload} progressMessage={message} />
            </Box>
        </>
    );
}
