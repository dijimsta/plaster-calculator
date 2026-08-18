import type { CompanyContact } from "@libraries/plaster-calculator-common";
import {
    Box,
    Button,
    Card,
    Divider,
    FormLayoutField,
    Grid,
    Input,
    SelectMenu,
} from "@libraries/uikit-web";
import { Trash2 } from "lucide-react";
import type { ReactElement } from "react";

import type { CompanyDetailFormValues } from "./company-detail-card.types.ts";
import { useCompaniesTranslation } from "./i18n/index.ts";

export type { CompanyDetailFormValues };

export type CompanyDetailCardProps = {
    readonly values: CompanyDetailFormValues;
    readonly contacts: readonly CompanyContact[];
    readonly hasChanges: boolean;
    readonly onChange: (patch: Partial<CompanyDetailFormValues>) => void;
    readonly onSave: () => void;
    readonly onDelete: () => void;
};

/** The company detail page's "Details" card: company identity fields plus save/delete actions. */
export function CompanyDetailCard({
    values,
    contacts,
    hasChanges,
    onChange,
    onSave,
    onDelete,
}: CompanyDetailCardProps): ReactElement {
    const { t } = useCompaniesTranslation();

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onSave();
            }}
        >
            <Card>
                <Card.Title>{t("companyDetailCard.title")}</Card.Title>
                <Box direction="column" gap="lg">
                    <Grid columns={{ xs: 1, sm: 6 }} gap="md">
                        <FormLayoutField
                            label={t("companyDetailCard.fields.companyName")}
                            htmlFor="company-detail-company-name"
                            span="half"
                        >
                            <Input
                                id="company-detail-company-name"
                                value={values.companyName}
                                onChange={(event) =>
                                    onChange({
                                        companyName: event.target.value,
                                    })
                                }
                            />
                        </FormLayoutField>
                        <FormLayoutField
                            label={t("companyDetailCard.fields.businessNumber")}
                            htmlFor="company-detail-business-number"
                            span="half"
                        >
                            <Input
                                id="company-detail-business-number"
                                value={values.businessNumber}
                                onChange={(event) =>
                                    onChange({
                                        businessNumber: event.target.value,
                                    })
                                }
                            />
                        </FormLayoutField>
                        <FormLayoutField
                            label={t("companyDetailCard.fields.phoneNumber")}
                            htmlFor="company-detail-phone-number"
                            span="half"
                        >
                            <Input
                                id="company-detail-phone-number"
                                type="tel"
                                value={values.phoneNumber}
                                onChange={(event) =>
                                    onChange({
                                        phoneNumber: event.target.value,
                                    })
                                }
                            />
                        </FormLayoutField>
                        <FormLayoutField
                            label={t("companyDetailCard.fields.primaryContact")}
                            htmlFor="company-detail-primary-contact"
                            span="half"
                        >
                            <SelectMenu
                                id="company-detail-primary-contact"
                                value={values.primaryContactId}
                                options={[
                                    {
                                        value: "",
                                        label: t(
                                            "companyDetailCard.fields.noPrimaryContact",
                                        ),
                                    },
                                    ...contacts.map((contact) => ({
                                        value: contact.id,
                                        label: contact.name,
                                    })),
                                ]}
                                onChange={(event) =>
                                    onChange({
                                        primaryContactId: event.target.value,
                                    })
                                }
                            />
                        </FormLayoutField>
                    </Grid>
                    <Divider />
                    <Box direction="row" justify="between" align="center">
                        <Button
                            variant="dangerSoft"
                            icon={<Trash2 size={18} aria-hidden="true" />}
                            title={t("companyDetailCard.deleteTitle")}
                            type="button"
                            onClick={onDelete}
                        >
                            {t("companyDetailCard.delete")}
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={!hasChanges}
                        >
                            {t("companyDetailCard.save")}
                        </Button>
                    </Box>
                </Box>
            </Card>
        </form>
    );
}
