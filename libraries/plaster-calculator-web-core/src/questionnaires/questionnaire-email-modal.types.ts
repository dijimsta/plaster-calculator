/**
 * The subset of a clarification/questionnaire question the email builder
 * needs. Deliberately plain (not tied to any one route's persisted-row
 * type) so both in-flight wizard rows and persisted scope-of-work rows can
 * be passed in.
 */
export type QuestionnaireEmailClarification = {
    readonly label: string;
    readonly answer?: string | null;
};

export type GenerateQuestionnaireEmailModalState = {
    readonly isOpen: boolean;
    readonly subject: string;
    readonly body: string;
    readonly mailtoHref: string;
    readonly openModal: () => void;
    readonly closeModal: () => void;
};
