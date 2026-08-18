export const home = Object.freeze({
    title: "Home",
    projectProcessingAlert: Object.freeze({
        title: "Project processing",
        description:
            "This list will update automatically when processing is complete.",
    }),
    dashboardStats: Object.freeze({
        activeProjects: "Active projects",
        awaitingBuilder: "Awaiting builder",
        readyToQuote: "Ready to quote",
        readyToQuoteDescription: "Projects currently in Quoting status",
        companies: "Companies",
    }),
    needsAttention: Object.freeze({
        title: "Needs your attention",
        loading: "Loading...",
        caughtUpTitle: "You're all caught up",
        caughtUpDescription:
            "No clarifications are waiting on a builder. Anything that comes back unanswered will show up here.",
        activeProjectCountOne: "{{count}} project in progress",
        activeProjectCount: "{{count}} projects in progress",
        viewProjects: "View projects",
        awaitingBuilderBadge: "Awaiting builder",
    }),
    recentProjects: Object.freeze({
        title: "Recent projects",
        viewAll: "View all",
        loading: "Loading projects...",
        emptyTitle: "No projects yet",
    }),
});
