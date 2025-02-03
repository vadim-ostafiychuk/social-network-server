import { createSchema } from "graphql-yoga";
import typeDefs from "./types";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import loadResolvers from "./resolvers";
import { resolvers as scalarResolvers } from "graphql-scalars";
import { authDirective } from "./directives/auth.directive";
import gql from "graphql-tag";

const customTypeDefs = gql`
  directive @auth on OBJECT | FIELD_DEFINITION

  scalar Upload

  type StatusResponse {
    status: Boolean!
  }
`;

async function createSchemaAsync() {
  const resolvers = await loadResolvers();

  let schema = createSchema({
    typeDefs: [customTypeDefs, typeDefs, scalarTypeDefs],
    resolvers: [resolvers, scalarResolvers],
  });

  const directiveTransformers = [
    authDirective("auth").authDirectiveTransformer,
  ];

  schema = directiveTransformers.reduce(
    (curSchema, transformer) => transformer(curSchema),
    schema
  );

  return schema;
}

export default createSchemaAsync;
