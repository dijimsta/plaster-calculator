import { z } from "zod";

export const EmailSignatureSchema = z
    .object({
        name: z.string().nullable(),
        companyName: z.string().nullable(),
        address: z.string().nullable(),
        mobile: z.string().nullable(),
        phone: z.string().nullable(),
        email: z.string().nullable(),
    })
    .readonly();

export type EmailSignature = z.infer<typeof EmailSignatureSchema>;
