import { requireAuth } from "../auth/require-auth.ts";

import type { DecodedIdToken } from "firebase-admin/auth";

/**
 * Per-request context passed to resolvers. `auth` is `undefined` when the request had no valid
 * ID token; resolvers that require a signed-in caller check for its presence themselves.
 */
export interface GraphQLContext {
    readonly auth: DecodedIdToken | undefined;
}

/**
 * Verifies the request's ID token like `requireAuth`, but resolves to `undefined` instead of
 * throwing so a missing/invalid token doesn't abort the whole request before resolvers run.
 */
export async function tryVerifyAuth(
    request: Request,
): Promise<DecodedIdToken | undefined> {
    try {
        return await requireAuth(request);
    } catch {
        return undefined;
    }
}
