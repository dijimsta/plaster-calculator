export const followUp = Object.freeze({
    title: "Quote follow-up",
    loading: "Loading follow-up…",
    dueToday: "Follow up today",
    dueInDay: "Follow up in {{count}} day",
    dueInDays: "Follow up in {{count}} days",
    overdueByDay: "Overdue by {{count}} day",
    overdueByDays: "Overdue by {{count}} days",
    autoCreatedDay:
        "Created automatically when this quote was submitted. Your follow-up window is {{count}} day.",
    autoCreatedDays:
        "Created automatically when this quote was submitted. Your follow-up window is {{count}} days.",
    autoCreatedUnknownWindow:
        "Created automatically when this quote was submitted. Your follow-up window is set in reminder settings.",
    actions: Object.freeze({
        done: "Mark done",
        snooze: "Snooze 3 days",
        pickDate: "Pick a date",
        pickDateLabel: "Follow-up date",
        setDate: "Set date",
        cancel: "Cancel reminder",
        reopen: "Reopen follow-up",
    }),
    outcome: Object.freeze({
        doneTitle: "Done",
        doneDescription: "Marked done on {{date}}.",
        cancelledTitle: "Cancelled",
        cancelledDescription: "This reminder was cancelled on {{date}}.",
    }),
    empty: Object.freeze({
        title: "No follow-up reminder",
        description:
            "A reminder is created automatically when a quote is submitted. Turn quote follow-up reminders on, and set the follow-up window, in reminder settings.",
    }),
    errors: Object.freeze({
        unableToLoad: "Unable to load this project's follow-up",
        tryAgain: "Try again",
    }),
});
