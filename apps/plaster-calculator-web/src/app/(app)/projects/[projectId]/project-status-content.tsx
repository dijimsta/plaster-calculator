"use client";

import type {
    EditorInitialTool,
    PageValidationInput,
    ValidationIssue,
} from "@libraries/plaster-calculator-ui";
import {
    InspectorPanel,
    InspectorSection,
    Paragraph,
} from "@libraries/uikit-web";
import { default as DynamicModule } from "next/dynamic.js";
import type { ReactNode } from "react";

import { useAppTranslation } from "../../../../i18n/index.ts";
import { cx, ui } from "../../../../lib/styles.js";
import type { ProjectDetail } from "../../../../types.js";
import { ProjectCompanyPanel } from "../project-company-panel.js";

import { ProjectFollowUpPanel } from "./project-follow-up-panel.js";
import { ProjectPageTabs } from "./project-page-tabs.js";

const dynamic = DynamicModule.default;
const ProjectEditor = dynamic(
    () =>
        import("@libraries/plaster-calculator-ui").then(
            (module) => module.ProjectEditor,
        ),
    {
        ssr: false,
    },
);

interface ProjectStatusContentProps {
    readonly companyId: string | null;
    readonly analyzingPage: boolean;
    /**
     * A WORK-139 quote-readiness deep link's tool, applied once on the
     * editor's mount. `null`/`undefined` leaves tool selection at its
     * normal default.
     */
    readonly initialTool?: EditorInitialTool | null;
    readonly load: () => Promise<void>;
    readonly project: ProjectDetail;
    readonly salesStatusPanel: ReactNode;
    readonly saveCompany: () => Promise<void>;
    readonly savingCompany: boolean;
    readonly selectedPage: ProjectDetail["pages"][number] | null;
    readonly selectedPageId: string | null;
    readonly selectPage: (pageId: string) => Promise<void>;
    readonly setCompanyId: (companyId: string | null) => void;
    readonly setAnalyzingPage: (analyzing: boolean) => void;
    readonly switchingPage: boolean;
    readonly updateDraft: (pageId: string, draft: PageValidationInput) => void;
    readonly validationIssues: ValidationIssue[];
}

export function ProjectStatusContent({
    companyId,
    analyzingPage,
    initialTool,
    load,
    project,
    salesStatusPanel,
    saveCompany,
    savingCompany,
    selectedPage,
    selectedPageId,
    selectPage,
    setCompanyId,
    setAnalyzingPage,
    switchingPage,
    updateDraft,
    validationIssues,
}: ProjectStatusContentProps) {
    const { t } = useAppTranslation();

    const companyPanel = (
        <ProjectCompanyPanel
            companyId={project.companyId}
            draftCompanyId={companyId}
            isSaving={savingCompany}
            saveCompany={saveCompany}
            setDraftCompanyId={setCompanyId}
        />
    );

    const inspectorPanel = (
        <InspectorPanel>
            <InspectorSection
                title={t("projectStatusContent.statusSectionTitle")}
                defaultOpen
            >
                {salesStatusPanel}
            </InspectorSection>
            <InspectorSection
                title={t("projectStatusContent.companySectionTitle")}
                defaultOpen
            >
                {companyPanel}
            </InspectorSection>
        </InspectorPanel>
    );

    if (project.salesStatus === "QUOTE_SUBMITTED") {
        return (
            <section className={cx(ui.editorShell, "items-start")}>
                <ProjectFollowUpPanel projectId={project.id} />
                {inspectorPanel}
            </section>
        );
    }

    if (project.salesStatus === "WON") {
        return (
            <section className={cx(ui.editorShell, "items-start")}>
                <div className={cx(ui.panel, ui.stack)}>
                    <h2>{t("projectStatusContent.projectWon")}</h2>
                    <Paragraph textSize="sm" variant="muted">
                        Won project workflow placeholder. The next steps for
                        accepted work will be added here later.
                    </Paragraph>
                </div>
                {inspectorPanel}
            </section>
        );
    }

    if (project.salesStatus === "LOST") {
        return (
            <section className={cx(ui.editorShell, "items-start")}>
                <div className={cx(ui.panel, ui.stack)}>
                    <h2>{t("projectStatusContent.projectLost")}</h2>
                    <Paragraph textSize="sm" variant="muted">
                        Lost project workflow placeholder. Loss reasons can be
                        captured here later.
                    </Paragraph>
                </div>
                {inspectorPanel}
            </section>
        );
    }

    return (
        <>
            <ProjectPageTabs
                project={project}
                selectedPageId={selectedPageId}
                selectPage={selectPage}
                switchingPage={
                    switchingPage ||
                    analyzingPage ||
                    project.pages.some((page) => page.status === "PROCESSING")
                }
            />
            {selectedPage && (
                <ProjectEditor
                    project={project}
                    page={selectedPage}
                    onSaved={load}
                    onAnalyzingChange={setAnalyzingPage}
                    projectCompanyPanel={companyPanel}
                    salesStatusPanel={salesStatusPanel}
                    onDraftChange={updateDraft}
                    validationIssues={validationIssues.filter(
                        (issue) => issue.pageId === selectedPage.id,
                    )}
                    initialTool={initialTool}
                />
            )}
            {selectedPage?.processingError && (
                <p className={ui.error} role="alert">
                    Analysis failed: {selectedPage.processingError}
                </p>
            )}
            {project.pages.length === 0 && (
                <section className={ui.panel}>
                    Select PDF pages to begin annotation.
                </section>
            )}
        </>
    );
}
