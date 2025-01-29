import {
  createSchema,
} from "graphql-yoga";
import typeDefs from "./types";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import loadResolvers from "./resolvers";
import { resolvers as scalarResolvers } from "graphql-scalars";

async function createSchemaAsync() {
  const resolvers = await loadResolvers();

  return createSchema({
    typeDefs: [typeDefs, scalarTypeDefs],
    resolvers: [resolvers, scalarResolvers],
  });
}

export default createSchemaAsync;
