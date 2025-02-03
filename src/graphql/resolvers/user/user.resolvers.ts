import { IResolvers } from "@graphql-tools/utils";
import UserResolverMethods from "./user-resolver-methods";

async function createResolvers() {
  const userResolver = await UserResolverMethods.create();

  const resolvers: IResolvers = {
    Query: {
      me: (_, args, ctx) => userResolver.getMe(ctx),
    },
    Mutation: {
      updateMe: (_, { data }, ctx) => userResolver.updateMe(data, ctx),
    },
  };

  return resolvers;
}

export default createResolvers;
