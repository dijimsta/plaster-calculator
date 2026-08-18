// Split out of `../zh.ts` for the same reason as `../en/readiness.ts` -- see
// that file's doc comment.
export const readinessSummaryHeader = Object.freeze({
    readyTitle: "可以生成报价",
    notReadyTitle: "尚不能生成报价",
    readyDescription: "该方案已可以生成报价。",
    // zh has a single plural form (CLDR "other"); `_one` mirrors
    // `_other` verbatim rather than being left as an English
    // fallback, since i18next still requires the key to exist.
    notReadyDescription_one: "还有 {{count}} 项检查需要处理才能生成报价。",
    notReadyDescription_other: "还有 {{count}} 项检查需要处理才能生成报价。",
    readyBadge: "已就绪",
    unmetBadge: "{{count}} 项未通过",
    generateQuote: "生成报价",
    disabledReason: "请先解决下方的检查项以启用此操作。",
});

export const readinessCheckList = Object.freeze({
    metBadge: "已通过",
    unmetBadge: "{{count}} 项未通过",
    showCompletedChecks: "显示已完成的检查（{{count}} 项）",
    hideCompletedChecks: "隐藏已完成的检查",
    fixInline: "请在下方直接处理。",
    fixDeepLink: "请前往关联页面处理，然后返回此处。",
    hideAffectedItems: "隐藏受影响项目",
    // Same single-plural-form note as notReadyDescription above.
    showAffectedItems_one: "显示 {{count}} 个受影响项目",
    showAffectedItems_other: "显示 {{count}} 个受影响项目",
    defaultAffectedItemLocation: "该项目",
    pageLocation: "第 {{pageNumber}} 页",
    pageLocationWithArea: "第 {{pageNumber}} 页 — {{areaLabel}}",
    companyLocation: "{{companyName}}",
    checkLabels: Object.freeze({
        SCALE_APPLIED: "已设置比例",
        ROOMS_MEASURED: "房间已测量",
        WALL_TYPE_SET: "已设置墙板类型",
        CEILING_HEIGHT_SET: "已设置天花板高度",
        TEMPLATE_HAS_ENABLED_ITEMS: "报价模板已启用项目",
        TEMPLATE_PRICED: "模板已定价",
        TEMPLATE_UNIT_SET: "模板单位已设置",
        INFERRED_ANSWERS_CONFIRMED: "已确认推断答案",
        ASSUMED_WALL_TYPES_CONFIRMED: "已确认假定墙板类型",
        COMPANY_CONTACT_DETAILS: "已添加公司联系方式",
    }),
});

export const readinessFixControls = Object.freeze({
    save: "保存",
    saving: "正在保存…",
    confirm: "确认",
    confirming: "正在确认…",
    wallBoardType: Object.freeze({
        label: "墙板类型",
        labelWithArea: "墙板类型 — {{area}}",
        error: "无法更新墙板类型，请重试。",
    }),
    ceilingHeight: Object.freeze({
        label: "天花板高度",
        labelWithArea: "天花板高度 — {{area}}",
        suggestion:
            "建议的天花板高度：{{height}} 毫米。请检查后保存以应用此值。",
        error: "无法更新天花板高度，请重试。",
    }),
    unitPrice: Object.freeze({
        label: "单价",
        labelWithTemplate: "单价 — {{template}}",
        error: "无法更新单价，请重试。",
    }),
    confirmError: "无法确认，请重试。",
    setTemplateUnits: "设置模板单位",
    manageQuoteItems: "管理报价项目",
    confirmAccessibleLabelWithLocation:
        "确认{{location}}的{{label}}“{{value}}”",
    confirmAccessibleLabel: "确认{{label}}“{{value}}”",
    floorplanDeepLink: Object.freeze({
        setScale: "设置比例",
        drawRooms: "绘制房间",
        actionWithPage: "在第 {{pageNumber}} 页{{action}}",
    }),
    companyContactDetails: Object.freeze({
        addContactDetails: "添加联系方式",
    }),
});
