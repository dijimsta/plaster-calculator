"use client";

import { default as DynamicModule } from "next/dynamic.js";

import { cx, ui } from "../../../../lib/styles.js";
import { ProjectAccountPanel } from "../project-account-panel.js";
import { ProjectPageTabs } from "./project-page-tabs.js";

import type {
    PageValidationInput,
    ValidationIssue,
} from "../../../../lib/validation.js";
import type { ProjectDetail } from "../../../../types.js";

const dynamic = DynamicModule.default;
const ProjectEditor = dynamic(
    () =>
        import("../../../../components/project-editor/index.js").then(
            (module) => module.ProjectEditor,
        ),
    {
        ssr: false,
    },
);

interface ProjectStatusContentProps {
    readonly accountId: string | null;
    readonly load: () => Promise<void>;
    readonly project: ProjectDetail;
    readonly saveAccount: () => Promise<void>;
    readonly savingAccount: boolean;
    readonly selectedPage: ProjectDetail["pages"][number] | null;
    readonly selectedPageId: string | null;
    readonly selectPage: (pageId: string) => Promise<void>;
    readonly setAccountId: (accountId: string | null) => void;
    readonly switchingPage: boolean;
    readonly updateDraft: (pageId: string, draft: PageValidationInput) => void;
    readonly validationIssues: ValidationIssue[];
}

export function ProjectStatusContent({
    accountId,
    load,
    project,
    saveAccount,
    savingAccount,
    selectedPage,
    selectedPageId,
    selectPage,
    setAccountId,
    switchingPage,
    updateDraft,
    validationIssues,
}: ProjectStatusContentProps) {
    if (project.salesStatus === "QUOTE_SUBMITTED") {
        return (
            <section className={cx(ui.editorShell, "items-start")}>
                <div className={cx(ui.panel, ui.stack)}>
                    <h2>Quote follow-up</h2>
                    <p className={ui.muted}>
                        Reminder workflow placeholder. Follow-up reminders will
                        be configured here later.
                    </p>
                </div>
                <ProjectAccountPanel
                    accountId={project.accountId}
                    draftAccountId={accountId}
                    isSaving={savingAccount}
                    saveAccount={saveAccount}
                    setDraftAccountId={setAccountId}
                />
            </section>
        );
    }

    if (project.salesStatus === "WON") {
        return (
            <ProjectPlaceholder title="Project won">
                Won project workflow placeholder. The next steps for accepted
                work will be added here later.
            </ProjectPlaceholder>
        );
    }

    if (project.salesStatus === "LOST") {
        return (
            <ProjectPlaceholder title="Project lost">
                Lost project workflow placeholder. Loss reasons can be captured
                here later.
            </ProjectPlaceholder>
        );
    }

    return (
        <>
            <ProjectPageTabs
                project={project}
                selectedPageId={selectedPageId}
                selectPage={selectPage}
                switchingPage={switchingPage}
            />
            {selectedPage && (
                <ProjectEditor
                    project={project}
                    page={selectedPage}
                    onSaved={load}
                    projectAccountPanel={
                        <ProjectAccountPanel
                            accountId={project.accountId}
                            draftAccountId={accountId}
                            isSaving={savingAccount}
                            saveAccount={saveAccount}
                            setDraftAccountId={setAccountId}
                        />
                    }
                    onDraftChange={updateDraft}
                    validationIssues={validationIssues.filter(
                        (issue) => issue.pageId === selectedPage.id,
                    )}
                />
            )}
            {project.pages.length === 0 && (
                <section className={ui.panel}>
                    This project has not been processed yet.
                </section>
            )}
        </>
    );
}

function ProjectPlaceholder({
    children,
    title,
}: {
    readonly children: string;
    readonly title: string;
}) {
    return (
        <section
            className={cx(
                ui.panel,
                ui.stack,
                "mx-auto w-[min(960px,calc(100vw-48px))]",
            )}
        >
            <h2>{title}</h2>
            <p className={ui.muted}>{children}</p>
        </section>
    );
}
