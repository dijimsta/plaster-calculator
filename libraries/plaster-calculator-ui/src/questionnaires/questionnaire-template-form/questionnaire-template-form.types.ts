export type QuestionnaireTemplateFormValues = {
    readonly name: string;
    readonly questions: readonly {
        readonly id?: string;
        readonly label: string;
    }[];
};
