/**
 * A team's supplier -- the WORK-377 `Supplier` table's writable fields plus
 * `isDefault` (kept unique per team via `SetMyDefaultSupplier`, and used to
 * pre-select a quote's supplier) and `pricedItemCount`, a client-side count
 * of how many `QuoteItemTemplate`s this supplier has a price for. Both
 * `ListMySuppliers` and `GetMySupplier`
 * (`data/connector-web/suppliers.queries.gql`) select their respective
 * priced-items collection purely to derive this count -- the full priced
 * rows, joined with each item's display fields, are `SupplierItemEstimate`
 * below, read via `ListMySupplierPrices`/`useSupplierEstimates` instead.
 *
 * There is no shared `Supplier` contract in `@libraries/plaster-calculator-common`
 * yet -- WORK-380 is scoped to this package only -- so this type is defined
 * locally rather than inferred from a Zod schema, the same way
 * `CompanyPayload`/`CompanyContactPayload` (`../companies/companies.types.ts`)
 * stay local rather than widening a common schema.
 */
export type Supplier = {
    readonly id: string;
    readonly teamId: string;
    readonly name: string;
    readonly isDefault: boolean;
    readonly contactName: string | null;
    readonly phoneNumber: string | null;
    readonly email: string | null;
    readonly address: string | null;
    readonly accountNumber: string | null;
    readonly pricedItemCount: number;
    readonly createdAt: string;
    readonly updatedAt: string;
};

/**
 * One `SupplierQuoteItemPrice` row (WORK-377), joined with its priced
 * `QuoteItemTemplate`'s display fields the same way `ListMySupplierPrices`
 * (`data/connector-web/suppliers.queries.gql`) selects them, for rendering a
 * supplier's per-item pricing table (the suppliers routes' estimate editor
 * and the margin card). `materialUnitPriceCents` stays in cents, matching
 * every other money field in this package -- currency-unit conversion is a
 * presentation concern for `plaster-calculator-ui`, not this service.
 */
export type SupplierItemEstimate = {
    readonly supplierId: string;
    readonly templateId: string;
    readonly templateName: string;
    readonly unit: string | null;
    readonly materialUnitPriceCents: number;
    readonly createdAt: string;
    readonly updatedAt: string;
};

/**
 * Optional-field write payload for `createSupplier`/`updateSupplier`,
 * shaped after `CompanyPayload` (`../companies/companies.types.ts`):
 * `undefined` means "leave unchanged" on an update, `null` means "clear the
 * field" for the nullable contact fields.
 */
export type SupplierPayload = {
    name?: string;
    contactName?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    address?: string | null;
    accountNumber?: string | null;
};
