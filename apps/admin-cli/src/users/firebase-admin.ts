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
        isDeveloper: boolean;
        isTrialUser: boolean;
    };
};

export async function listAuthUsers() {
    const users: AuthUserSummary[] = [];
    let pageToken: string | undefined;

    do {
        const response = await getAuth().listUsers(1000, pageToken);
        users.push(...response.users.map(toUserSummary));
        pageToken = response.pageToken;
    } while (pageToken);

    return users;
}

export async function updateAuthUserScopes(
    uid: string,
    scopes: AuthUserSummary["claims"],
) {
    const auth = getAuth();
    const user = await auth.getUser(uid);
    const nextClaims = {
        ...(user.customClaims ?? {}),
        isDeveloper: scopes.isDeveloper,
        isTrialUser: scopes.isTrialUser,
    };

    await auth.setCustomUserClaims(uid, nextClaims);

    return toUserSummary(await auth.getUser(uid));
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
            isDeveloper: claims["isDeveloper"] === true,
            isTrialUser: claims["isTrialUser"] === true,
        },
    };
}
