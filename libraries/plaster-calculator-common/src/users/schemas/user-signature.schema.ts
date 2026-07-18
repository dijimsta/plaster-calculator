import { z } from "zod";

import { EmailSignatureSchema } from "./email-signature.schema.ts";

export const UserSignatureSchema = z
    .object({
        ownerId: z.string(),
        signature: EmailSignatureSchema,
        createdAt: z.string().nullable(),
        updatedAt: z.string().nullable(),
    })
    .readonly();

export type UserSignature = z.infer<typeof UserSignatureSchema>;
