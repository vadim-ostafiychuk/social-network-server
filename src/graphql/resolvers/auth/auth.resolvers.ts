import { IResolvers } from "@graphql-tools/utils";
import AuthResolverMethods from "./authResolverMethods";

async function createResolvers() {

  const authResolverMethods = await AuthResolverMethods.create();
  
  const resolvers: IResolvers = {
    Mutation: {
        login: (_, args) => authResolverMethods.login.bind(authResolverMethods)(args.data),
        register: (_, args) => authResolverMethods.register.bind(authResolverMethods)(args.data)
    }
  };

  return resolvers;
}

export default createResolvers;
