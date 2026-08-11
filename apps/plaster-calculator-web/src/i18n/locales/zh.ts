import { createTranslationResource } from "@ui/internationalization";

import { en } from "./en.ts";

export const zh = createTranslationResource(
    en,
    Object.freeze({
        common: Object.freeze({}),
        sidebar: Object.freeze({
            navigationLabel: "应用导航",
            workspaceSectionTitle: "工作区",
            navLabels: Object.freeze({
                home: "首页",
                projects: "项目",
                questionnaires: "问卷",
                quotes: "报价",
                companies: "公司",
            }),
            userFallback: "用户",
            logOut: "退出登录",
        }),
        companySelect: Object.freeze({
            label: "公司",
            placeholder: "搜索公司",
            unableToLoadCompanies: "无法加载公司",
            clearCompany: "清除公司",
            noCompanyDetails: "暂无公司详情",
        }),
        themeSettingsControl: Object.freeze({
            legend: "颜色主题",
            modeLabels: Object.freeze({
                system: "系统",
                light: "浅色",
                dark: "深色",
            }),
        }),
        languageSettingsControl: Object.freeze({
            legend: "语言",
            languageLabels: Object.freeze({
                en: "English",
                zh: "中文",
            }),
        }),
        home: Object.freeze({
            title: "首页",
            projectProcessingAlert: Object.freeze({
                title: "项目处理中",
                description: "处理完成后此列表将自动更新。",
            }),
        }),
        projects: Object.freeze({
            breadcrumb: "项目",
            title: "项目",
            statusTabs: Object.freeze({
                all: "全部",
            }),
            loadingProjects: "正在加载项目...",
            refresh: "刷新",
            refreshTitle: "刷新项目",
            emptyStateTitle: "没有符合筛选条件的项目",
            tableHeaders: Object.freeze({
                project: "项目",
                company: "公司",
                plan: "平面图",
                status: "状态",
                updated: "更新时间",
                actions: "操作",
            }),
        }),
        questionnaires: Object.freeze({
            title: "问卷",
            projectsTab: "项目",
            templatesTab: "模板",
        }),
        quotes: Object.freeze({
            title: "报价",
            allQuotesTab: "全部报价",
            templateTab: "报价模板",
        }),
        projectHistory: Object.freeze({
            noStatusProjects: "没有{{status}}的项目",
        }),
        projectPage: Object.freeze({
            confirmStatusChange: "将状态更改为{{status}}？",
            statusChanged: "状态已更改为{{status}}。",
        }),
        projectHeader: Object.freeze({
            projectFallback: "项目",
            detailsAriaLabel: "项目详情",
            loading: "加载中...",
            floorplanTab: "平面图",
            renameProject: "重命名项目",
        }),
        projectStatusContent: Object.freeze({
            statusSectionTitle: "状态",
            companySectionTitle: "公司",
            projectWon: "项目已成交",
            projectLost: "项目已流失",
        }),
        salesStatus: Object.freeze({
            label: "销售状态",
            statusLabels: Object.freeze({
                QUOTING: "报价中",
                QUOTE_SUBMITTED: "已提交报价",
                WON: "已成交",
                LOST: "已流失",
            }),
        }),
    }),
);
