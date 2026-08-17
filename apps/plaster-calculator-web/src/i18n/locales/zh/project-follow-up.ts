export const followUp = Object.freeze({
    title: "报价跟进",
    loading: "正在加载跟进事项...",
    dueToday: "今天跟进",
    dueInDay: "{{count}} 天后跟进",
    dueInDays: "{{count}} 天后跟进",
    overdueByDay: "已逾期 {{count}} 天",
    overdueByDays: "已逾期 {{count}} 天",
    autoCreatedDay: "报价提交后自动创建。您的跟进窗口为 {{count}} 天。",
    autoCreatedDays: "报价提交后自动创建。您的跟进窗口为 {{count}} 天。",
    autoCreatedUnknownWindow:
        "报价提交后自动创建。跟进窗口可在提醒设置中调整。",
    actions: Object.freeze({
        done: "标记完成",
        snooze: "延后 3 天",
        pickDate: "选择日期",
        pickDateLabel: "跟进日期",
        setDate: "设置日期",
        cancel: "取消提醒",
        reopen: "重新开启跟进",
    }),
    outcome: Object.freeze({
        doneTitle: "已完成",
        doneDescription: "已于 {{date}} 标记为完成。",
        cancelledTitle: "已取消",
        cancelledDescription: "该提醒已于 {{date}} 取消。",
    }),
    empty: Object.freeze({
        title: "暂无跟进提醒",
        description:
            "报价提交后会自动创建提醒。可在提醒设置中开启报价跟进提醒并设置跟进窗口。",
    }),
    errors: Object.freeze({
        unableToLoad: "无法加载该项目的跟进事项",
        tryAgain: "重试",
    }),
});
