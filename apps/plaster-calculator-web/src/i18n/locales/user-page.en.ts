export const enUserPage = Object.freeze({
    profile: Object.freeze({
        title: "Profile",
        description:
            "Account details from your signed-in profile and connected login providers.",
        signedInUser: "Signed in user",
        noEmailAddress: "No email address",
        notProvided: "Not provided",
        fields: Object.freeze({
            name: "Name",
            email: "Email",
        }),
        editName: "Edit name",
        unableToSaveName: "Unable to save name.",
        connectedLogins: "Connected logins",
        noConnectedSocialLogins: "No connected social logins.",
    }),
    appearance: Object.freeze({
        title: "Appearance",
        description:
            "Choose the colour mode used across the calculator workspace.",
    }),
    language: Object.freeze({
        title: "Language",
        description: "Choose the language used for questionnaire forms.",
    }),
    team: Object.freeze({
        members: Object.freeze({
            paginationLabel: "Team members pagination",
        }),
        pendingInvitations: Object.freeze({
            loadMore: "Load more",
            loadingMore: "Loading more...",
        }),
    }),
});
