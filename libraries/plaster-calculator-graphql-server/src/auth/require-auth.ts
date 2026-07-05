import { getAuth } from "firebase-admin/auth";
import { GraphQLError } from "graphql";

import type { DecodedIdToken } from "firebase-admin/auth";

const BEARER_PREFIX = "Bearer ";

/**
 * Constructs the `GraphQLError` resolvers and auth parsing throw for a missing, malformed, or
 * invalid/expired ID token, so both call sites report the same recognized error code.
 */
export function unauthenticatedError(
    message = "Must be signed in.",
): GraphQLError {
    return new GraphQLError(message, {
        extensions: { code: "UNAUTHENTICATED" },
    });
}

/**
 * Reads the `Authorization: Bearer <token>` header from `request` and verifies it against
 * Firebase Auth. Throws `unauthenticatedError()` when the header is missing, malformed, or the
 * token fails verification.
 */
export async function requireAuth(request: Request): Promise<DecodedIdToken> {
    const header = request.headers.get("Authorization");

    if (!header || !header.startsWith(BEARER_PREFIX)) {
        throw unauthenticatedError();
    }

    const token = header.slice(BEARER_PREFIX.length);

    try {
        return await getAuth().verifyIdToken(token);
    } catch {
        throw unauthenticatedError("Invalid or expired ID token.");
    }
}
