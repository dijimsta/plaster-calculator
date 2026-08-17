export const en = Object.freeze({
    common: Object.freeze({
        add: "Add",
        adding: "Adding...",
        cancel: "Cancel",
        removeQuestion: "Remove clarification {{number}}",
        updatedAt: "Updated {{time}}",
    }),
    addProjectQuestionnaireQuestionModal: Object.freeze({
        title: "Add clarification",
        description: "Add a custom clarification to this scope of work.",
        questionLabel: "Clarification",
    }),
    addQuestionsFromTemplateDrawer: Object.freeze({
        title: "Add clarifications from template",
        description:
            "Copy a clarification template's clarifications into this scope of work.",
        emptyStateTitle: "No clarification templates yet",
        emptyStateDescription:
            "Create a clarification template before adding clarifications from it.",
    }),
    clarificationsStep: Object.freeze({
        templatePicker: Object.freeze({
            label: "Start from a template",
            startFromScratch: "Start from scratch",
            apply: "Apply template",
            applying: "Applying template…",
        }),
        rows: Object.freeze({
            labelFieldLabel: "Clarification {{number}}",
            sheetReference: "Found on {{sheet}}",
            addRowPlaceholder: "Add your own clarification",
            statusLabels: Object.freeze({
                ON_PLAN: "On plan",
                UNCHECKED: "Unchecked",
                ASK_BUILDER: "Ask builder",
            }),
        }),
        emptyState: Object.freeze({
            title: "No clarifications yet",
            description:
                "Start from a template above, or add your own clarification below.",
        }),
        findAnswers: Object.freeze({
            action: "Find Answers on Plan",
            running: "Finding answers on plan…",
            creditCost_one: "Uses {{count}} credit",
            creditCost_other: "Uses {{count}} credits",
        }),
        emailCard: Object.freeze({
            title: "Email the builder",
            descriptionBeforeRun_one:
                "{{count}} clarification for the builder.",
            descriptionBeforeRun_other:
                "{{count}} clarifications for the builder.",
            descriptionAfterRun_one:
                "{{count}} clarification still needs the builder's input.",
            descriptionAfterRun_other:
                "{{count}} clarifications still need the builder's input.",
            send: "Email the builder",
            resend: "Resend email",
            sentConfirmation: "Email sent",
        }),
    }),
    editQuestionnaireTemplateDrawer: Object.freeze({
        title: "Edit template",
        description: "Update the template's name and clarifications.",
        loading: "Loading template…",
        saveChanges: "Save changes",
    }),
    generateQuestionnaireEmailModal: Object.freeze({
        title: "Generate clarification email",
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
        description: "Draft a template and its clarifications.",
    }),
    projectQuestionnaireQuestionList: Object.freeze({
        aiSuggested: "AI suggested",
        confirm: "Confirm",
        answerPlaceholder: "Answer",
        answerLabel: "Answer for clarification {{number}}",
    }),
    projectQuestionnairesPage: Object.freeze({
        unableToLoadProject: "Unable to load project",
        unableToRenameProject: "Unable to rename project",
        autoFilling: "Finding answers on plan…",
        autoFill: "Find Answers on Plan",
        draftScope: "Draft Scope",
        generateEmail: "Generate email",
        emptyStateTitle: "No clarifications yet",
        emptyStateDescription:
            "Add a clarification or copy clarifications from a template.",
        scopeLabel: "Scope",
        scopeDescription:
            "The client-facing agreement describing the work to be carried out. This will be available on quotes and invoices later.",
        scopePlaceholder: "Describe the agreed work to be carried out",
        saveScope: "Save Scope",
        savingScope: "Saving Scope…",
        scopeSaved: "Scope saved.",
        unableToSaveScope: "Unable to save Scope",
    }),
    questionnairesPage: Object.freeze({
        description:
            "Review each project's scope of work, resolve clarifications from the plan and record the agreed work.",
        statusLabels: Object.freeze({
            NOT_STARTED: "Not started",
            IN_PROGRESS: "In progress",
            COMPLETED: "Completed",
        }),
        stats: Object.freeze({
            total: "Total scopes of work",
            inProgress: "In progress",
            completed: "Completed",
        }),
        loading: "Loading scopes of work...",
        emptyStateTitle: "No scopes of work yet",
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
            "Reusable clarification sets for finding answers on a project's plan. Use the built-in standards or duplicate a template to make your own.",
        newTemplate: "New Clarification Template",
        emptyStateTitle: "No clarification templates yet",
        emptyStateDescription:
            "Create a clarification template to define what should be answered from a project's plan.",
        deleteDialogTitle: "Delete clarification template?",
        deleteDialogDescription: "This action cannot be undone.",
        delete: "Delete",
        deleting: "Deleting...",
        deleteConfirmation: "“{{templateName}}” will be permanently deleted.",
    }),
    questionnaireTemplateCard: Object.freeze({
        edit: "Edit",
        duplicateTemplate: "Duplicate clarification template",
        deleteTemplate: "Delete clarification template",
    }),
    questionnaireTemplateForm: Object.freeze({
        createTemplate: "Create clarification template",
        templateNameLabel: "Clarification template name",
        questionsTitle: "Clarifications",
        questionsDescription: "Add the clarifications this template asks.",
        question: "Clarification {{number}}",
        questionLabelFieldLabel: "Label",
        addQuestion: "Add clarification",
    }),
    saveQuestionnaireTemplateFromProjectModal: Object.freeze({
        title: "Save as clarification template",
        description:
            "Save this project's clarifications as a reusable clarification template.",
        nameLabel: "Clarification template name",
        duplicateNameWarning:
            "A clarification template with this name already exists. Saving will create a second template with the same name.",
        questionsLabel: "Clarifications",
        clarificationCount_one: "{{count}} clarification",
        clarificationCount_other: "{{count}} clarifications",
        answersStayOnProject: "Answers stay on this project.",
        addedOnProject: "Added on this project",
        save: "Save template",
        saving: "Saving...",
    }),
});
