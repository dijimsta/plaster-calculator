import { ButtonLink } from "@libraries/uikit-web";
import type { ReactElement } from "react";

export type QuoteTemplateDeepLinkFixControlProps = {
    /** Already-translated action label — callers name the specific fix (e.g. "Set template units" vs "Manage quote items"). */
    readonly label: string;
};

export function QuoteTemplateDeepLinkFixControl({
    label,
}: QuoteTemplateDeepLinkFixControlProps): ReactElement {
    return (
        <ButtonLink href="/quotes/template" variant="secondary" size="small">
            {label}
        </ButtonLink>
    );
}
