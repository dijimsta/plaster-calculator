import { createYoga } from "graphql-yoga";

import { tryVerifyAuth } from "./context/graphql-context.ts";
import { schema } from "./schema/index.ts";

import type { GraphQLContext } from "./context/graphql-context.ts";

/**
 * Fetch-API GraphQL server: `(request: Request) => Promise<Response>`, so it drops in directly
 * as a Next.js Route Handler export. Ships GraphiQL by default. Yoga's default error masking
 * passes through `GraphQLError`s thrown directly by resolvers (e.g. `unauthenticatedError()`)
 * unmasked, while replacing any other unexpected error with a generic message.
 */
export const graphqlRequestHandler = createYoga<
    Record<string, never>,
    GraphQLContext
>({
    schema,
    context: async ({ request }) => ({ auth: await tryVerifyAuth(request) }),
});
