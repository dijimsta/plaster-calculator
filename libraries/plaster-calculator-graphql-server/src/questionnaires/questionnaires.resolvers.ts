import { listQuestionnaireTemplates } from "@generated/questionnaires-data-connector";
import { formatRelativeTime } from "@libraries/plaster-calculator-common";

import { unauthenticatedError } from "../auth/require-auth.ts";

import type { GraphQLContext } from "../context/graphql-context.ts";

interface QuestionnaireTemplateResult {
    readonly id: string;
    readonly name: string;
    readonly updated: string;
}

async function resolveQuestionnaireTemplates(
    _source: unknown,
    _args: Record<string, never>,
    context: GraphQLContext,
): Promise<readonly QuestionnaireTemplateResult[]> {
    if (!context.auth) {
        throw unauthenticatedError();
    }

    const { data } = await listQuestionnaireTemplates({
        ownerId: context.auth.uid,
    });

    return data.questionnaireTemplates.map((template) => ({
        id: template.id,
        name: template.name,
        updated: formatRelativeTime(new Date(template.updatedAt)),
    }));
}

export const questionnairesResolvers = {
    Query: {
        questionnaireTemplates: resolveQuestionnaireTemplates,
    },
};
