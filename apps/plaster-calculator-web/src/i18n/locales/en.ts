import { appMetadataByLanguage } from "../language.ts";

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
        }),
        userFallback: "User",
        roleLabels: Object.freeze({
            owner: "Owner",
            member: "Member",
        }),
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
    newProjectForm: Object.freeze({
        title: "New Project",
        projectNameLabel: "Address or project name",
        projectNamePlaceholder: "12 Example Street",
        companyLabel: "Company",
        companyPlaceholder: "Search company by company name",
        fileLabel: "PDF or image file",
        dropFileInstruction: "Drop a PDF or image here",
        chooseDifferentFile: "Click to choose a different file",
        browseFileInstruction: "Click to browse from your computer",
        upload: "Upload",
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
    }),
    quotes: Object.freeze({
        title: "Quotes",
        allQuotesTab: "All quotes",
        templateTab: "Quote template",
    }),
    companies: Object.freeze({
        title: "Companies",
        description: "Manage customer companies and contacts.",
        fields: Object.freeze({
            companyName: "Company name",
            businessNumber: "ACN/ABN",
            phoneNumber: "Phone number",
            primaryContact: "Primary contact",
            noPrimaryContact: "No primary contact",
        }),
        contactFields: Object.freeze({
            name: "Name",
            email: "Email",
            phoneNumber: "Phone number",
            role: "Role",
            makePrimary: "Make this contact the primary contact",
        }),
        list: Object.freeze({
            title: "Company List",
            search: "Search",
            refreshTitle: "Refresh company list",
            refresh: "Refresh",
            loading: "Loading companies...",
            emptyStateTitle: "No companies found",
            unableToLoad: "Unable to load companies",
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
        detailsPanel: Object.freeze({
            title: "Company Details",
            save: "Save company",
            deleteTitle: "Delete company",
            delete: "Delete",
        }),
        pricingPanel: Object.freeze({
            title: "Pricing",
            fieldLabel: "Quote template",
            useDefaultOption: "Use the default",
            defaultTemplateOption: "{{name}} (default)",
            usesDefaultDescription:
                "Uses the default. Quotes for this company are priced with your team's default template.",
            assignedDescription:
                "Quotes for this company are priced with {{name}}.",
            unnamedTemplateFallback: "an unnamed template",
            clearedNotification: "Now uses the default template.",
            assignedNotification: "Quote template updated.",
            unableToSave: "Unable to update the quote template",
        }),
        projectsPanel: Object.freeze({
            title: "Projects",
            emptyStateTitle: "No projects are linked to this company",
        }),
        companyRow: Object.freeze({
            noBusinessNumber: "No business number",
            noPhone: "No phone",
            primaryContactSet: "Primary contact set",
            noPrimaryContact: "No primary contact",
        }),
        contactsPanel: Object.freeze({
            title: "Contacts",
            add: "Add contact",
            emptyStateTitle: "No contacts yet",
        }),
        contactRow: Object.freeze({
            edit: "Edit contact",
            email: "Email {{name}}",
            delete: "Delete contact",
            primarySuffix: " (Primary)",
            noEmail: "No email",
            noPhone: "No phone",
            noRole: "No role",
            save: "Save",
            cancelEdit: "Cancel edit",
        }),
        newContact: Object.freeze({
            title: "New Contact",
            cancel: "Cancel",
            add: "Add contact",
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
        scopeOfWorkTab: "Scope of work",
        quoteTab: "Quote",
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
