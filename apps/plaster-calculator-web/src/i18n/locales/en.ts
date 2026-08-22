import { appMetadataByLanguage } from "../language.ts";

import { companySelect } from "./en/company-select.ts";
import { home } from "./en/home.ts";
import { needsFollowUp } from "./en/needs-follow-up.ts";
import { followUp as projectFollowUp } from "./en/project-follow-up.ts";
import { projects } from "./en/projects.ts";
import { enUserPage } from "./user-page.en.ts";

export const en = Object.freeze({
    common: Object.freeze({}),
    appMetadata: appMetadataByLanguage.en,
    loginPage: Object.freeze({
        brandName: "Plaster Calculator",
        signedInDescription:
            "Calculate plaster quantities quickly and accurately for any project.",
        welcomeBack: "Welcome back, <strong>{{name}}</strong>!",
        goToApp: "Go to App",
        description:
            "Quote your plastering quickly and accurately for any project.",
        namePlaceholder: "Name",
        emailPlaceholder: "Email address",
        passwordPlaceholder: "Password",
        loading: "Please wait…",
        logIn: "Log in",
        or: "or",
        continueWithGoogle: "Continue with Google",
        backToLogin: "Back to log in",
        createNewAccount: "Create new account",
        createAccount: "Create account",
        authenticationFailed: "Authentication failed.",
        googleSignInFailed: "Google sign-in failed.",
        retryTeamSetup: "Retry team setup",
    }),
    sidebar: Object.freeze({
        navigationLabel: "Application navigation",
        workspaceSectionTitle: "Workspace",
        navLabels: Object.freeze({
            home: "Home",
            projects: "Projects",
            questionnaires: "Scope of work",
            quotes: "Quotes",
            companies: "Companies",
            suppliers: "Suppliers",
        }),
        userFallback: "User",
        roleLabels: Object.freeze({
            owner: "Owner",
            member: "Member",
        }),
        logOut: "Log out",
    }),
    companySelect,
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
    home,
    newProjectForm: Object.freeze({
        title: "New Project",
        projectNameLabel: "Address or project name",
        projectNamePlaceholder: "12 Example Street",
        companyLabel: "Company",
        companyPlaceholder: "Search company by company name",
        dropFileInstruction: "Drop a PDF or image here",
        chooseDifferentFile: "Click to choose a different file",
        browseFileInstruction: "Click to browse from your computer",
        upload: "Upload",
        companyCreated: "{{name}} created and selected.",
    }),
    pdfPageModal: Object.freeze({
        title: "Which pages do you annotate walls on?",
        description:
            "Select the plan pages that show wall layouts. You can skip schedules, elevations, and other pages that don't need annotating.",
        cancel: "Cancel",
        selectPagesToContinue: "Select pages to continue",
        annotateSelectedPage: "Annotate {{count}} selected page",
        annotateSelectedPages: "Annotate {{count}} selected pages",
        page: "Page {{number}}",
    }),
    newProjectWizard: Object.freeze({
        detailsStep: Object.freeze({
            projectNameLabel: "Project name",
            fileLabel: "File",
            creatingProject: "Creating your project...",
        }),
        footer: Object.freeze({
            cancel: "Cancel",
            back: "Back",
            continueToClarifications: "Continue",
            continueToPages: "Continue to pages",
            finish: "Finish",
        }),
    }),
    projects,
    questionnaires: Object.freeze({
        title: "Scope of work",
        projectsTab: "Scope of work",
        templatesTab: "Clarification Template",
        paginationLabel: "Questionnaires list pagination",
    }),
    quotes: Object.freeze({
        title: "Quotes",
        allQuotesTab: "All quotes",
        templateTab: "Quote template",
        appearanceTab: "Quote appearance",
        appearanceDescription:
            "Set the letterhead, logo, accent colour, and terms used on every generated quote.",
        paginationLabel: "Quotes list pagination",
    }),
    companies: Object.freeze({
        title: "Companies",
        description: "Manage customer companies and contacts.",
        fields: Object.freeze({
            companyName: "Company name",
            businessNumber: "ACN/ABN",
            phoneNumber: "Phone number",
        }),
        list: Object.freeze({
            title: "Company List",
            search: "Search",
            refreshTitle: "Refresh company list",
            refresh: "Refresh",
            loading: "Loading companies...",
            emptyStateTitle: "No companies found",
            unableToLoad: "Unable to load companies",
            createFromSearch: 'Create "{{name}}"',
            paginationLabel: "Company list pagination",
        }),
        newCompany: Object.freeze({
            title: "New Company",
            created: "Company created.",
            unableToCreate: "Unable to create company",
            create: "Create company",
        }),
        detailHeader: Object.freeze({
            companyFallback: "Company",
            refresh: "Refresh",
        }),
        detail: Object.freeze({
            unableToLoad: "Unable to load company",
            unableToSave: "Unable to save company",
            contactAdded: "Contact added.",
            unableToAddContact: "Unable to add contact",
            unableToSaveContact: "Unable to save contact",
            deleteContactConfirmation: 'Delete contact "{{name}}"?',
            deletingContact: "Deleting contact...",
            unableToDeleteContact: "Unable to delete contact",
            linkedProjectsWarning:
                "Remove or reassign linked projects before deleting this company.",
            deleteCompanyConfirmation: 'Delete "{{name}}" and all contacts?',
            deletingCompany: "Deleting company...",
            unableToDeleteCompany: "Unable to delete company",
            loading: "Loading company...",
            notFound: "Company not found",
        }),
        pricingPanel: Object.freeze({
            clearedNotification: "Now uses the default template.",
            assignedNotification: "Quote template updated.",
            unableToSave: "Unable to update the quote template",
        }),
        projectsPanel: Object.freeze({
            title: "Projects",
            emptyStateTitle: "No projects are linked to this company",
            loading: "Loading projects...",
            unableToLoad: "Unable to load projects",
            loadMore: "Load more",
            loadingMore: "Loading more...",
        }),
        companyRow: Object.freeze({
            noBusinessNumber: "No business number",
            noPhone: "No phone",
            primaryContactSet: "Primary contact set",
            noPrimaryContact: "No primary contact",
        }),
        newContact: Object.freeze({
            title: "New Contact",
            cancel: "Cancel",
            add: "Add contact",
        }),
    }),
    suppliers: Object.freeze({
        title: "Suppliers",
        description: "Manage the suppliers you buy materials from.",
        fields: Object.freeze({
            supplierName: "Supplier name",
        }),
        list: Object.freeze({
            title: "Supplier List",
            search: "Search",
            loading: "Loading suppliers...",
            emptyStateTitle: "No suppliers found",
            unableToLoad: "Unable to load suppliers",
            createFromSearch: 'Create "{{name}}"',
            paginationLabel: "Supplier list pagination",
        }),
        newSupplier: Object.freeze({
            unableToCreate: "Unable to create supplier",
        }),
        detailHeader: Object.freeze({
            supplierFallback: "Supplier",
        }),
        detail: Object.freeze({
            loading: "Loading supplier...",
            notFound: "Supplier not found",
            unableToSave: "Unable to save supplier",
            unableToDelete: "Unable to delete supplier",
            setDefaultNotification: "Now the default supplier.",
            unableToSetDefault: "Unable to set default supplier",
            unableToSaveEstimate: "Unable to save cost estimate",
        }),
    }),
    userPage: enUserPage,
    userSettings: Object.freeze({
        title: "Reminder settings",
        description:
            "Control how quote follow-up reminders are created for new work.",
        loading: "Loading settings...",
        unableToLoad: "Unable to load settings.",
        quoteFollowUpReminders: "Quote follow-up reminders",
        quoteFollowUpDescription:
            "Automatically create reminders to follow up on quotes.",
        dueInDays: "Due in days",
        saving: "Saving...",
        save: "Save reminder settings",
        saved: "Settings saved.",
        unableToSave: "Unable to save settings.",
    }),
    needsFollowUp,
    emailSignature: Object.freeze({
        title: "Email signature",
        description:
            "These details are used to build the signature appended to outgoing emails.",
        loading: "Loading email signature...",
        fields: Object.freeze({
            name: "Name",
            companyName: "Company name",
            address: "Address",
            mobile: "Mobile",
            phone: "Phone",
            email: "Email",
        }),
        saving: "Saving...",
        save: "Save email signature",
        saved: "Email signature saved.",
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
        scopeOfWorkTab: "Scope of work",
        quoteTab: "Quote",
        renameProject: "Rename project",
    }),
    projectStatusContent: Object.freeze({
        statusSectionTitle: "Status",
        companySectionTitle: "Company",
        projectWon: "Project won",
        projectLost: "Project lost",
        followUp: projectFollowUp,
        companyPanel: Object.freeze({
            noContactDetails: "No contact details",
        }),
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
