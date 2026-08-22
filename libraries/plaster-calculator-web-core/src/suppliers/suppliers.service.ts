import * as DataConnector from "@generated/data-connector-web";
import { QueryFetchPolicy, type DataConnect } from "firebase/data-connect";

import { FirebaseService } from "../firebase/firebase.service.ts";

import type {
    Supplier,
    SupplierItemEstimate,
    SupplierPayload,
} from "./suppliers.types.ts";

type SupplierRow = DataConnector.ListMySuppliersData["suppliers"][number];
type SupplierScalarRow = Omit<SupplierRow, "prices">;
type SupplierItemEstimateRow =
    DataConnector.ListMySupplierPricesData["supplierQuoteItemPrices"][number];

/**
 * Wraps the WORK-378 `Supplier`/`SupplierQuoteItemPrice` operations
 * (`data/connector-web/suppliers.queries.gql`/`suppliers.mutations.gql`),
 * following `CompaniesService` (`../companies/companies.service.ts`): every
 * write re-reads and returns the affected `Supplier` afterwards, so callers
 * never work from a stale pre-write snapshot. `listSuppliers`/`getSupplier`/
 * `listSupplierEstimates` all force `SERVER_ONLY` -- unlike
 * `CompaniesService`'s `getCompany`, which relies on Data Connect's default
 * (cache-permitting) fetch policy -- because `suppliers.hooks.ts` refreshes
 * these through both this re-read-after-write pattern and a `useQuery`
 * refetch triggered by cache invalidation; either path would silently
 * re-serve a stale Data Connect-level cache entry without it.
 */
export class SuppliersService {
    public constructor(
        private readonly dataConnect: DataConnect = FirebaseService.getDataConnect(
            DataConnector.connectorConfig,
        ),
    ) {}

    /**
     * Lists the current team's suppliers, optionally filtered by search
     * term and paginated via `limit`/`offset`.
     *
     * @param options - Search and pagination controls forwarded to
     *   `ListMySuppliers`.
     * @returns The matching suppliers, most recently updated first.
     */
    public async listSuppliers(options?: {
        search?: string;
        limit?: number;
        offset?: number;
    }): Promise<Supplier[]> {
        const result = await DataConnector.listMySuppliers(
            this.dataConnect,
            { ...options },
            { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
        );
        return result.data.suppliers.map((supplier) =>
            this.toSupplier(supplier, supplier.prices.length),
        );
    }

    public async getSupplier(supplierId: string): Promise<Supplier> {
        const result = await DataConnector.getMySupplier(
            this.dataConnect,
            { id: supplierId },
            { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
        );
        if (!result.data.supplier) {
            throw new Error("Supplier was not found.");
        }
        return this.toSupplier(
            result.data.supplier,
            result.data.supplier.supplierQuoteItemPrices_on_supplier.length,
        );
    }

    /**
     * Lists one supplier's priced items, joined with each priced
     * `QuoteItemTemplate`'s display fields, via `ListMySupplierPrices`.
     */
    public async listSupplierEstimates(
        supplierId: string,
    ): Promise<SupplierItemEstimate[]> {
        const result = await DataConnector.listMySupplierPrices(
            this.dataConnect,
            { supplierId },
            { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
        );
        return result.data.supplierQuoteItemPrices.map((price) =>
            this.toSupplierItemEstimate(price),
        );
    }

    public async createSupplier(
        payload: SupplierPayload & { name: string },
    ): Promise<Supplier> {
        const supplierId = crypto.randomUUID();
        await DataConnector.createMySupplier(this.dataConnect, {
            id: supplierId,
            name: payload.name,
            contactName: payload.contactName,
            phoneNumber: payload.phoneNumber,
            email: payload.email,
            address: payload.address,
            accountNumber: payload.accountNumber,
        });
        return this.getSupplier(supplierId);
    }

    public async updateSupplier(
        supplierId: string,
        payload: SupplierPayload,
    ): Promise<Supplier> {
        const supplier = await this.getSupplier(supplierId);
        await DataConnector.updateMySupplier(this.dataConnect, {
            id: supplierId,
            name: payload.name ?? supplier.name,
            contactName:
                payload.contactName === undefined
                    ? supplier.contactName
                    : payload.contactName,
            phoneNumber:
                payload.phoneNumber === undefined
                    ? supplier.phoneNumber
                    : payload.phoneNumber,
            email: payload.email === undefined ? supplier.email : payload.email,
            address:
                payload.address === undefined
                    ? supplier.address
                    : payload.address,
            accountNumber:
                payload.accountNumber === undefined
                    ? supplier.accountNumber
                    : payload.accountNumber,
        });
        return this.getSupplier(supplierId);
    }

    public async deleteSupplier(supplierId: string): Promise<void> {
        await DataConnector.deleteMySupplier(this.dataConnect, {
            id: supplierId,
        });
    }

    /**
     * Promotes a supplier to the team's default via `SetMyDefaultSupplier`,
     * which demotes whichever supplier previously held `isDefault: true` in
     * the same transaction.
     */
    public async setDefaultSupplier(supplierId: string): Promise<Supplier> {
        await DataConnector.setMyDefaultSupplier(this.dataConnect, {
            id: supplierId,
        });
        return this.getSupplier(supplierId);
    }

    /** Sets (or replaces) a supplier's price for one quote item template. */
    public async upsertSupplierItemEstimate(
        supplierId: string,
        templateId: string,
        materialUnitPriceCents: number,
    ): Promise<void> {
        await DataConnector.upsertMySupplierItemPrice(this.dataConnect, {
            supplierId,
            templateId,
            materialUnitPriceCents,
        });
    }

    /**
     * Blanks a supplier's price for one quote item template -- deletes the
     * row rather than storing `0`, so "no estimate" and "free" stay
     * distinguishable (matches `DeleteMySupplierItemPrice`'s doc comment).
     */
    public async clearSupplierItemEstimate(
        supplierId: string,
        templateId: string,
    ): Promise<void> {
        await DataConnector.deleteMySupplierItemPrice(this.dataConnect, {
            supplierId,
            templateId,
        });
    }

    private toSupplier(
        supplier: SupplierScalarRow,
        pricedItemCount: number,
    ): Supplier {
        return {
            id: supplier.id,
            teamId: supplier.teamId,
            name: supplier.name,
            isDefault: supplier.isDefault,
            contactName: supplier.contactName ?? null,
            phoneNumber: supplier.phoneNumber ?? null,
            email: supplier.email ?? null,
            address: supplier.address ?? null,
            accountNumber: supplier.accountNumber ?? null,
            pricedItemCount,
            createdAt: supplier.createdAt,
            updatedAt: supplier.updatedAt,
        };
    }

    private toSupplierItemEstimate(
        price: SupplierItemEstimateRow,
    ): SupplierItemEstimate {
        return {
            supplierId: price.supplierId,
            templateId: price.templateId,
            templateName: price.template.name,
            unit: price.template.unit ?? null,
            materialUnitPriceCents: price.materialUnitPriceCents,
            createdAt: price.createdAt,
            updatedAt: price.updatedAt,
        };
    }
}

// No provider wraps this service yet -- the suppliers routes and the margin
// card don't need a shared instance the way `projects` needs `companies`
// (see `../companies/companies.provider.tsx`) -- so `suppliers.hooks.ts`
// imports this singleton directly, the same way `quote-appearance.service.ts`
// exports `quoteAppearanceService` and `user-signatures.service.ts` exports
// `userSignaturesService` for their own provider-less hooks.
export const suppliersService = new SuppliersService();
