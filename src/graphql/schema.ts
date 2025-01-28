import { createSchema } from "graphql-yoga";
import typeDefs from "./types";
import resolvers from "./resolvers/index";

export default createSchema({ typeDefs, resolvers });
