"use client";

import {
    Avatar,
    Box,
    Button,
    FormLayoutField,
    Input,
} from "@libraries/uikit-web";
import { useState } from "react";
import type { ChangeEvent, ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

export type QuoteAppearanceLogoFieldProps = {
    /**
     * A resolved, previewable logo URL -- only ever set after a successful
     * upload this session (see this component's own doc comment for why a
     * previously-saved logo has no preview URL to fall back to).
     */
    readonly logoUrl: string | null;
    /** Whether the team's saved `QuoteAppearance.logoStoragePath` is set, independent of `logoUrl`. */
    readonly hasSavedLogo: boolean;
    readonly uploading: boolean;
    readonly disabled?: boolean;
    readonly onUpload: (file: File) => void;
    readonly onRemove: () => void;
};

/**
 * The team's letterhead logo: current state plus upload/replace and remove
 * controls, wired to `useQuoteAppearance()`'s `uploadLogo`/`removeLogo`/
 * `uploadingLogo` (WORK-203) by this panel's parent. A logo the team saved
 * in an earlier session has no resolvable preview URL here -- resolving
 * `QuoteAppearance.logoStoragePath` into a fetchable URL is deferred to
 * WORK-207, the same gap `QuoteDetailDocumentProps.logoUrl`'s doc comment
 * documents -- so this shows the placeholder avatar with a "logo saved" note
 * instead of a broken image; only a logo uploaded *this session* (returned
 * directly by `uploadLogo()`) gets an actual preview.
 *
 * Wraps a plain `Input` of `type="file"` -- UIKit has no dedicated
 * file-picker component yet, and this is the only control capable of
 * opening the OS file chooser, so this reuses the public, typed `Input` API
 * rather than adding raw markup or a custom-styled dropzone (see
 * `NewProjectForm`, `apps/plaster-calculator-web`, for the kind of
 * app-owned dropzone styling this library must not add). File-type/size
 * validation happens in `QuoteAppearanceService.uploadLogo()`
 * (`@libraries/plaster-calculator-web-core`); a rejected file surfaces
 * through this panel's own error notification rather than a client-side
 * `accept` filter, which `Input` doesn't expose.
 */
export function QuoteAppearanceLogoField({
    logoUrl,
    hasSavedLogo,
    uploading,
    disabled = false,
    onUpload,
    onRemove,
}: QuoteAppearanceLogoFieldProps): ReactElement {
    const { t } = useQuotesTranslation();
    // Remounts the file input after every selection so choosing the same
    // file twice in a row (e.g. retrying after a validation error) still
    // fires a change event -- browsers don't fire `change` when a file
    // input's value is set to the same file it already holds.
    const [inputKey, setInputKey] = useState(0);
    const isDisabled = disabled || uploading;
    const hasLogo = logoUrl !== null || hasSavedLogo;

    function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files?.[0];
        setInputKey((key) => key + 1);
        if (file) {
            onUpload(file);
        }
    }

    return (
        <FormLayoutField
            label={t("quoteAppearancePanel.logoLabel")}
            description={logoStateDescription(t, hasLogo, logoUrl, uploading)}
        >
            <Box direction="row" align="center" gap="md" wrap>
                <Avatar
                    src={logoUrl ?? undefined}
                    alt={t("quoteDetailDocument.logoAlt")}
                    shape="square"
                    size="lg"
                />
                <Box direction="column" gap="xs">
                    <Input
                        key={inputKey}
                        type="file"
                        label={
                            hasLogo
                                ? t("quoteAppearancePanel.replaceLogo")
                                : t("quoteAppearancePanel.uploadLogo")
                        }
                        disabled={isDisabled}
                        onChange={handleFileChange}
                    />
                    {hasLogo && (
                        <Box>
                            <Button
                                type="button"
                                variant="secondary"
                                size="small"
                                disabled={isDisabled}
                                onClick={onRemove}
                            >
                                {t("quoteAppearancePanel.removeLogo")}
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </FormLayoutField>
    );
}

function logoStateDescription(
    t: ReturnType<typeof useQuotesTranslation>["t"],
    hasLogo: boolean,
    logoUrl: string | null,
    uploading: boolean,
): string {
    if (uploading) {
        return t("quoteAppearancePanel.uploadingLogo");
    }
    if (logoUrl !== null) {
        return t("quoteAppearancePanel.logoDescriptionUploaded");
    }
    if (hasLogo) {
        return t("quoteAppearancePanel.logoDescriptionSaved");
    }
    return t("quoteAppearancePanel.logoDescriptionEmpty");
}
