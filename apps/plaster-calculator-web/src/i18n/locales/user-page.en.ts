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
        nameDescription:
            "This name is shown throughout your account and to your team.",
        savingName: "Saving...",
        saveName: "Save name",
        nameSaved: "Name saved.",
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
});
