import { createTranslationResource } from "@ui/internationalization";

import { en } from "./en.ts";

export const zh = createTranslationResource(
    en,
    Object.freeze({
        supplierRow: Object.freeze({
            defaultBadge: "默认",
            noContactName: "无联系人",
            noPhoneNumber: "无电话",
            coverage: "已估算 {{estimated}} / {{total}}",
            notEstimatedYet: "尚未估算",
        }),
        supplierDetailCard: Object.freeze({
            title: "详情",
            fields: Object.freeze({
                contactName: "联系人",
                phoneNumber: "电话",
                email: "邮箱",
                address: "地址",
                accountNumber: "账号",
            }),
            defaultBadge: "默认供应商",
            setAsDefault: "设为默认",
            deleteTitle: "删除供应商",
            cannotDeleteDefaultTitle: "无法删除默认供应商",
            delete: "删除供应商",
            deleteDialogTitle: "删除{{name}}？",
            deleteDialogDescription:
                "此操作将删除{{name}}及其成本估算，且无法撤销。",
            deleteCancel: "取消",
            deleteSubmit: "删除供应商",
            deletingAction: "删除中…",
            save: "保存更改",
        }),
        supplierCostEstimationCard: Object.freeze({
            title: "材料成本估算",
            columnItem: "项目",
            columnUnit: "单位",
            columnEstimate: "预估单价",
            noUnit: "无单位",
            noEstimate: "无估算",
            estimateLabel: "{{name}}的预估单价",
            coverage: "已估算 {{estimated}} / {{total}}",
            emptyStateTitle: "暂无可计价项目",
        }),
        newSupplierPanel: Object.freeze({
            title: "新增供应商",
            fields: Object.freeze({
                name: "供应商名称",
                phoneNumber: "电话",
                accountNumber: "账号",
            }),
            create: "创建供应商",
            cancel: "取消",
        }),
    }),
);
