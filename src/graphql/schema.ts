import {
  createSchema,
  GraphQLSchemaWithContext,
  YogaInitialContext,
} from "graphql-yoga";
import typeDefs from "./types";
import resolvers from "./resolvers/index";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import createResolvers from "./resolvers/user/user.resolvers";
const { resolvers: scalarResolvers } = require("graphql-scalars");

async function createSchemaAsync() {
  const resolvers = await createResolvers();

  return createSchema({
    typeDefs: [typeDefs, scalarTypeDefs],
    resolvers: [resolvers, scalarResolvers],
  });
}

export default createSchemaAsync;
