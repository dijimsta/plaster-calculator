import { createTranslationResource } from "@ui/internationalization";

import { en } from "./en.ts";

export const zh = createTranslationResource(
    en,
    Object.freeze({
        common: Object.freeze({
            cancel: "取消",
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
    }),
);
