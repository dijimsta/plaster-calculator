import { HttpsError } from "firebase-functions/https";

import type { CallableRequest } from "firebase-functions/https";

export function requireAuth(
    request: CallableRequest<unknown>,
): NonNullable<CallableRequest<unknown>["auth"]> {
    const auth = request.auth;

    if (!auth) {
        throw new HttpsError(
            "unauthenticated",
            "Must be signed in to call this function.",
        );
    }

    return auth;
}
