import type { CompanyContact } from "@libraries/plaster-calculator-common";
import {
    Avatar,
    Badge,
    Box,
    Button,
    ButtonLink,
    Text,
} from "@libraries/uikit-web";
import { Mail, Pencil, Trash2, X } from "lucide-react";
import type { ReactElement } from "react";

import { CompanyContactFormFields } from "./company-contact-form-fields.component.tsx";
import type { CompanyContactFormValues } from "./company-contact-form-fields.types.ts";
import { useCompaniesTranslation } from "./i18n/index.ts";

export type CompanyContactRowProps = {
    readonly contact: CompanyContact;
    readonly isPrimary: boolean;
    readonly isEditing: boolean;
    readonly editValues: CompanyContactFormValues;
    readonly onEditValuesChange: (
        patch: Partial<CompanyContactFormValues>,
    ) => void;
    readonly onStartEdit: () => void;
    readonly onCancelEdit: () => void;
    readonly onSaveEdit: () => void;
    readonly onDelete: () => void;
};

/** One row in the company page's Contacts card: an avatar summary, or -- while `isEditing` -- its inline edit form. */
export function CompanyContactRow({
    contact,
    isPrimary,
    isEditing,
    editValues,
    onEditValuesChange,
    onStartEdit,
    onCancelEdit,
    onSaveEdit,
    onDelete,
}: CompanyContactRowProps): ReactElement {
    const { t } = useCompaniesTranslation();

    if (isEditing) {
        return (
            <Box direction="column" gap="md">
                <CompanyContactFormFields
                    idPrefix={`company-contact-${contact.id}`}
                    values={editValues}
                    onChange={onEditValuesChange}
                />
                <Box direction="row" gap="sm">
                    <Button
                        variant="primary"
                        type="button"
                        onClick={onSaveEdit}
                    >
                        {t("companyContactRow.save")}
                    </Button>
                    <Button
                        variant="secondary"
                        icon={<X size={18} aria-hidden="true" />}
                        label={t("companyContactRow.cancelEdit")}
                        type="button"
                        onClick={onCancelEdit}
                    />
                </Box>
            </Box>
        );
    }

    return (
        <Box direction="row" align="center" gap="md">
            <Avatar initials={initialsFor(contact.name)} />
            <Box direction="column" gap="xs" grow>
                <Box direction="row" align="center" gap="sm">
                    <Text weight="semibold">{contact.name}</Text>
                    {isPrimary && (
                        <Badge color="indigo" variant="pill">
                            {t("companyContactRow.primaryBadge")}
                        </Badge>
                    )}
                    <Text size="sm" variant="muted">
                        {contact.role ?? t("companyContactRow.noRole")}
                    </Text>
                </Box>
                <Text size="sm" variant="muted" truncate>
                    {contact.email ?? t("companyContactRow.noEmail")}
                    {" · "}
                    {contact.phoneNumber ?? t("companyContactRow.noPhone")}
                </Text>
            </Box>
            <Box direction="row" gap="sm">
                <Button
                    variant="secondary"
                    icon={<Pencil size={18} aria-hidden="true" />}
                    label={t("companyContactRow.edit")}
                    type="button"
                    onClick={onStartEdit}
                />
                {contact.email !== null && (
                    <ButtonLink
                        variant="secondary"
                        href={`mailto:${contact.email}`}
                        label={t("companyContactRow.email", {
                            name: contact.name,
                        })}
                    >
                        <Mail size={18} aria-hidden="true" />
                    </ButtonLink>
                )}
                <Button
                    variant="secondary"
                    icon={<Trash2 size={18} aria-hidden="true" />}
                    label={t("companyContactRow.delete")}
                    type="button"
                    onClick={onDelete}
                />
            </Box>
        </Box>
    );
}

function initialsFor(name: string): string {
    const initials = name
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");
    return initials || "?";
}
