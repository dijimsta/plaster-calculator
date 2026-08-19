"use client";

import type {
    EditorInitialTool,
    PageValidationInput,
    ValidationIssue,
} from "@libraries/plaster-calculator-ui";
import {
    Heading2,
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
import { ProjectPagePickerPanel } from "./project-page-picker-panel.js";
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

type PageNavigationInput = {
    readonly project: ProjectDetail;
    readonly selectedPageId: string | null;
    readonly selectPage: (pageId: string) => Promise<void>;
    readonly switchingPage: boolean;
};

/**
 * The standalone page-tab row is a full-screen-only concern: it disappears
 * once the floorplan editor takes over page switching via its drawer's
 * `pagePickerPanel` slot instead.
 */
function computePageTabs(
    input: PageNavigationInput & { readonly floorplanFullScreen: boolean },
): ReactNode {
    if (input.floorplanFullScreen) return null;
    return (
        <ProjectPageTabs
            project={input.project}
            selectedPageId={input.selectedPageId}
            selectPage={input.selectPage}
            switchingPage={input.switchingPage}
        />
    );
}

/**
 * Mirrors `ProjectPageTabs`'s own single-page guard so the editor drawer
 * doesn't grow an empty "Pages" section when there's nothing to switch
 * between.
 */
function computePagePickerPanel(input: PageNavigationInput): ReactNode {
    if (input.project.pages.length <= 1) return undefined;
    return (
        <ProjectPagePickerPanel
            project={input.project}
            selectedPageId={input.selectedPageId}
            selectPage={input.selectPage}
            switchingPage={input.switchingPage}
        />
    );
}

/**
 * The full-screen editor's `fixed inset-0 z-30` shell covers the app's
 * normal document flow, so the analysis-failure banner needs a fixed,
 * above-the-shell treatment while full screen is active instead of its
 * usual in-flow styling.
 */
function computeErrorBannerClassName(floorplanFullScreen: boolean): string {
    return cx(ui.error, floorplanFullScreen && ui.errorFullScreen);
}

type ProjectStatusContentProps = {
    readonly companyId: string | null;
    readonly analyzingPage: boolean;
    /**
     * A WORK-139 quote-readiness deep link's tool, applied once on the
     * editor's mount. `null`/`undefined` leaves tool selection at its
     * normal default.
     */
    readonly initialTool?: EditorInitialTool | null;
    /** Whether the floorplan editor is currently in full-screen mode. */
    readonly floorplanFullScreen: boolean;
    readonly load: () => Promise<void>;
    /** Notified whenever the floorplan editor's full-screen mode changes. */
    readonly onFullScreenChange: (fullScreen: boolean) => void;
    readonly project: ProjectDetail;
    readonly salesStatusPanel: ReactNode;
    readonly saveCompany: (companyId?: string) => Promise<void>;
    readonly savingCompany: boolean;
    readonly selectedPage: ProjectDetail["pages"][number] | null;
    readonly selectedPageId: string | null;
    readonly selectPage: (pageId: string) => Promise<void>;
    readonly setCompanyId: (companyId: string | null) => void;
    readonly setAnalyzingPage: (analyzing: boolean) => void;
    readonly switchingPage: boolean;
    readonly updateDraft: (pageId: string, draft: PageValidationInput) => void;
    readonly validationIssues: ValidationIssue[];
};

export function ProjectStatusContent({
    companyId,
    analyzingPage,
    floorplanFullScreen,
    initialTool,
    load,
    onFullScreenChange,
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
                    <Heading2>{t("projectStatusContent.projectWon")}</Heading2>
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
                    <Heading2>{t("projectStatusContent.projectLost")}</Heading2>
                    <Paragraph textSize="sm" variant="muted">
                        Lost project workflow placeholder. Loss reasons can be
                        captured here later.
                    </Paragraph>
                </div>
                {inspectorPanel}
            </section>
        );
    }

    const pageSwitchDisabled =
        switchingPage ||
        analyzingPage ||
        project.pages.some((page) => page.status === "PROCESSING");
    const pageNavigationInput: PageNavigationInput = {
        project,
        selectedPageId,
        selectPage,
        switchingPage: pageSwitchDisabled,
    };
    const pageTabs = computePageTabs({
        ...pageNavigationInput,
        floorplanFullScreen,
    });
    const pagePickerPanel = computePagePickerPanel(pageNavigationInput);

    return (
        <>
            {pageTabs}
            {selectedPage && (
                <ProjectEditor
                    project={project}
                    page={selectedPage}
                    onSaved={load}
                    onAnalyzingChange={setAnalyzingPage}
                    projectCompanyPanel={companyPanel}
                    salesStatusPanel={salesStatusPanel}
                    pagePickerPanel={pagePickerPanel}
                    onFullScreenChange={onFullScreenChange}
                    onDraftChange={updateDraft}
                    validationIssues={validationIssues.filter(
                        (issue) => issue.pageId === selectedPage.id,
                    )}
                    initialTool={initialTool}
                />
            )}
            {selectedPage?.processingError && (
                <p
                    className={computeErrorBannerClassName(floorplanFullScreen)}
                    role="alert"
                >
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
