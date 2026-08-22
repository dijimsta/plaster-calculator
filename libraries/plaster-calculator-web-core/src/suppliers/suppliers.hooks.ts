"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
    type QueryClient,
} from "@tanstack/react-query";

import { suppliersService } from "./suppliers.service.ts";
import type {
    Supplier,
    SupplierItemEstimate,
    SupplierPayload,
} from "./suppliers.types.ts";

const SUPPLIERS_QUERY_KEY = "suppliers" as const;

function suppliersListQueryKey(options?: {
    search?: string;
    limit?: number;
    offset?: number;
}): readonly unknown[] {
    return [
        SUPPLIERS_QUERY_KEY,
        "list",
        options?.search ?? null,
        options?.limit ?? null,
        options?.offset ?? null,
    ];
}

function supplierDetailQueryKey(supplierId: string): readonly unknown[] {
    return [SUPPLIERS_QUERY_KEY, "detail", supplierId];
}

function supplierEstimatesQueryKey(supplierId: string): readonly unknown[] {
    return [SUPPLIERS_QUERY_KEY, "estimates", supplierId];
}

/**
 * Refreshes every cached suppliers list, regardless of the `search`/
 * `limit`/`offset` variables it was fetched with -- `invalidateQueries`
 * matches by key prefix, so `["suppliers", "list"]` covers every list
 * variant.
 */
function invalidateSupplierLists(queryClient: QueryClient): void {
    void queryClient.invalidateQueries({
        queryKey: [SUPPLIERS_QUERY_KEY, "list"],
    });
}

/**
 * Refreshes one supplier's detail query alongside every cached list --
 * `Supplier.pricedItemCount` is selected by both, so a write that changes
 * either the supplier's own fields or its priced-item count needs both to
 * refetch.
 */
function invalidateSupplier(
    queryClient: QueryClient,
    supplierId: string,
): void {
    invalidateSupplierLists(queryClient);
    void queryClient.invalidateQueries({
        queryKey: supplierDetailQueryKey(supplierId),
    });
}

/**
 * `SetMyDefaultSupplier` demotes whichever supplier currently holds
 * `isDefault: true` server-side -- an id the caller doesn't have -- so every
 * cached detail query is invalidated here, not just the one just promoted.
 */
function invalidateAllSupplierDetails(queryClient: QueryClient): void {
    void queryClient.invalidateQueries({
        queryKey: [SUPPLIERS_QUERY_KEY, "detail"],
    });
}

export type UseSuppliersResult = {
    readonly suppliers: Supplier[] | undefined;
    readonly loading: boolean;
    readonly error: Error | null;
};

/**
 * Lists the current team's suppliers, optionally filtered by search term
 * and paginated via `limit`/`offset`. Refetches whenever `options` changes,
 * since its values are folded into the query key.
 */
export function useSuppliers(options?: {
    search?: string;
    limit?: number;
    offset?: number;
}): UseSuppliersResult {
    const query = useQuery({
        queryKey: suppliersListQueryKey(options),
        queryFn: () => suppliersService.listSuppliers(options),
    });
    return {
        suppliers: query.data,
        loading: query.isLoading,
        error: query.error,
    };
}

export type UseSupplierResult = {
    readonly supplier: Supplier | undefined;
    readonly loading: boolean;
    readonly error: Error | null;
};

/** Reads one supplier by id. */
export function useSupplier(supplierId: string): UseSupplierResult {
    const query = useQuery({
        queryKey: supplierDetailQueryKey(supplierId),
        queryFn: () => suppliersService.getSupplier(supplierId),
    });
    return {
        supplier: query.data,
        loading: query.isLoading,
        error: query.error,
    };
}

export type UseSupplierEstimatesResult = {
    readonly estimates: SupplierItemEstimate[] | undefined;
    readonly loading: boolean;
    readonly error: Error | null;
};

/**
 * Reads one supplier's priced items -- the suppliers routes' pricing table
 * and the margin card both bind to this directly.
 */
export function useSupplierEstimates(
    supplierId: string,
): UseSupplierEstimatesResult {
    const query = useQuery({
        queryKey: supplierEstimatesQueryKey(supplierId),
        queryFn: () => suppliersService.listSupplierEstimates(supplierId),
    });
    return {
        estimates: query.data,
        loading: query.isLoading,
        error: query.error,
    };
}

export type UseCreateSupplierResult = {
    readonly createSupplier: (
        payload: SupplierPayload & { name: string },
    ) => Promise<Supplier>;
    readonly isCreating: boolean;
    readonly error: Error | null;
};

/** Creates a supplier, then refreshes every cached suppliers list. */
export function useCreateSupplier(): UseCreateSupplierResult {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (payload: SupplierPayload & { name: string }) =>
            suppliersService.createSupplier(payload),
        onSuccess: () => invalidateSupplierLists(queryClient),
    });

    return {
        createSupplier: mutation.mutateAsync,
        isCreating: mutation.isPending,
        error: mutation.error,
    };
}

export type UpdateSupplierInput = {
    readonly supplierId: string;
    readonly payload: SupplierPayload;
};

