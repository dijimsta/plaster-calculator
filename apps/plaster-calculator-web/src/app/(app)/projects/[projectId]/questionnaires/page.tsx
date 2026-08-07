"use client";

import {
    AddProjectQuestionnaireQuestionModal,
    AddQuestionsFromTemplateDrawer,
    GenerateQuestionnaireEmailModal,
    ProjectQuestionnaireQuestionList,
} from "@libraries/plaster-calculator-ui";
import { Box, Button, EmptyState } from "@libraries/uikit-web";
import { ClipboardList, Mail, Plus, Sparkles } from "lucide-react";
import { use, useCallback, useEffect, useState } from "react";

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
import { getProject, renameProject } from "../../../../../lib/api.js";
import { ui } from "../../../../../lib/styles.js";
import { ProjectHeader } from "../project-page-header.js";

import type { ProjectDetail } from "../../../../../types.js";
import type { QuestionnaireTemplate } from "@libraries/plaster-calculator-ui";

export default function ProjectQuestionnairesPage({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) {
    const { projectId } = use(params);
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
            const detail = await getProject(projectId);
            setProject(detail);
            setRenameValue(detail.name);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Unable to load project",
            );
        }
    }, [projectId]);

    useEffect(() => {
        void load();
    }, [load]);

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
        project?.accountId ?? null,
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
                load={load}
                saveRename={saveRename}
                setRenaming={setRenaming}
                setRenameValue={setRenameValue}
            />
            <Box padding="md" direction="column" gap="md">
                {error && <p className={ui.error}>{error}</p>}
                <Box direction="row" justify="end" gap="sm">
                    <Button
                        variant="secondary"
                        icon={<Sparkles size={18} aria-hidden="true" />}
                        disabled={isAutoFilling || questions.length === 0}
                        onClick={() => void handleAutoFill()}
                    >
                        {isAutoFilling ? "Auto-filling…" : "Auto-fill"}
                    </Button>
                    <Button
                        variant="secondary"
                        icon={<Mail size={18} aria-hidden="true" />}
                        disabled={emailModal.disabled}
                        onClick={emailModal.openModal}
                    >
                        Generate email
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setTemplateDrawerOpen(true)}
                    >
                        Add from template
                    </Button>
                    <Button
                        icon={<Plus size={18} aria-hidden="true" />}
                        onClick={() => setAddQuestionModalOpen(true)}
                    >
                        Add question
                    </Button>
                </Box>
                {questions.length === 0 ? (
                    <EmptyState
                        icon={<ClipboardList />}
                        title="No questionnaire yet"
                        description="Add a question or copy them in from a template."
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
