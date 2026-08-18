import type { CompanyContact } from "@libraries/plaster-calculator-common";
import {
    Box,
    Button,
    Card,
    EmptyState,
    StackedList,
} from "@libraries/uikit-web";
import { Plus, Users } from "lucide-react";
import type { ReactElement } from "react";

import type { CompanyContactFormValues } from "./company-contact-form-fields.types.ts";
import { CompanyContactRow } from "./company-contact-row.component.tsx";
import { useCompaniesTranslation } from "./i18n/index.ts";

export type CompanyContactsCardProps = {
    readonly contacts: readonly CompanyContact[];
    readonly primaryContactId: string | null;
    readonly editingContactId: string | null;
    readonly editValues: CompanyContactFormValues;
    readonly onEditValuesChange: (
        patch: Partial<CompanyContactFormValues>,
    ) => void;
    readonly onStartEdit: (contactId: string) => void;
    readonly onCancelEdit: () => void;
    readonly onSaveEdit: (contactId: string) => void;
    readonly onDelete: (contact: CompanyContact) => void;
    readonly onAddContact: () => void;
};

/** The company detail page's "Contacts" card: every contact, editable in place, plus adding a new one. */
export function CompanyContactsCard({
    contacts,
    primaryContactId,
    editingContactId,
    editValues,
    onEditValuesChange,
    onStartEdit,
    onCancelEdit,
    onSaveEdit,
    onDelete,
    onAddContact,
}: CompanyContactsCardProps): ReactElement {
    const { t } = useCompaniesTranslation();

    return (
        <Card>
            <Box direction="row" align="center" justify="between">
                <Card.Title>{t("companyContactsCard.title")}</Card.Title>
                <Button
                    variant="primary"
                    icon={<Plus size={18} aria-hidden="true" />}
                    type="button"
                    onClick={onAddContact}
                >
                    {t("companyContactsCard.add")}
                </Button>
            </Box>
            {contacts.length > 0 ? (
                <StackedList>
                    {contacts.map((contact) => (
                        <StackedList.Item key={contact.id}>
                            <CompanyContactRow
                                contact={contact}
                                isPrimary={contact.id === primaryContactId}
                                isEditing={editingContactId === contact.id}
                                editValues={editValues}
                                onEditValuesChange={onEditValuesChange}
                                onStartEdit={() => onStartEdit(contact.id)}
                                onCancelEdit={onCancelEdit}
                                onSaveEdit={() => onSaveEdit(contact.id)}
                                onDelete={() => onDelete(contact)}
                            />
                        </StackedList.Item>
                    ))}
                </StackedList>
            ) : (
                <EmptyState
                    icon={<Users />}
                    title={t("companyContactsCard.emptyStateTitle")}
                />
            )}
        </Card>
    );
}
