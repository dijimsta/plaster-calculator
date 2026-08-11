export const en = Object.freeze({
    common: Object.freeze({
        add: "Add",
        adding: "Adding...",
        cancel: "Cancel",
        removeQuestion: "Remove question {{number}}",
        updatedAt: "Updated {{time}}",
    }),
    addProjectQuestionnaireQuestionModal: Object.freeze({
        title: "Add question",
        description: "Add a custom question to this project's questionnaire.",
        questionLabel: "Question",
    }),
    addQuestionsFromTemplateDrawer: Object.freeze({
        title: "Add from template",
        description:
            "Copy a template's questions into this project's questionnaire.",
        emptyStateTitle: "No templates yet",
        emptyStateDescription:
            "Create a questionnaire template first to copy questions from it.",
    }),
    editQuestionnaireTemplateDrawer: Object.freeze({
        title: "Edit template",
        description: "Update the template's name and questions.",
        loading: "Loading template…",
        saveChanges: "Save changes",
    }),
    generateQuestionnaireEmailModal: Object.freeze({
        title: "Generate scope of work email",
        description:
            "Review the generated email, then copy it or open it in your email client.",
        copyToClipboard: "Copy to clipboard",
        openInEmailClient: "Open in email client",
        subjectLabel: "Subject",
        bodyLabel: "Body",
        copiedTitle: "Copied to clipboard",
        copiedDescription: "The email body has been copied.",
    }),
    newQuestionnaireTemplateDrawer: Object.freeze({
        title: "New template",
        description: "Draft a template and its questions.",
    }),
    projectQuestionnaireQuestionList: Object.freeze({
        aiSuggested: "AI suggested",
        confirm: "Confirm",
        answerPlaceholder: "Answer",
        answerLabel: "Answer for question {{number}}",
    }),
    projectQuestionnairesPage: Object.freeze({
        unableToLoadProject: "Unable to load project",
        unableToRenameProject: "Unable to rename project",
        autoFilling: "Auto-filling…",
        autoFill: "Auto-fill",
        generateEmail: "Generate email",
        emptyStateTitle: "No questionnaire yet",
        emptyStateDescription:
            "Add a question or copy them in from a template.",
    }),
    questionnairesPage: Object.freeze({
        description:
            "Every project's scope questionnaire in one place. Open one to auto-fill, confirm answers and chase the builder for what's missing.",
        statusLabels: Object.freeze({
            NOT_STARTED: "Not started",
            IN_PROGRESS: "In progress",
            COMPLETED: "Completed",
        }),
        stats: Object.freeze({
            total: "Total questionnaires",
            inProgress: "In progress",
            completed: "Completed",
        }),
        loading: "Loading questionnaires...",
        emptyStateTitle: "No questionnaires yet",
        tableHeaders: Object.freeze({
            project: "Project",
            progress: "Progress",
            status: "Status",
            updated: "Updated",
        }),
        answeredSummary: "{{answeredCount}} of {{totalQuestions}} confirmed",
        answeredSummaryWithOpen:
            "{{answeredCount}} of {{totalQuestions}} confirmed – {{openCount}} open",
        answeredProgress: "{{projectName}} answered",
    }),
    questionnaireTemplatesPage: Object.freeze({
        description:
            "The question sets the AI fills in when you auto-fill a project. Use the built-in standards or duplicate a template to make your own.",
        newTemplate: "New Template",
        emptyStateTitle: "No templates yet",
        emptyStateDescription:
            "Create a template to define the questions the AI fills in when auto-filling a project.",
        deleteDialogTitle: "Delete template?",
        deleteDialogDescription: "This action cannot be undone.",
        delete: "Delete",
        deleting: "Deleting...",
        deleteConfirmation: "“{{templateName}}” will be permanently deleted.",
    }),
    questionnaireTemplateCard: Object.freeze({
        edit: "Edit",
        duplicateTemplate: "Duplicate template",
        deleteTemplate: "Delete template",
    }),
    questionnaireTemplateForm: Object.freeze({
        createTemplate: "Create template",
        templateNameLabel: "Template name",
        questionsTitle: "Questions",
        questionsDescription: "Add the questions this template asks.",
        question: "Question {{number}}",
        questionLabelFieldLabel: "Label",
        addQuestion: "Add question",
    }),
});
