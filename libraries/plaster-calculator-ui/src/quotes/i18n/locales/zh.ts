import { createTranslationResource } from "@ui/internationalization";

import { en } from "./en.ts";

export const zh = createTranslationResource(
    en,
    Object.freeze({
        common: Object.freeze({
            cancel: "取消",
        }),
        quotesPage: Object.freeze({
            description: "价格设置完成后，可在此查看根据项目生成的所有报价。",
            emptyStateTitle: "暂无报价",
            emptyStateDescription: "价格设置完成后，系统将根据项目生成报价。",
        }),
        quoteTemplatePage: Object.freeze({
            description: "生成项目报价时使用的默认项目和价格。",
        }),
        quoteTemplatePanel: Object.freeze({
            title: "报价模板",
            description:
                "调整默认项目价格，并添加应出现在每份报价单中的自定义项目。",
            loading: "正在加载报价模板...",
            saveSuccessTitle: "报价模板已保存",
            saveSuccessDescription: "您的更改已保存。",
            saveErrorTitle: "无法保存报价模板",
            saveErrorDescription: "保存时出现问题，请重试。",
        }),
        quoteTemplateForm: Object.freeze({
            defaultItemsTitle: "默认项目",
            defaultItemsDescription:
                "每份报价单都包含的内置项目。您可以为团队调整价格。",
            customItemsTitle: "自定义项目",
            customItemsDescription:
                "添加您自己的项目，并选择它们何时包含在报价单中。",
            priceLabel: "价格",
            itemNameLabel: "项目名称",
            includeOnQuotesLabel: "包含在报价单中",
            includeWhenKeywordsMatch: "关键词匹配时包含",
            includeByDefault: "默认包含",
            dontIncludeByDefault: "默认不包含",
            keywordsLabel: "关键词",
            keywordsPlaceholder: "用逗号分隔关键词",
            addItem: "添加项目",
            removeItem: "移除项目 {{number}}",
            saveChanges: "保存更改",
            saving: "正在保存...",
            quantitySourceDescription: Object.freeze({
                PLASTERBOARD_10MM_WALLS: "根据墙面面积计算",
                VILLABOARD_6MM_WET_WALLS: "根据湿区墙面面积计算",
                PLASTERBOARD_10MM_CEILINGS: "根据天花板面积计算",
                COVE_CORNICE_90MM: "根据墙面与天花板交接线长度计算",
                FC_SHEET_15MM_WET_FLOORS: "根据湿区地面面积计算",
                EZY_JAMB_DOOR_SETS: "根据门套数量计算",
            }),
        }),
        readinessSummaryHeader: Object.freeze({
            readyTitle: "可以生成报价",
            notReadyTitle: "尚不能生成报价",
            readyDescription: "该方案已可以生成报价。",
            // zh has a single plural form (CLDR "other"); `_one` mirrors
            // `_other` verbatim rather than being left as an English
            // fallback, since i18next still requires the key to exist.
            notReadyDescription_one:
                "还有 {{count}} 项检查需要处理才能生成报价。",
            notReadyDescription_other:
                "还有 {{count}} 项检查需要处理才能生成报价。",
            readyBadge: "已就绪",
            unmetBadge: "{{count}} 项未通过",
            generateQuote: "生成报价",
            disabledReason: "请先解决下方的检查项以启用此操作。",
        }),
        readinessCheckList: Object.freeze({
            metBadge: "已通过",
            unmetBadge: "{{count}} 项未通过",
            fixInline: "请在下方直接处理。",
            fixDeepLink: "请前往关联页面处理，然后返回此处。",
            hideAffectedItems: "隐藏受影响项目",
            // Same single-plural-form note as notReadyDescription above.
            showAffectedItems_one: "显示 {{count}} 个受影响项目",
            showAffectedItems_other: "显示 {{count}} 个受影响项目",
            defaultAffectedItemLocation: "该项目",
            pageLocation: "第 {{pageNumber}} 页",
            pageLocationWithArea: "第 {{pageNumber}} 页 — {{areaLabel}}",
            checkLabels: Object.freeze({
                SCALE_APPLIED: "已设置比例",
                ROOMS_MEASURED: "房间已测量",
                WALL_TYPE_SET: "已设置墙板类型",
                CEILING_HEIGHT_SET: "已设置天花板高度",
                TEMPLATE_PRICED: "模板已定价",
                INFERRED_ANSWERS_CONFIRMED: "已确认推断答案",
                ASSUMED_WALL_TYPES_CONFIRMED: "已确认假定墙板类型",
            }),
        }),
        readinessFixControls: Object.freeze({
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
                error: "无法更新天花板高度，请重试。",
            }),
            unitPrice: Object.freeze({
                label: "单价",
                labelWithTemplate: "单价 — {{template}}",
                error: "无法更新单价，请重试。",
            }),
            confirmError: "无法确认，请重试。",
            confirmAccessibleLabelWithLocation:
                "确认{{location}}的{{label}}“{{value}}”",
            confirmAccessibleLabel: "确认{{label}}“{{value}}”",
        }),
    }),
);
