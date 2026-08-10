import { createTranslationResource } from "@ui/internationalization";

import { en } from "./en.ts";

export const zh = createTranslationResource(
    en,
    Object.freeze({
        common: Object.freeze({
            add: "添加",
            adding: "添加中…",
            cancel: "取消",
            removeQuestion: "移除问题 {{number}}",
            updatedAt: "更新于 {{time}}",
        }),
        addProjectQuestionnaireQuestionModal: Object.freeze({
            title: "添加问题",
            description: "为此项目的问卷添加自定义问题。",
            questionLabel: "问题",
        }),
        addQuestionsFromTemplateDrawer: Object.freeze({
            title: "从模板添加",
            description: "将模板中的问题复制到此项目的问卷中。",
            emptyStateTitle: "暂无模板",
            emptyStateDescription: "请先创建一个问卷模板，以便从中复制问题。",
        }),
        editQuestionnaireTemplateDrawer: Object.freeze({
            title: "编辑模板",
            description: "更新模板的名称和问题。",
            loading: "正在加载模板…",
            saveChanges: "保存更改",
        }),
        generateQuestionnaireEmailModal: Object.freeze({
            title: "生成工作范围邮件",
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
            description: "起草模板及其问题。",
        }),
        projectQuestionnaireQuestionList: Object.freeze({
            aiSuggested: "AI 建议",
            confirm: "确认",
            answerPlaceholder: "答案",
            answerLabel: "问题 {{number}} 的答案",
        }),
        questionnaireTemplateCard: Object.freeze({
            edit: "编辑",
            duplicateTemplate: "复制模板",
            deleteTemplate: "删除模板",
        }),
        questionnaireTemplateForm: Object.freeze({
            createTemplate: "创建模板",
            templateNameLabel: "模板名称",
            questionsTitle: "问题",
            questionsDescription: "添加此模板所包含的问题。",
            question: "问题 {{number}}",
            questionLabelFieldLabel: "标签",
            addQuestion: "添加问题",
        }),
    }),
);
