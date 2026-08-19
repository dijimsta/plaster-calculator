import { createTranslationResource } from "@ui/internationalization";

import { en } from "./en.ts";

export const zh = createTranslationResource(
    en,
    Object.freeze({
        common: Object.freeze({}),
        editorToolbar: Object.freeze({
            overlayModeLabels: Object.freeze({
                both: "两者",
                ceilings: "天花板",
                walls: "墙面",
            }),
            undo: "撤销",
            redo: "重做",
            deselectAll: "取消全选",
            addPoint: "添加点",
            straightenSelectedPoints: "拉直所选两点之间的线段",
            enterFullScreen: "进入全屏",
            exitFullScreen: "退出全屏",
        }),
        editorSidebar: Object.freeze({
            statusTitle: "状态",
            companyTitle: "公司",
            pagesTitle: "页面",
            pageDrawerTitle: "第 {{page}} 页",
            scaleTitle: "比例",
            summaryTitle: "摘要",
            areasTitle: "区域",
            selectionTitle: "选择",
        }),
        ceilingControls: Object.freeze({
            roomCeilingLabel: "房间天花板",
            ceilingModeOptions: Object.freeze({
                flat: "平面",
                raked: "斜面",
            }),
            roomHeightOverrideLabel: "房间高度覆盖（毫米）",
            pageHeightNotSet: "未设置页面高度",
            lowHeightLabel: "低点高度（毫米）",
            highHeightLabel: "高点高度（毫米）",
        }),
        pageSettingsPanel: Object.freeze({
            readyStatus: "就绪",
            ceilingHeightLabel: "天花板高度（毫米）",
            ceilingHeightRequired: "天花板高度为必填项",
        }),
        scalePanel: Object.freeze({
            cancelReference: "取消参考",
            setReference: "设置参考",
            clickTwoPoints: "在图像上点击两个点。",
            referencePointsSet: "已设置 {{points}}/2 个参考点。",
            referenceLengthLabel: "参考长度（毫米）",
        }),
        selectionBoardControls: Object.freeze({
            wallProfileLabel: "墙面轮廓",
            wallBoardLabel: "墙板",
            ceilingBoardLabel: "天花板板材",
        }),
        selectionPanel: Object.freeze({
            areaLabelField: "区域标签",
        }),
        summaryPanel: Object.freeze({
            unavailable: "由于尚未设置参考，摘要不可用。",
            wallLength: "墙面长度",
            ceilingArea: "天花板面积",
        }),
        projectEditor: Object.freeze({
            confirmReanalyze: "要分析此页面吗？现有多边形将被替换。",
            analyzingStatus: "正在分析平面图...",
            analysisCompleteStatus: "分析完成",
            analysisFailedStatus: "分析失败",
        }),
        fullScreenBanner: Object.freeze({
            message: "由于窗口较窄，已自动进入全屏。",
            keepPanels: "保留面板",
        }),
        selectionCard: Object.freeze({
            roomLabel: "房间",
            wallLabel: "墙面",
            pointSelected: "已选择点",
            editProperties: "编辑属性",
        }),
    }),
);
