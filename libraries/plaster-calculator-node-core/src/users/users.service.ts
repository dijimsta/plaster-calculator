import { Auth } from "firebase-admin/auth";

import type { CustomUserClaims } from "@libraries/plaster-calculator-common";

export class UsersService {
    public constructor(private readonly auth: Auth) {}

    public async addCustomUserClaims(userId: string, claims: CustomUserClaims) {
        const user = await this.auth.getUser(userId);
        return await this.auth.setCustomUserClaims(userId, {
            ...user.customClaims,
            ...claims,
        });
    }
}
