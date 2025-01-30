import { IResolvers } from "@graphql-tools/utils";
import AuthResolverMethods from "./auth-resolver-methods";

async function createResolvers() {
  const authResolverMethods = await AuthResolverMethods.create();

  const resolvers: IResolvers = {
    Mutation: {
      login: (_, args) => authResolverMethods.login(args.data),
      register: (_, args) => authResolverMethods.register(args.data),
    },
  };

  return resolvers;
}

export default createResolvers;
