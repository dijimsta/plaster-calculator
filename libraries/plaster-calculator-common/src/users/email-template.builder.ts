import type { EmailSignature } from "./schemas/email-signature.schema.ts";

export interface EmailTemplateQuestion {
    readonly label: string;
}

export interface EmailTemplate {
    readonly subject: string;
    readonly body: string;
}

const SCOPE_OF_WORK_INTRO =
    "Before we start, it would be really great if you could advise the following scope of work for this project:";

const NO_UNANSWERED_QUESTIONS_LINE =
    "All questionnaire questions have been answered — thank you!";

export class EmailTemplateBuilder {
    private readonly signature: EmailSignature;

    public constructor(signature: EmailSignature) {
        this.signature = signature;
    }

    public build(
        unansweredQuestions: readonly EmailTemplateQuestion[],
        contactName?: string | null,
    ): EmailTemplate {
        return {
            subject: this.buildSubject(),
            body: this.buildBody(unansweredQuestions, contactName),
        };
    }

    private buildSubject(): string {
        return this.signature.companyName
            ? `Scope of Work – ${this.signature.companyName}`
            : "Scope of Work";
    }

    private buildBody(
        unansweredQuestions: readonly EmailTemplateQuestion[],
        contactName?: string | null,
    ): string {
        const sections = [
            contactName ? `Hi ${contactName},` : "Hello,",
            "Thanks for choosing us. We have received your plan. We are now processing the quote for you.",
            this.buildQuestionsSection(unansweredQuestions),
            "Should you have any queries or concerns regarding this matter, please feel free to keep in touch with us.",
            ["Looking forward to hear from you.", "Kind Regards,"].join("\n"),
            this.buildSignatureBlock(),
        ].filter((section) => section.length > 0);

        return sections.join("\n\n");
    }

    private buildQuestionsSection(
        unansweredQuestions: readonly EmailTemplateQuestion[],
    ): string {
        const questions =
            unansweredQuestions.length === 0
                ? NO_UNANSWERED_QUESTIONS_LINE
                : unansweredQuestions
                      .map((question) => question.label)
                      .join("\n");
        return [SCOPE_OF_WORK_INTRO, questions].join("\n");
    }

    private buildSignatureBlock(): string {
        return [
            this.signature.name,
            this.signature.companyName,
            this.signature.address,
            this.signature.mobile ? `Mobile: ${this.signature.mobile}` : null,
            this.signature.phone ? `Phone: ${this.signature.phone}` : null,
            this.signature.email,
        ]
            .filter((line): line is string => Boolean(line))
            .join("\n");
    }
}
