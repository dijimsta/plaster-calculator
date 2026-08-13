export const zhUserPage = Object.freeze({
    profile: Object.freeze({
        title: "个人资料",
        description: "来自已登录个人资料和关联登录提供商的账户详情。",
        signedInUser: "已登录用户",
        noEmailAddress: "无电子邮箱地址",
        notProvided: "未提供",
        fields: Object.freeze({
            name: "姓名",
            email: "电子邮箱",
        }),
        editName: "编辑姓名",
        unableToSaveName: "无法保存姓名。",
        connectedLogins: "已关联的登录方式",
        noConnectedSocialLogins: "没有关联的社交登录方式。",
    }),
    appearance: Object.freeze({
        title: "外观",
        description: "选择计算器工作区使用的颜色模式。",
    }),
    language: Object.freeze({
        title: "语言",
        description: "选择问卷表单使用的语言。",
    }),
});
