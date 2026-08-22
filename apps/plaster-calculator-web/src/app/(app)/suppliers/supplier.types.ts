import type {
    NewSupplierFormValues,
    SupplierDetailFormValues,
} from "@libraries/plaster-calculator-ui";

export type SupplierDraft = NewSupplierFormValues;

export type SupplierDetailDraft = SupplierDetailFormValues;

export const EMPTY_SUPPLIER_DRAFT: SupplierDraft = {
    name: "",
    phoneNumber: "",
    accountNumber: "",
};
