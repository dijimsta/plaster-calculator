import type { EmailSignature } from "./schemas/email-signature.schema.ts";

export type EmailTemplateQuestion = {
    readonly label: string;
};

export type EmailTemplate = {
    readonly subject: string;
    readonly body: string;
};

const SCOPE_OF_WORK_INTRO =
    "Before we start, it would be really great if you could advise the following scope of work for this project:";

const NO_UNANSWERED_QUESTIONS_LINE =
    "All clarifications have been answered — thank you!";

export function buildEmailTemplate(
    signature: EmailSignature,
    unansweredQuestions: readonly EmailTemplateQuestion[],
    contactName?: string | null,
): EmailTemplate {
    return {
        subject: buildSubject(signature),
        body: buildBody(signature, unansweredQuestions, contactName),
    };
}

function buildSubject(signature: EmailSignature): string {
    return signature.companyName
        ? `Scope of Work – ${signature.companyName}`
        : "Scope of Work";
}

function buildBody(
    signature: EmailSignature,
    unansweredQuestions: readonly EmailTemplateQuestion[],
    contactName?: string | null,
): string {
    const sections = [
        contactName ? `Hi ${contactName},` : "Hello,",
        "Thanks for choosing us. We have received your plan. We are now processing the quote for you.",
        buildQuestionsSection(unansweredQuestions),
        "Should you have any queries or concerns regarding this matter, please feel free to keep in touch with us.",
        ["Looking forward to hear from you.", "Kind Regards,"].join("\n"),
        buildSignatureBlock(signature),
    ].filter((section) => section.length > 0);

    return sections.join("\n\n");
}

function buildQuestionsSection(
    unansweredQuestions: readonly EmailTemplateQuestion[],
): string {
    const questions =
        unansweredQuestions.length === 0
            ? NO_UNANSWERED_QUESTIONS_LINE
            : unansweredQuestions
                  .map((question) => `- ${question.label}`)
                  .join("\n");
    return [SCOPE_OF_WORK_INTRO, questions].join("\n");
}

function buildSignatureBlock(signature: EmailSignature): string {
    return [
        signature.name,
        signature.companyName,
        signature.address,
        signature.mobile ? `Mobile: ${signature.mobile}` : null,
        signature.phone ? `Phone: ${signature.phone}` : null,
        signature.email,
    ]
        .filter((line): line is string => Boolean(line))
        .join("\n");
}
