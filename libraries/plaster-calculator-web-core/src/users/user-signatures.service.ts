import * as DataConnector from "@generated/data-connector-web";
import {
    UserSignatureSchema,
    type EmailSignature,
    type UserSignature,
} from "@libraries/plaster-calculator-common";
import { QueryFetchPolicy, type DataConnect } from "firebase/data-connect";

import { FirebaseService } from "../firebase/firebase.service.ts";

type UserSignatureRow = NonNullable<
    DataConnector.GetMyUserSignatureData["userSignature"]
>;

export class UserSignaturesService {
    public constructor(private readonly dataConnect: DataConnect) {}

    public async getSignature(): Promise<UserSignature> {
        const result = await DataConnector.getMyUserSignature(
            this.dataConnect,
            { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
        );
        return this.toUserSignature(result.data.userSignature);
    }

    public async updateSignature(
        payload: Partial<EmailSignature>,
    ): Promise<UserSignature> {
        const current = await this.getSignature();
        await DataConnector.upsertMyUserSignature(this.dataConnect, {
            name: payload.name ?? current.signature.name,
            companyName: payload.companyName ?? current.signature.companyName,
            address: payload.address ?? current.signature.address,
            mobile: payload.mobile ?? current.signature.mobile,
            phone: payload.phone ?? current.signature.phone,
            email: payload.email ?? current.signature.email,
        });
        return this.getSignature();
    }

    private toUserSignature(
        signature: UserSignatureRow | null | undefined,
    ): UserSignature {
        if (!signature) {
            return UserSignatureSchema.parse({
                ownerId: FirebaseService.getAuth().currentUser?.uid ?? "",
                signature: {
                    name: null,
                    companyName: null,
                    address: null,
                    mobile: null,
                    phone: null,
                    email: null,
                },
                createdAt: null,
                updatedAt: null,
            });
        }

        return UserSignatureSchema.parse({
            ownerId: signature.ownerId,
            signature: {
                name: signature.name ?? null,
                companyName: signature.companyName ?? null,
                address: signature.address ?? null,
                mobile: signature.mobile ?? null,
                phone: signature.phone ?? null,
                email: signature.email ?? null,
            },
            createdAt: signature.createdAt,
            updatedAt: signature.updatedAt,
        });
    }
}

export const userSignaturesService = new UserSignaturesService(
    FirebaseService.getDataConnect(DataConnector.connectorConfig),
);
