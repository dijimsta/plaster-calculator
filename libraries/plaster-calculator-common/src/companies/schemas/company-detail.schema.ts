import { z } from "zod";

import { CompanyContactSchema } from "./company-contact.schema.ts";
import { CompanySummarySchema } from "./company-summary.schema.ts";

export const CompanyDetailSchema = CompanySummarySchema.extend({
    contacts: z.array(CompanyContactSchema),
});

export type CompanyDetail = z.infer<typeof CompanyDetailSchema>;
