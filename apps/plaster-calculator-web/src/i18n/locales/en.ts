export const en = Object.freeze({
    common: Object.freeze({}),
    sidebar: Object.freeze({
        navigationLabel: "Application navigation",
        workspaceSectionTitle: "Workspace",
        navLabels: Object.freeze({
            home: "Home",
            projects: "Projects",
            questionnaires: "Questionnaires",
            quotes: "Quotes",
            companies: "Companies",
        }),
        userFallback: "User",
        logOut: "Log out",
    }),
    companySelect: Object.freeze({
        label: "Company",
        placeholder: "Search companies",
        unableToLoadCompanies: "Unable to load companies",
        clearCompany: "Clear company",
        noCompanyDetails: "No company details",
    }),
    themeSettingsControl: Object.freeze({
        legend: "Colour theme",
        modeLabels: Object.freeze({
            system: "System",
            light: "Light",
            dark: "Dark",
        }),
    }),
    languageSettingsControl: Object.freeze({
        legend: "Language",
        languageLabels: Object.freeze({
            en: "English",
            zh: "中文",
        }),
    }),
    home: Object.freeze({
        title: "Home",
        projectProcessingAlert: Object.freeze({
            title: "Project processing",
            description:
                "This list will update automatically when processing is complete.",
        }),
    }),
    projects: Object.freeze({
        breadcrumb: "Projects",
        title: "Projects",
        statusTabs: Object.freeze({
            all: "All",
        }),
        loadingProjects: "Loading projects...",
        refresh: "Refresh",
        refreshTitle: "Refresh projects",
        emptyStateTitle: "No projects match your filters",
        tableHeaders: Object.freeze({
            project: "Project",
            company: "Company",
            plan: "Plan",
            status: "Status",
            updated: "Updated",
            actions: "Actions",
        }),
    }),
    questionnaires: Object.freeze({
        title: "Questionnaires",
        projectsTab: "Projects",
        templatesTab: "Templates",
    }),
    projectHistory: Object.freeze({
        noStatusProjects: "No {{status}} projects",
    }),
    projectPage: Object.freeze({
        confirmStatusChange: "Change status to {{status}}?",
        statusChanged: "Status changed to {{status}}.",
    }),
    projectHeader: Object.freeze({
        projectFallback: "Project",
        detailsAriaLabel: "Project details",
        loading: "Loading...",
        floorplanTab: "Floorplan",
        renameProject: "Rename project",
    }),
    projectStatusContent: Object.freeze({
        statusSectionTitle: "Status",
        companySectionTitle: "Company",
        projectWon: "Project won",
        projectLost: "Project lost",
    }),
    salesStatus: Object.freeze({
        label: "Sales status",
        statusLabels: Object.freeze({
            QUOTING: "Quoting",
            QUOTE_SUBMITTED: "Quote Submitted",
            WON: "Won",
            LOST: "Lost",
        }),
    }),
});
