import {
    Avatar,
    Box,
    RadioGroup,
    RadioGroupOption,
    Text,
    type AvatarColor,
} from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { QUOTE_APPEARANCE_ACCENT_COLOR_SWATCHES } from "./quote-appearance-panel.utils.ts";

export type QuoteAppearanceAccentColorFieldProps = {
    readonly value: string;
    readonly disabled?: boolean;
    readonly onChange: (value: string) => void;
};

/**
 * The team's accent-colour picker: a fixed set of swatches (see
 * `QUOTE_APPEARANCE_ACCENT_COLOR_SWATCHES`'s doc comment for why it's closed
 * rather than a free colour picker), rendered as a `RadioGroup` "small-cards"
 * layout so exactly one swatch is ever selected. Each option's visible
 * swatch is a small decorative `Avatar` in that swatch's own `avatarColor`
 * -- the only public UIKit API that paints a flat colour chip -- with an
 * empty `initials` string so it renders its coloured background with no
 * visible glyph.
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
            legend={t("quoteAppearancePanel.accentColorLabel")}
            description={t("quoteAppearancePanel.accentColorDescription")}
            variant="small-cards"
            disabled={disabled}
        >
            {QUOTE_APPEARANCE_ACCENT_COLOR_SWATCHES.map((swatch) => (
                <RadioGroupOption
                    key={swatch.value}
                    value={swatch.value}
                    checked={value === swatch.value}
                    onChange={() => onChange(swatch.value)}
                    label={
                        <Box direction="row" align="center" gap="xs">
                            <Avatar
                                color={swatch.avatarColor}
                                initials=""
                                size="xs"
                            />
                            <Text size="sm">
                                {accentColorSwatchLabel(t, swatch.avatarColor)}
                            </Text>
                        </Box>
                    }
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
