import { Text } from "@libraries/uikit-web";
import type { ReactElement, ReactNode } from "react";

export type QuoteAppearanceCaptionProps = {
    readonly children?: ReactNode;
};

/**
 * A small uppercase field caption -- e.g. "BUSINESS NAME" -- passed as a
 * `FormLayoutField`/`RadioGroup` `label`/`legend` in place of a plain
 * string wherever `QuoteAppearancePanel`'s sections need this styling
 * instead of those components' own default sentence-case label. Composed
 * entirely from `Text`'s public API (`uppercase`), per this package's
 * README, rather than a one-off className.
 */
export function QuoteAppearanceCaption({
    children,
}: QuoteAppearanceCaptionProps): ReactElement {
    return (
        <Text size="xs" weight="semibold" variant="muted" uppercase>
            {children}
        </Text>
    );
}
