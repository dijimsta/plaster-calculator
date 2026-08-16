import { ButtonLink } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

export function QuoteTemplateDeepLinkFixControl(): ReactElement {
    const { t } = useQuotesTranslation();
    return (
        <ButtonLink href="/quotes/template" variant="secondary" size="small">
            {t("readinessFixControls.setTemplateUnits")}
        </ButtonLink>
    );
}
