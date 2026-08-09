import { z } from "zod";

export const CompanyContactSchema = z
    .object({
        id: z.string(),
        companyId: z.string(),
        name: z.string(),
        email: z.string().nullable(),
        phoneNumber: z.string().nullable(),
        role: z.string().nullable(),
        createdAt: z.string(),
        updatedAt: z.string(),
    })
    .readonly();

export type CompanyContact = z.infer<typeof CompanyContactSchema>;
