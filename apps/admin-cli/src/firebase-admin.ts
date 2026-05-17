import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth, type UserRecord } from "firebase-admin/auth";

export type AuthUserSummary = {
    uid: string;
    email?: string;
    displayName?: string;
    disabled: boolean;
    emailVerified: boolean;
    createdAt: string;
    lastSignInAt?: string;
    claims: {
        admin: boolean;
        developer: boolean;
        paidCustomer: boolean;
    };
};

export async function listAuthUsers() {
    ensureFirebaseAdmin();

    const users: AuthUserSummary[] = [];
    let pageToken: string | undefined;

    do {
        const response = await getAuth().listUsers(1000, pageToken);
        users.push(...response.users.map(toUserSummary));
        pageToken = response.pageToken;
    } while (pageToken);

    return users;
}

function ensureFirebaseAdmin() {
    if (getApps().length === 0) {
        initializeApp();
    }
}

function toUserSummary(user: UserRecord): AuthUserSummary {
    const metadata = user.metadata;
    const claims = user.customClaims ?? {};

    return {
        uid: user.uid,
        ...(user.email ? { email: user.email } : {}),
        ...(user.displayName ? { displayName: user.displayName } : {}),
        disabled: user.disabled,
        emailVerified: user.emailVerified,
        createdAt: metadata.creationTime,
        ...(metadata.lastSignInTime
            ? { lastSignInAt: metadata.lastSignInTime }
            : {}),
        claims: {
            admin: claims["admin"] === true,
            developer: claims["developer"] === true,
            paidCustomer: claims["paidCustomer"] === true,
        },
    };
}
