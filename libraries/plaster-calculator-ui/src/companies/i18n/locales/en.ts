export const en = Object.freeze({
    companyDetailCard: Object.freeze({
        title: "Details",
        fields: Object.freeze({
            companyName: "Company name",
            businessNumber: "ACN / ABN",
            phoneNumber: "Phone",
            primaryContact: "Primary contact",
            noPrimaryContact: "No primary contact",
        }),
        deleteTitle: "Delete company",
        delete: "Delete company",
        save: "Save changes",
    }),
    companyPricingCard: Object.freeze({
        title: "Pricing",
        description:
            "Quotes for this company use the {{name}} rates variation.",
        descriptionDefault:
            "Quotes for this company use your team's default rates.",
        fieldLabel: "Rates variation",
        useDefaultOption: "Use the default",
        defaultTemplateOption: "{{name}} (default)",
        editRates: "Edit rates",
    }),
    companyRateItemCard: Object.freeze({
        caption: "{{name}} · per {{unit}}",
        percentDeltaDecrease: "−{{amount}}",
        percentDeltaIncrease: "+{{amount}}",
    }),
    companyContactsCard: Object.freeze({
        title: "Contacts",
        add: "Add contact",
        emptyStateTitle: "No contacts yet",
    }),
    companyContactRow: Object.freeze({
        primaryBadge: "Primary",
        edit: "Edit contact",
        email: "Email {{name}}",
        delete: "Delete contact",
        noEmail: "No email",
        noPhone: "No phone",
        noRole: "No role",
        save: "Save",
        cancelEdit: "Cancel edit",
    }),
    companyContactFormFields: Object.freeze({
        name: "Name",
        email: "Email",
        phoneNumber: "Phone",
        role: "Role",
        makePrimary: "Make this contact the primary contact",
    }),
});
