import { createSchema } from "graphql-yoga";
import typeDefs from "./types";
import resolvers from "./resolvers";

export default createSchema({ typeDefs, resolvers });
