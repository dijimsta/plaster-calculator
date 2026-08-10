import { z } from "zod";

export const SYSTEM_QUOTE_ITEM_TEMPLATE_SCOPE = "SYSTEM";
export const TEAM_QUOTE_ITEM_TEMPLATE_SCOPE = "TEAM";

export const QuoteItemTemplateScopeSchema = z.union([
    z.literal(SYSTEM_QUOTE_ITEM_TEMPLATE_SCOPE),
    z.literal(TEAM_QUOTE_ITEM_TEMPLATE_SCOPE),
]);

export type QuoteItemTemplateScope = z.infer<
    typeof QuoteItemTemplateScopeSchema
>;
