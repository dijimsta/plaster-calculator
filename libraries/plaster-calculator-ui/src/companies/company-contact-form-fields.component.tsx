import {
    Box,
    Checkbox,
    FormLayoutField,
    Input,
    Label,
} from "@libraries/uikit-web";
import type { ReactElement } from "react";

import type { CompanyContactFormValues } from "./company-contact-form-fields.types.ts";
import { useCompaniesTranslation } from "./i18n/index.ts";

export type { CompanyContactFormValues };

export type CompanyContactFormFieldsProps = {
    readonly idPrefix: string;
    readonly values: CompanyContactFormValues;
    readonly showPrimaryCheckbox?: boolean;
    readonly onChange: (patch: Partial<CompanyContactFormValues>) => void;
};

/** The name/email/phone/role fields shared by the "add contact" modal and an in-place contact row edit. */
export function CompanyContactFormFields({
    idPrefix,
    values,
    showPrimaryCheckbox = false,
    onChange,
}: CompanyContactFormFieldsProps): ReactElement {
    const { t } = useCompaniesTranslation();

    return (
        <Box direction="column" gap="md">
            <FormLayoutField
                label={t("companyContactFormFields.name")}
                htmlFor={`${idPrefix}-name`}
            >
                <Input
                    id={`${idPrefix}-name`}
                    value={values.name}
                    onChange={(event) => onChange({ name: event.target.value })}
                />
            </FormLayoutField>
            <FormLayoutField
                label={t("companyContactFormFields.email")}
                htmlFor={`${idPrefix}-email`}
            >
                <Input
                    id={`${idPrefix}-email`}
                    type="email"
                    value={values.email}
                    onChange={(event) =>
                        onChange({ email: event.target.value })
                    }
                />
            </FormLayoutField>
            <FormLayoutField
                label={t("companyContactFormFields.phoneNumber")}
                htmlFor={`${idPrefix}-phone`}
            >
                <Input
                    id={`${idPrefix}-phone`}
                    type="tel"
                    value={values.phoneNumber}
                    onChange={(event) =>
                        onChange({ phoneNumber: event.target.value })
                    }
                />
            </FormLayoutField>
            <FormLayoutField
                label={t("companyContactFormFields.role")}
                htmlFor={`${idPrefix}-role`}
            >
                <Input
                    id={`${idPrefix}-role`}
                    value={values.role}
                    onChange={(event) => onChange({ role: event.target.value })}
                />
            </FormLayoutField>
            {showPrimaryCheckbox && (
                <Box direction="row" gap="sm" align="center">
                    <Checkbox
                        id={`${idPrefix}-make-primary`}
                        checked={values.makePrimary}
                        onChange={(event) =>
                            onChange({ makePrimary: event.target.checked })
                        }
                    />
                    <Label htmlFor={`${idPrefix}-make-primary`}>
                        {t("companyContactFormFields.makePrimary")}
                    </Label>
                </Box>
            )}
        </Box>
    );
}
