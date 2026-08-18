import { Box, Checkbox, Label, Paragraph } from "@libraries/uikit-web";
import type { ChangeEventHandler, ReactElement } from "react";

export type QuoteAppearanceCheckboxFieldProps = {
    readonly id: string;
    readonly label: string;
    readonly description: string;
    readonly checked: boolean;
    readonly disabled?: boolean;
    readonly onChange: ChangeEventHandler<HTMLInputElement>;
};

/**
 * One boolean "what the builder sees" row: a checkbox beside its bold label
 * and muted description, for `QuoteAppearanceBuilderSection`'s scope of
 * work / take-off summary / signature block toggles. Distinct from
 * `FormLayoutField`, whose label sits above rather than beside its control
 * -- this checkbox-list layout needs the control and its label on the same
 * line, per this panel's target design.
 */
export function QuoteAppearanceCheckboxField({
    id,
    label,
    description,
    checked,
    disabled = false,
    onChange,
}: QuoteAppearanceCheckboxFieldProps): ReactElement {
    return (
        <Box direction="row" gap="sm" align="start">
            <Checkbox
                id={id}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
            />
            <Box direction="column" gap="xs">
                <Label htmlFor={id}>{label}</Label>
                <Paragraph textSize="sm" variant="muted">
                    {description}
                </Paragraph>
            </Box>
        </Box>
    );
}
