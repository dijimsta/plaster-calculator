import type {
    ReadinessCheckInput,
    ReadinessResult,
} from "../readiness-check.types.ts";

/**
 * A company created inline during upload only carries a name, so this check
 * flags a project whose company has no way to be contacted — a phone number,
 * or a primary contact with an email. `WARN` severity: PCPD-21's decision is
 * not to nag at company-creation time but to raise it at quote time, without
 * blocking the quote outright. Met when the project has no company at all
 * (nothing to chase), or the company has a phone number, or its primary
 * contact has an email. Unmet otherwise, reporting one affected item naming
 * the company so the fix control (WORK-223) can deep-link to it.
 */
export const COMPANY_CONTACT_DETAILS_CHECK_ID = "COMPANY_CONTACT_DETAILS";

export function resolveCompanyContactDetails(
    input: ReadinessCheckInput,
): ReadinessResult {
    const { company } = input;
    if (!company || company.phoneNumber || company.primaryContactEmail) {
        return {
            checkId: COMPANY_CONTACT_DETAILS_CHECK_ID,
            isMet: true,
            affectedItemCount: 0,
            affectedItems: [],
        };
    } else {
        return {
            checkId: COMPANY_CONTACT_DETAILS_CHECK_ID,
            isMet: false,
            affectedItemCount: 1,
            affectedItems: [
                { companyId: company.id, companyName: company.companyName },
            ],
        };
    }
}
