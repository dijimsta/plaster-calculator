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
        }),
        editorSidebar: Object.freeze({
            statusTitle: "状态",
            companyTitle: "公司",
            scaleTitle: "比例",
            summaryTitle: "摘要",
            areasTitle: "区域",
            selectionTitle: "选择",
        }),
    }),
);
