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
            loading: "正在加载报价…",
            unableToLoad: "无法加载报价，请尝试刷新。",
        }),
        quoteDetailPage: Object.freeze({
            breadcrumb: "报价单",
            downloadPdf: "下载 PDF",
            markAsSent: "标记为已发送",
            markAccepted: "标记为已接受",
            loading: "正在加载报价单…",
            notFoundTitle: "未找到报价单",
            notFoundDescription: "该报价单不存在，或您无权访问。",
        }),
        editableQuoteForm: Object.freeze({
            quoteDetailsTitle: "报价详情",
            quoteDetailsDescription:
                "此报价单为独立副本，此处的更改不会影响模板。",
            referenceLabel: "报价编号",
            lineItemsTitle: "项目明细",
            lineItemsDescription:
                "可编辑描述、数量和价格，也可添加或删除项目。",
            addItem: "添加项目",
            removeItem: "删除第 {{number}} 项",
            save: "保存报价",
            saving: "正在保存…",
            edit: "编辑报价",
            saveSuccessTitle: "报价已保存",
            saveSuccessDescription: "您的报价更改已更新。",
            saveErrorTitle: "无法保存报价",
            saveErrorDescription:
                "部分更改可能未保存。请检查刷新后的报价并重试。",
        }),
        quoteStatusBadge: Object.freeze({
            draft: "草稿",
            sent: "已发送",
            accepted: "已接受",
        }),
        quoteDetailDocument: Object.freeze({
            noReference: "无参考编号",
            noCompany: "无公司",
            manualLineItem: "手动录入",
            lineItemsLabel: "项目明细",
            columnItem: "项目",
            columnQuantity: "数量",
            columnUnitPrice: "单价",
            columnAmount: "金额",
        }),
        quoteLineItemsTable: Object.freeze({
            tableLabel: "项目明细",
            columnItem: "项目",
            columnQuantity: "数量",
            columnUnitPrice: "单价",
            columnAmount: "金额",
            provenanceFromSource: "根据{{source}}计算",
            provenanceFromSourceWithPlasterType:
                "根据{{source}}计算 — {{plasterType}}",
            provenanceMatchedKeywords: "已匹配关键词 {{keywords}}",
            includedByDefault: "默认包含",
            unknownProvenance: "来源未知",
        }),
        quoteTotalsBlock: Object.freeze({
            subtotal: "小计",
            gst: "增值税（10%）",
            totalIncGst: "含税总额",
        }),
        generateQuote: Object.freeze({
            pending: "正在生成报价…",
            errorMessages: Object.freeze({
                NOT_READY:
                    "该方案尚未就绪，无法生成报价。请先解决下方的检查项，然后重试。",
                NO_ITEMS:
                    "未找到可计费项目。请检查方案测量数据和报价模板，然后重试。",
                TOO_MANY_ITEMS:
                    "报价项目过多，无法生成。请减少计价项目数量后重试。",
            }),
            genericError: "无法生成报价，请重试。",
        }),
        quotesTable: Object.freeze({
            tableLabel: "报价单",
            // zh has a single plural form (CLDR "other"); `_one` mirrors
            // `_other` verbatim, matching the note on notReadyDescription
            // above.
            quoteCount_one: "{{count}} 份报价",
            quoteCount_other: "{{count}} 份报价",
            columnQuote: "报价单",
            columnProject: "项目",
            columnCompany: "公司",
            columnStatus: "状态",
            columnTotal: "含税总额",
            columnDate: "日期",
            downloadAction: "下载 {{reference}}",
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
        projectQuoteReadinessPage: Object.freeze({
            unableToLoadProject: "无法加载项目",
            loadingReadiness: "正在检查报价就绪状态…",
            unableToLoadReadiness: "无法加载报价就绪状态，请尝试刷新。",
            unableToLoadQuote: "无法加载报价单，请尝试刷新。",
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
            floorplanDeepLink: Object.freeze({
                setScale: "设置比例",
                drawRooms: "绘制房间",
                actionWithPage: "在第 {{pageNumber}} 页{{action}}",
            }),
        }),
    }),
);
