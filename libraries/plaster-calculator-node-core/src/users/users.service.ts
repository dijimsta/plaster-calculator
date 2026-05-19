import {
    CustomUserClaimsSchema,
    type CustomUserClaims,
} from "@libraries/plaster-calculator-common";
import { Auth } from "firebase-admin/auth";

export class UsersService {
    public constructor(private readonly auth: Auth) {}

    public async getCustomUserClaims(userId: string) {
        const { customClaims } = await this.auth.getUser(userId);
        return await CustomUserClaimsSchema.parseAsync(customClaims);
    }

    public async setCustomUserClaims(userId: string, claims: CustomUserClaims) {
        return await this.auth.setCustomUserClaims(userId, claims);
    }

    public async addCustomUserClaims(userId: string, claims: CustomUserClaims) {
        const { customClaims } = await this.auth.getUser(userId);
        return await this.auth.setCustomUserClaims(userId, {
            ...customClaims,
            ...claims,
        });
    }
}
