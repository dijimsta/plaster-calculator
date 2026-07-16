import { z } from "zod";

export const MANUAL_ANSWER_SOURCE = "MANUAL";
export const AI_SUGGESTED_ANSWER_SOURCE = "AI_SUGGESTED";
export const AI_CONFIRMED_ANSWER_SOURCE = "AI_CONFIRMED";

export const AnswerSourceSchema = z.union([
    z.literal(MANUAL_ANSWER_SOURCE),
    z.literal(AI_SUGGESTED_ANSWER_SOURCE),
    z.literal(AI_CONFIRMED_ANSWER_SOURCE),
]);

export type AnswerSource = z.infer<typeof AnswerSourceSchema>;
