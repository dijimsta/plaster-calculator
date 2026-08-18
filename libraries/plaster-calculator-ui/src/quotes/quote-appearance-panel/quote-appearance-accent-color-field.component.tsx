import {
    Avatar,
    RadioGroup,
    RadioGroupOption,
    type AvatarColor,
} from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { QuoteAppearanceCaption } from "./quote-appearance-caption.component.tsx";
import { QUOTE_APPEARANCE_ACCENT_COLOR_SWATCHES } from "./quote-appearance-panel.utils.ts";

export type QuoteAppearanceAccentColorFieldProps = {
    readonly value: string;
    readonly disabled?: boolean;
    readonly onChange: (value: string) => void;
};

/**
 * The team's accent-colour picker: a fixed set of swatches (see
 * `QUOTE_APPEARANCE_ACCENT_COLOR_SWATCHES`'s doc comment for why it's closed
 * rather than a free colour picker), rendered as a `RadioGroup` "swatch"
 * layout -- bare colour squares with a ring on the selected one, no card
 * background or visible text -- so exactly one swatch is ever selected.
 * Each option's visible swatch is a small decorative `Avatar` in that
 * swatch's own `avatarColor` -- the only public UIKit API that paints a
 * flat colour chip -- with an empty `initials` string so it renders its
 * coloured background with no visible glyph, and `shape="square"` so it
 * reads as a colour swatch rather than a person's avatar. The swatch's name
 * (e.g. "Ocean blue") is passed as `description`, which the "swatch"
 * variant uses only as the control's accessible name -- see
 * `RadioGroupSwatchOption`'s own doc comment (`@libraries/uikit-web`).
 */
export function QuoteAppearanceAccentColorField({
    value,
    disabled = false,
    onChange,
}: QuoteAppearanceAccentColorFieldProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <RadioGroup
            name="quote-appearance-accent-color"
            legend={
                <QuoteAppearanceCaption>
                    {t("quoteAppearancePanel.accentColorLabel")}
                </QuoteAppearanceCaption>
            }
            variant="swatch"
            disabled={disabled}
        >
            {QUOTE_APPEARANCE_ACCENT_COLOR_SWATCHES.map((swatch) => (
                <RadioGroupOption
                    key={swatch.value}
                    value={swatch.value}
                    checked={value === swatch.value}
                    onChange={() => onChange(swatch.value)}
                    label={
                        <Avatar
                            color={swatch.avatarColor}
                            shape="square"
                            initials=""
                            size="sm"
                        />
                    }
                    description={accentColorSwatchLabel(t, swatch.avatarColor)}
                />
            ))}
        </RadioGroup>
    );
}

/**
 * Resolves a swatch's display name through a literal `t()` call per
 * `AvatarColor`, rather than indexing `t()` with a dynamic string -- the
 * same reason `ReadinessCheckList`'s `checkLabels` lookup
 * (`../readiness-check-list/readiness-check-list.utils.ts`) switches on the
 * check type instead of building the key at runtime: it keeps every
 * translation key statically visible to `i18next`'s typed `t()`. Only the
 * subset of `AvatarColor` this swatch set actually uses needs a case; a
 * default keeps this exhaustive without a `never` check depending on
 * `AvatarColor` never growing.
 */
function accentColorSwatchLabel(
    t: ReturnType<typeof useQuotesTranslation>["t"],
    avatarColor: AvatarColor,
): string {
    switch (avatarColor) {
        case "gray":
            return t("quoteAppearancePanel.accentColorSwatches.gray");
        case "blue":
            return t("quoteAppearancePanel.accentColorSwatches.blue");
        case "green":
            return t("quoteAppearancePanel.accentColorSwatches.green");
        case "indigo":
            return t("quoteAppearancePanel.accentColorSwatches.indigo");
        case "amber":
            return t("quoteAppearancePanel.accentColorSwatches.amber");
        case "orange":
            return t("quoteAppearancePanel.accentColorSwatches.orange");
        case "red":
            return t("quoteAppearancePanel.accentColorSwatches.red");
        default:
            return avatarColor;
    }
}
