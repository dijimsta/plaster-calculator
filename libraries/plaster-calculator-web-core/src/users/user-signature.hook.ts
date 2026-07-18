"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { userSignaturesService } from "./user-signatures.service.ts";

import type {
    EmailSignature,
    UserSignature,
} from "@libraries/plaster-calculator-common";

const userSignatureQueryKey = ["user-signature"] as const;

export interface UseUserSignatureResult {
    readonly signature: UserSignature | undefined;
    readonly loading: boolean;
    readonly saving: boolean;
    readonly error: Error | null;
    readonly saveSignature: (
        payload: Partial<EmailSignature>,
    ) => Promise<UserSignature>;
}

export function useUserSignature(): UseUserSignatureResult {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: userSignatureQueryKey,
        queryFn: () => userSignaturesService.getSignature(),
    });

    const mutation = useMutation({
        mutationFn: (payload: Partial<EmailSignature>) =>
            userSignaturesService.updateSignature(payload),
        onSuccess: (next) => {
            queryClient.setQueryData(userSignatureQueryKey, next);
        },
    });

    return {
        signature: query.data,
        loading: query.isLoading,
        saving: mutation.isPending,
        error: query.error ?? mutation.error,
        saveSignature: mutation.mutateAsync,
    };
}
