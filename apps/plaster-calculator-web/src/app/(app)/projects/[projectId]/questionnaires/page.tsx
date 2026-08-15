"use client";

import {
    AddProjectQuestionnaireQuestionModal,
    AddQuestionsFromTemplateDrawer,
    GenerateQuestionnaireEmailModal,
    ProjectQuestionnaireQuestionList,
    useQuestionnairesTranslation,
} from "@libraries/plaster-calculator-ui";
import type { QuestionnaireTemplate } from "@libraries/plaster-calculator-ui";
import { useProjectsService } from "@libraries/plaster-calculator-web-core";
import { Box, Button, EmptyState } from "@libraries/uikit-web";
import { ClipboardList, FilePenLine, Mail, Plus, Sparkles } from "lucide-react";
import { use, useCallback, useEffect, useState } from "react";

import { ui } from "../../../../../lib/styles.js";
import type { ProjectDetail } from "../../../../../types.js";
import { ProjectHeader } from "../project-page-header.js";

import { useGenerateQuestionnaireEmailModal } from "./generate-questionnaire-email.hook.js";
import {
    useAddProjectQuestionnaireQuestionCallback,
    useAnswerQuestionnaireWithAiCallback,
    useApplyQuestionnaireTemplateCallback,
    useConfirmProjectQuestionnaireQuestionAnswerCallback,
    useProjectQuestionnaireQuestions,
    useQuestionnaireTemplates,
    useRemoveProjectQuestionnaireQuestionCallback,
    useSaveProjectQuestionnaireQuestionAnswerCallback,
} from "./page.hooks.js";
import { ProjectScopeEditor } from "./project-scope-editor.js";

