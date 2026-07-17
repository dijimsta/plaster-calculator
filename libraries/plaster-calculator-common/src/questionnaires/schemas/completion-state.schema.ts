import { z } from "zod";

export const NOT_STARTED_COMPLETION_STATE = "NOT_STARTED";
export const IN_PROGRESS_COMPLETION_STATE = "IN_PROGRESS";
export const COMPLETED_COMPLETION_STATE = "COMPLETED";

export const QuestionnaireCompletionStateSchema = z.union([
    z.literal(NOT_STARTED_COMPLETION_STATE),
    z.literal(IN_PROGRESS_COMPLETION_STATE),
    z.literal(COMPLETED_COMPLETION_STATE),
]);

export type QuestionnaireCompletionState = z.infer<
    typeof QuestionnaireCompletionStateSchema
>;
