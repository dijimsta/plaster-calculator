import { z } from "zod";

export const QUOTING_SALES_STATUS = "QUOTING";
export const QUOTE_SUBMITTED_SALES_STATUS = "QUOTE_SUBMITTED";
export const WON_SALES_STATUS = "WON";
export const LOST_SALES_STATUS = "LOST";

export const SalesStatusSchema = z.union([
    z.literal(QUOTING_SALES_STATUS),
    z.literal(QUOTE_SUBMITTED_SALES_STATUS),
    z.literal(WON_SALES_STATUS),
    z.literal(LOST_SALES_STATUS),
]);

export type SalesStatus = z.infer<typeof SalesStatusSchema>;
