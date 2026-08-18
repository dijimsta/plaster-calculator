export const needsFollowUp = Object.freeze({
    title: "Needs follow-up",
    openCount: "{{count}} open",
    overdueBadge: "{{count}} overdue",
    description: "Quotes you sent, chased {{count}} days after submitting.",
    expand: "Expand follow-ups",
    collapse: "Collapse follow-ups",
    scopeLabel: "Follow-up scope",
    scope: Object.freeze({
        mine: "Mine",
        team: "Team",
    }),
    loading: "Loading follow-ups...",
    unassigned: "Unassigned",
    dueToday: "Due today",
    dueInDay: "Due in {{count}} day",
    dueInDays: "Due in {{count}} days",
    overdueByDay: "Overdue by {{count}} day",
    overdueByDays: "Overdue by {{count}} days",
    emptyMine: Object.freeze({
        title: "No follow-ups assigned to you",
        description:
            "Reminders appear here once one of your projects moves to Quote submitted.",
    }),
    emptyTeam: Object.freeze({
        title: "Nothing due across the team",
        description:
            "Reminders appear here once a project moves to Quote submitted.",
    }),
    actions: Object.freeze({
        done: "Done",
        snooze: "Snooze 3d",
        reschedule: "Reschedule",
        rescheduleLabel: "Reschedule due date",
        options: Object.freeze({
            tomorrow: "Tomorrow",
            in3Days: "In 3 days",
            nextWeek: "Next week",
            custom: "Custom date…",
        }),
        setDate: "Set date",
        cancel: "Cancel",
    }),
    confirmations: Object.freeze({
        done: "Marked as done.",
        cancelled: "Follow-up cancelled.",
        snoozed: "Snoozed to {{date}}.",
        rescheduled: "Rescheduled to {{date}}.",
        undo: "Undo",
    }),
    errors: Object.freeze({
        unableToLoad: "Unable to load follow-ups",
        tryAgain: "Try again",
    }),
});