export type UseUpdateSupplierResult = {
    readonly updateSupplier: (input: UpdateSupplierInput) => Promise<Supplier>;
    readonly isUpdating: boolean;
    readonly error: Error | null;
};

/** Updates a supplier, then refreshes its detail query and every list. */
export function useUpdateSupplier(): UseUpdateSupplierResult {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (input: UpdateSupplierInput) =>
            suppliersService.updateSupplier(input.supplierId, input.payload),
        onSuccess: (_result, input) =>
            invalidateSupplier(queryClient, input.supplierId),
    });

    return {
        updateSupplier: mutation.mutateAsync,
        isUpdating: mutation.isPending,
        error: mutation.error,
    };
}

export type UseDeleteSupplierResult = {
    readonly deleteSupplier: (supplierId: string) => Promise<void>;
    readonly isDeleting: boolean;
    readonly error: Error | null;
};

/**
 * Deletes a supplier, then drops its now-invalid detail/estimates cache
 * entries outright (`removeQueries`, rather than `invalidateQueries`, since
 * refetching a deleted row would just fail) and refreshes every list.
 */
export function useDeleteSupplier(): UseDeleteSupplierResult {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (supplierId: string) =>
            suppliersService.deleteSupplier(supplierId),
        onSuccess: (_result, supplierId) => {
            invalidateSupplierLists(queryClient);
            queryClient.removeQueries({
                queryKey: supplierDetailQueryKey(supplierId),
            });
            queryClient.removeQueries({
                queryKey: supplierEstimatesQueryKey(supplierId),
            });
        },
    });

    return {
        deleteSupplier: mutation.mutateAsync,
        isDeleting: mutation.isPending,
        error: mutation.error,
    };
}

export type UseSetDefaultSupplierResult = {
    readonly setDefaultSupplier: (supplierId: string) => Promise<Supplier>;
    readonly isSettingDefault: boolean;
    readonly error: Error | null;
};

/**
 * Promotes a supplier to the team's default, then refreshes every cached
 * list and detail query -- see `invalidateAllSupplierDetails()`'s comment
 * for why the previously-default supplier's detail can't be targeted
 * directly.
 */
export function useSetDefaultSupplier(): UseSetDefaultSupplierResult {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (supplierId: string) =>
            suppliersService.setDefaultSupplier(supplierId),
        onSuccess: () => {
            invalidateSupplierLists(queryClient);
            invalidateAllSupplierDetails(queryClient);
        },
    });

    return {
        setDefaultSupplier: mutation.mutateAsync,
        isSettingDefault: mutation.isPending,
        error: mutation.error,
    };
}

export type UpsertSupplierItemEstimateInput = {
    readonly supplierId: string;
    readonly templateId: string;
    readonly materialUnitPriceCents: number;
};

export type UseUpsertSupplierItemEstimateResult = {
    readonly upsertSupplierItemEstimate: (
        input: UpsertSupplierItemEstimateInput,
    ) => Promise<void>;
    readonly isSaving: boolean;
    readonly error: Error | null;
};

/**
 * Sets (or replaces) a supplier's price for one quote item template, then
 * refreshes its estimates, detail, and every list -- `pricedItemCount` is
 * selected by both the detail and list queries.
 */
export function useUpsertSupplierItemEstimate(): UseUpsertSupplierItemEstimateResult {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (input: UpsertSupplierItemEstimateInput) =>
            suppliersService.upsertSupplierItemEstimate(
                input.supplierId,
                input.templateId,
                input.materialUnitPriceCents,
            ),
        onSuccess: (_result, input) => {
            invalidateSupplier(queryClient, input.supplierId);
            void queryClient.invalidateQueries({
                queryKey: supplierEstimatesQueryKey(input.supplierId),
            });
        },
    });

    return {
        upsertSupplierItemEstimate: mutation.mutateAsync,
        isSaving: mutation.isPending,
        error: mutation.error,
    };
}

export type ClearSupplierItemEstimateInput = {
    readonly supplierId: string;
    readonly templateId: string;
};

export type UseClearSupplierItemEstimateResult = {
    readonly clearSupplierItemEstimate: (
        input: ClearSupplierItemEstimateInput,
    ) => Promise<void>;
    readonly isClearing: boolean;
    readonly error: Error | null;
};

/**
 * Blanks a supplier's price for one quote item template -- see
 * `useUpsertSupplierItemEstimate()` for the matching write/invalidation
 * shape.
 */
export function useClearSupplierItemEstimate(): UseClearSupplierItemEstimateResult {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (input: ClearSupplierItemEstimateInput) =>
            suppliersService.clearSupplierItemEstimate(
                input.supplierId,
                input.templateId,
            ),
        onSuccess: (_result, input) => {
            invalidateSupplier(queryClient, input.supplierId);
            void queryClient.invalidateQueries({
                queryKey: supplierEstimatesQueryKey(input.supplierId),
            });
        },
    });

    return {
        clearSupplierItemEstimate: mutation.mutateAsync,
        isClearing: mutation.isPending,
        error: mutation.error,
    };
}
