import type {
    CompanyDetail as CommonCompanyDetail,
    CompanySummary as CommonCompanySummary,
} from "@libraries/plaster-calculator-common";

export type { CompanyContact } from "@libraries/plaster-calculator-common";

/**
 * `CompanySummary`/`CompanyDetail` (`@libraries/plaster-calculator-common`)
 * widened with the `Company.quoteTemplateId` assignment (WORK-190) and its
 * template's name — both already selected by `ListMyCompanies`/`GetMyCompany`
 * (`data/connector-web/companies.queries.gql`), just not modeled on the
 * shared package's schema. Widened locally here, as a plain intersection
 * rather than a change to `@libraries/plaster-calculator-common` itself: the
 * assignment is a readiness/generation template-resolution concern
 * (WORK-193) specific to this package, not something every consumer of the
 * shared company schema needs. `null` means "uses the team's default
 * template", the same meaning `Company.quoteTemplateId: null` has on the
 * schema itself.
 */
export type CompanySummary = CommonCompanySummary & {
    readonly quoteTemplateId: string | null;
    readonly quoteTemplateName: string | null;
};

export type CompanyDetail = CommonCompanyDetail & {
    readonly quoteTemplateId: string | null;
    readonly quoteTemplateName: string | null;
};

export type CompanyPayload = {
    companyName?: string;
    businessNumber?: string | null;
    phoneNumber?: string | null;
};

export type CompanyContactPayload = {
    name?: string;
    email?: string | null;
    phoneNumber?: string | null;
    role?: string | null;
    makePrimary?: boolean;
};
