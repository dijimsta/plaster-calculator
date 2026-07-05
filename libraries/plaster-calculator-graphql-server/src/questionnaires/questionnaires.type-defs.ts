export const questionnairesTypeDefs = `
    type QuestionnaireTemplate {
        id: ID!
        name: String!
        updated: String!
    }

    type Query {
        questionnaireTemplates: [QuestionnaireTemplate!]!
    }
`;
