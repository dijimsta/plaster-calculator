import { createTranslationResource } from "@ui/internationalization";

import { en } from "./en.ts";

export const zh = createTranslationResource(
    en,
    Object.freeze({
        companyDetailCard: Object.freeze({
            title: "详情",
            fields: Object.freeze({
                companyName: "公司名称",
                businessNumber: "ACN / ABN",
                phoneNumber: "电话",
                primaryContact: "主要联系人",
                noPrimaryContact: "无主要联系人",
            }),
            deleteTitle: "删除公司",
            delete: "删除公司",
            save: "保存更改",
        }),
        companyPricingCard: Object.freeze({
            title: "报价",
            description: "此公司的报价使用{{name}}价格方案。",
            descriptionDefault: "此公司的报价使用团队的默认价格。",
            fieldLabel: "价格方案",
            useDefaultOption: "使用默认方案",
            defaultTemplateOption: "{{name}}（默认）",
            editRates: "编辑价格",
        }),
        companyRateItemCard: Object.freeze({
            caption: "{{name}} · 每{{unit}}",
            percentDeltaDecrease: "−{{amount}}",
            percentDeltaIncrease: "+{{amount}}",
        }),
        companyContactsCard: Object.freeze({
            title: "联系人",
            add: "添加联系人",
            emptyStateTitle: "暂无联系人",
        }),
        companyContactRow: Object.freeze({
            primaryBadge: "主要",
            edit: "编辑联系人",
            email: "给{{name}}发邮件",
            delete: "删除联系人",
            noEmail: "无邮箱",
            noPhone: "无电话",
            noRole: "无职位",
            save: "保存",
            cancelEdit: "取消编辑",
        }),
        companyContactFormFields: Object.freeze({
            name: "姓名",
            email: "邮箱",
            phoneNumber: "电话",
            role: "职位",
            makePrimary: "将此联系人设为主要联系人",
        }),
    }),
);
