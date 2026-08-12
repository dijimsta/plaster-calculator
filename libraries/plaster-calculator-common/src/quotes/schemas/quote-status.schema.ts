import { z } from "zod";

export const DRAFT_QUOTE_STATUS = "draft";
export const SENT_QUOTE_STATUS = "sent";
export const ACCEPTED_QUOTE_STATUS = "accepted";

export const QuoteStatusSchema = z.union([
    z.literal(DRAFT_QUOTE_STATUS),
    z.literal(SENT_QUOTE_STATUS),
    z.literal(ACCEPTED_QUOTE_STATUS),
]);

export type QuoteStatus = z.infer<typeof QuoteStatusSchema>;
