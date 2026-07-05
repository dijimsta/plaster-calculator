import { makeExecutableSchema } from "@graphql-tools/schema";

import { questionnairesResolvers } from "../questionnaires/questionnaires.resolvers.ts";
import { questionnairesTypeDefs } from "../questionnaires/questionnaires.type-defs.ts";

export const schema = makeExecutableSchema({
    typeDefs: [questionnairesTypeDefs],
    resolvers: [questionnairesResolvers],
});
