"use client";

import type { QuoteAppearance } from "@libraries/plaster-calculator-common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { quoteAppearanceService } from "./quote-appearance.service.ts";

const quoteAppearanceQueryKey = ["quote-appearance"] as const;

export type UseQuoteAppearanceResult = {
    readonly appearance: QuoteAppearance | undefined;
    readonly loading: boolean;
    readonly saving: boolean;
    readonly error: Error | null;
    readonly save: (
        payload: Partial<QuoteAppearance>,
    ) => Promise<QuoteAppearance>;
    readonly uploadingLogo: boolean;
    readonly uploadLogo: (file: File) => Promise<string>;
    readonly removeLogo: () => Promise<void>;
};

/**
 * Reads and saves the calling team's `QuoteAppearance` settings, shaped
 * after `useUserSignature()` (`../users/user-signature.hook.ts`) so the
 * appearance settings panel (a later ticket) can bind to it the same way
 * `EmailSignaturePanel` binds to `useUserSignature()` — `appearance` /
 * `loading` / `saving` / `error` / `save` mirror that hook's
 * `signature` / `loading` / `saving` / `error` / `saveSignature` exactly.
 *
 * `uploadLogo`/`removeLogo` wrap `quoteAppearanceService`'s Storage
 * operations and, on success, write the result straight into this hook's
 * query cache — the same `onSuccess` pattern `save` uses — so the panel
 * doesn't need a separate refetch to see the new (or cleared) logo.
 */
export function useQuoteAppearance(): UseQuoteAppearanceResult {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: quoteAppearanceQueryKey,
        queryFn: () => quoteAppearanceService.getAppearance(),
    });

    const mutation = useMutation({
        mutationFn: (payload: Partial<QuoteAppearance>) =>
            quoteAppearanceService.saveAppearance(payload),
        onSuccess: (next) => {
            queryClient.setQueryData(quoteAppearanceQueryKey, next);
        },
    });

    const uploadLogoMutation = useMutation({
        mutationFn: (file: File) => quoteAppearanceService.uploadLogo(file),
        onSuccess: () => {
            // `uploadLogo()` resolves a download URL, not the saved
            // `QuoteAppearance` row, so the new `logoStoragePath` is picked
            // up by refetching rather than patched in from the result.
            void queryClient.invalidateQueries({
                queryKey: quoteAppearanceQueryKey,
            });
        },
    });

    const removeLogoMutation = useMutation({
        mutationFn: () => quoteAppearanceService.removeLogo(),
        onSuccess: () => {
            queryClient.setQueryData<QuoteAppearance>(
                quoteAppearanceQueryKey,
                (previous) =>
                    previous && { ...previous, logoStoragePath: null },
            );
        },
    });

    return {
        appearance: query.data,
        loading: query.isLoading,
        saving: mutation.isPending,
        error: query.error ?? mutation.error,
        save: mutation.mutateAsync,
        uploadingLogo: uploadLogoMutation.isPending,
        uploadLogo: uploadLogoMutation.mutateAsync,
        removeLogo: removeLogoMutation.mutateAsync,
    };
}