export default function ProjectQuestionnairesPage({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = use(params);
    const { t } = useQuestionnairesTranslation();
    const projectsService = useProjectsService();
    const [project, setProject] = useState<ProjectDetail | null>(null);
    const [error, setError] = useState("");
    const [renaming, setRenaming] = useState(false);
    const [renameValue, setRenameValue] = useState("");
    const [isAddQuestionModalOpen, setAddQuestionModalOpen] = useState(false);
    const [isTemplateDrawerOpen, setTemplateDrawerOpen] = useState(false);
    const [applyingTemplateId, setApplyingTemplateId] = useState<string | null>(
        null,
    );
    const [isAddingQuestion, setAddingQuestion] = useState(false);
    const [isAutoFilling, setAutoFilling] = useState(false);

    const load = useCallback(async (): Promise<void> => {
        try {
            const detail = await projectsService.getProject(projectId);
            setProject(detail);
            setRenameValue(detail.name);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : t("projectQuestionnairesPage.unableToLoadProject"),
            );
        }
    }, [projectId, projectsService, t]);

    useEffect(() => {
        void load();
    }, [load]);

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
                err instanceof Error
                    ? err.message
                    : t("projectQuestionnairesPage.unableToRenameProject"),
            );
        }
    }

    const { questions } = useProjectQuestionnaireQuestions(projectId);
    const templates = useQuestionnaireTemplates();
    const addQuestion = useAddProjectQuestionnaireQuestionCallback(
        projectId,
        questions,
    );
    const applyTemplate = useApplyQuestionnaireTemplateCallback(
        projectId,
        questions,
    );
    const removeQuestion =
        useRemoveProjectQuestionnaireQuestionCallback(projectId);
    const saveAnswer =
        useSaveProjectQuestionnaireQuestionAnswerCallback(projectId);
    const confirmAnswer =
        useConfirmProjectQuestionnaireQuestionAnswerCallback(projectId);
    const answerWithAi = useAnswerQuestionnaireWithAiCallback(projectId);
    const emailModal = useGenerateQuestionnaireEmailModal(
        project?.companyId ?? null,
        questions,
    );

    async function handleAddQuestion(label: string): Promise<void> {
        setAddingQuestion(true);
        await addQuestion(label);
        setAddingQuestion(false);
        setAddQuestionModalOpen(false);
    }

    async function handleSelectTemplate(
        template: QuestionnaireTemplate,
    ): Promise<void> {
        setApplyingTemplateId(template.id);
        await applyTemplate(template);
        setApplyingTemplateId(null);
        setTemplateDrawerOpen(false);
    }

    async function handleAutoFill(): Promise<void> {
        setAutoFilling(true);
        await answerWithAi();
        setAutoFilling(false);
    }

    return (
        <>
            <ProjectHeader
                project={project}
                projectId={projectId}
                activeTab="questionnaires"
                renaming={renaming}
                renameValue={renameValue}
                saveRename={saveRename}
                setRenaming={setRenaming}
                setRenameValue={setRenameValue}
            />
            <Box padding="md" direction="column" gap="md">
                {error && <p className={ui.error}>{error}</p>}
                <Box direction="row" justify="end" gap="sm">
                    <Button
                        variant="secondary"
                        icon={<FilePenLine size={18} aria-hidden="true" />}
                    >
                        {t("projectQuestionnairesPage.draftScope")}
                    </Button>
                    <Button
                        variant="secondary"
                        icon={<Sparkles size={18} aria-hidden="true" />}
                        disabled={isAutoFilling || questions.length === 0}
                        onClick={() => void handleAutoFill()}
                    >
                        {isAutoFilling
                            ? t("projectQuestionnairesPage.autoFilling")
                            : t("projectQuestionnairesPage.autoFill")}
                    </Button>
                    <Button
                        variant="secondary"
                        icon={<Mail size={18} aria-hidden="true" />}
                        disabled={emailModal.disabled}
                        onClick={emailModal.openModal}
                    >
                        {t("projectQuestionnairesPage.generateEmail")}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setTemplateDrawerOpen(true)}
                    >
                        {t("addQuestionsFromTemplateDrawer.title")}
                    </Button>
                    <Button
                        icon={<Plus size={18} aria-hidden="true" />}
                        onClick={() => setAddQuestionModalOpen(true)}
                    >
                        {t("addProjectQuestionnaireQuestionModal.title")}
                    </Button>
                </Box>
                {questions.length === 0 ? (
                    <EmptyState
                        icon={<ClipboardList />}
                        title={t("projectQuestionnairesPage.emptyStateTitle")}
                        description={t(
                            "projectQuestionnairesPage.emptyStateDescription",
                        )}
                    />
                ) : (
                    <ProjectQuestionnaireQuestionList
                        questions={questions}
                        onSaveAnswer={(question, answer) =>
                            void saveAnswer(question, answer)
                        }
                        onRemove={(question) => void removeQuestion(question)}
                        onConfirmAnswer={(question) =>
                            void confirmAnswer(question)
                        }
                    />
                )}
                <ProjectScopeEditor
                    project={project}
                    projectId={projectId}
                    onSaved={(updatedProject) => setProject(updatedProject)}
                    onError={setError}
                />
            </Box>
            <AddProjectQuestionnaireQuestionModal
                open={isAddQuestionModalOpen}
                isSaving={isAddingQuestion}
                onClose={() => setAddQuestionModalOpen(false)}
                onAdd={(label) => void handleAddQuestion(label)}
            />
            <GenerateQuestionnaireEmailModal
                open={emailModal.isOpen}
                onClose={emailModal.closeModal}
                subject={emailModal.subject}
                body={emailModal.body}
                mailtoHref={emailModal.mailtoHref}
            />
            <AddQuestionsFromTemplateDrawer
                open={isTemplateDrawerOpen}
                templates={templates}
                applyingTemplateId={applyingTemplateId}
                onClose={() => setTemplateDrawerOpen(false)}
                onSelectTemplate={(template) =>
                    void handleSelectTemplate(template)
                }
            />
        </>
    );
}
