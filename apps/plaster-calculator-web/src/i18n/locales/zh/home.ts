export const home = Object.freeze({
    title: "首页",
    projectProcessingAlert: Object.freeze({
        title: "项目处理中",
        description: "处理完成后此列表将自动更新。",
    }),
    dashboardStats: Object.freeze({
        activeProjects: "进行中的项目",
        awaitingBuilder: "待建筑商回复",
        readyToQuote: "可报价",
        readyToQuoteDescription: "当前处于报价中状态的项目",
        companies: "公司",
    }),
    needsAttention: Object.freeze({
        title: "需要关注",
        loading: "正在加载...",
        caughtUpTitle: "全部处理完毕",
        caughtUpDescription:
            "目前没有等待建筑商回复的澄清事项。收到未回复的内容会显示在此处。",
        activeProjectCountOne: "{{count}} 个项目进行中",
        activeProjectCount: "{{count}} 个项目进行中",
        viewProjects: "查看项目",
        awaitingBuilderBadge: "待建筑商回复",
    }),
    recentProjects: Object.freeze({
        title: "最近项目",
        viewAll: "查看全部",
        loading: "正在加载项目...",
        emptyTitle: "暂无项目",
    }),
});
