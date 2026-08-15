import { createTranslationResource } from "@ui/internationalization";

import { en } from "./en.ts";

export const zh = createTranslationResource(
    en,
    Object.freeze({
        common: Object.freeze({
            add: "添加",
            adding: "添加中…",
            cancel: "取消",
            removeQuestion: "移除澄清项 {{number}}",
            updatedAt: "更新于 {{time}}",
        }),
        addProjectQuestionnaireQuestionModal: Object.freeze({
            title: "添加澄清项",
            description: "为此工作范围添加自定义澄清项。",
            questionLabel: "澄清项",
        }),
        addQuestionsFromTemplateDrawer: Object.freeze({
            title: "从模板添加澄清项",
            description: "将澄清模板中的澄清项复制到此工作范围中。",
            emptyStateTitle: "暂无澄清模板",
            emptyStateDescription: "请先创建澄清模板，再从中添加澄清项。",
        }),
        editQuestionnaireTemplateDrawer: Object.freeze({
            title: "编辑模板",
            description: "更新模板的名称和澄清项。",
            loading: "正在加载模板…",
            saveChanges: "保存更改",
        }),
        generateQuestionnaireEmailModal: Object.freeze({
            title: "生成澄清邮件",
            description: "查看生成的邮件，然后复制或在您的邮件客户端中打开它。",
            copyToClipboard: "复制到剪贴板",
            openInEmailClient: "在邮件客户端中打开",
            subjectLabel: "主题",
            bodyLabel: "正文",
            copiedTitle: "已复制到剪贴板",
            copiedDescription: "邮件正文已复制。",
        }),
        newQuestionnaireTemplateDrawer: Object.freeze({
            title: "新建模板",
            description: "起草模板及其澄清项。",
        }),
        projectQuestionnaireQuestionList: Object.freeze({
            aiSuggested: "AI 建议",
            confirm: "确认",
            answerPlaceholder: "答案",
            answerLabel: "澄清项 {{number}} 的答案",
        }),
        projectQuestionnairesPage: Object.freeze({
            unableToLoadProject: "无法加载项目",
            unableToRenameProject: "无法重命名项目",
            autoFilling: "正在平面图中查找答案…",
            autoFill: "在平面图中查找答案",
            draftScope: "起草工作范围",
            generateEmail: "生成邮件",
            emptyStateTitle: "暂无澄清项",
            emptyStateDescription: "添加澄清项或从模板复制澄清项。",
            scopeLabel: "工作范围",
            scopeDescription:
                "面向客户的协议，用于说明要开展的工作。之后将显示在报价单和发票上。",
            scopePlaceholder: "描述双方约定要开展的工作",
            saveScope: "保存工作范围",
            savingScope: "正在保存工作范围…",
            scopeSaved: "工作范围已保存。",
            unableToSaveScope: "无法保存工作范围",
        }),
        questionnairesPage: Object.freeze({
            description:
                "查看每个项目的工作范围，从平面图中解决澄清项，并记录约定的工作。",
            statusLabels: Object.freeze({
                NOT_STARTED: "未开始",
                IN_PROGRESS: "进行中",
                COMPLETED: "已完成",
            }),
            stats: Object.freeze({
                total: "工作范围总数",
                inProgress: "进行中",
                completed: "已完成",
            }),
            loading: "正在加载工作范围...",
            emptyStateTitle: "暂无工作范围",
            tableHeaders: Object.freeze({
                project: "项目",
                progress: "进度",
                status: "状态",
                updated: "更新时间",
            }),
            answeredSummary: "已确认 {{answeredCount}}/{{totalQuestions}}",
            answeredSummaryWithOpen:
                "已确认 {{answeredCount}}/{{totalQuestions}} – {{openCount}} 个待处理",
            answeredProgress: "{{projectName}} 已回答",
        }),
        questionnaireTemplatesPage: Object.freeze({
            description:
                "用于从项目平面图中查找答案的可复用澄清项集。您可以使用内置标准，也可以复制模板并进行自定义。",
            newTemplate: "新建澄清模板",
            emptyStateTitle: "暂无澄清模板",
            emptyStateDescription:
                "创建澄清模板，以定义应从项目平面图中回答的内容。",
            deleteDialogTitle: "删除澄清模板？",
            deleteDialogDescription: "此操作无法撤销。",
            delete: "删除",
            deleting: "正在删除...",
            deleteConfirmation: "“{{templateName}}”将被永久删除。",
        }),
        questionnaireTemplateCard: Object.freeze({
            edit: "编辑",
            duplicateTemplate: "复制澄清模板",
            deleteTemplate: "删除澄清模板",
        }),
        questionnaireTemplateForm: Object.freeze({
            createTemplate: "创建澄清模板",
            templateNameLabel: "澄清模板名称",
            questionsTitle: "澄清项",
            questionsDescription: "添加此模板所包含的澄清项。",
            question: "澄清项 {{number}}",
            questionLabelFieldLabel: "标签",
            addQuestion: "添加澄清项",
        }),
    }),
);
