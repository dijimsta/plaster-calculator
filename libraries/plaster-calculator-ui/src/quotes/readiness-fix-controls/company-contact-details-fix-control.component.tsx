import type { ReadinessAffectedItem } from "@libraries/plaster-calculator-common";
import { Button } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

export type CompanyContactDetailsFixControlProps = {
    /** The affected company this control fixes. */
    readonly item: ReadinessAffectedItem;
    /**
     * Navigates to wherever the company's contact details get edited,
     * called with `item.companyId`. `FloorplanDeepLinkFixControl` and
     * `QuoteTemplateDeepLinkFixControl` can take their destination as a
     * plain `href` because it's a stable app route; a company's
     * contact-detail editor may instead be a dialog scoped to one company,
     * so this control calls back into the app rather than rendering a
     * link, letting the app decide how to navigate there.
     */
    readonly onFix: (companyId: string) => void;
};

/**
 * Inline fix control for the `COMPANY_CONTACT_DETAILS` readiness check
 * (WORK-221/223): a deep-link action to add the company's contact details.
 * Renders nothing for an item missing `companyId` — this check's affected
 * items always carry one (`resolveCompanyContactDetails`), but a resolver
 * bug shouldn't crash the gate, the same defensive shape as
 * `FloorplanDeepLinkFixControl`'s missing-`href` case.
 */
export function CompanyContactDetailsFixControl({
    item,
    onFix,
}: CompanyContactDetailsFixControlProps): ReactElement | null {
    const { t } = useQuotesTranslation();
    const { companyId } = item;

    if (!companyId) return null;

    return (
        <Button
            type="button"
            variant="secondary"
            size="small"
            onClick={() => onFix(companyId)}
        >
            {t("readinessFixControls.companyContactDetails.addContactDetails")}
        </Button>
    );
}
