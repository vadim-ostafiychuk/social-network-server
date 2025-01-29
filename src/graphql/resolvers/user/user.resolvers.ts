import { IResolvers } from "@graphql-tools/utils";
import UserResolverMethods from "./UserResolverMethods";
import { initORM } from "../../../db";

async function createResolvers() {
  const userResolver = await UserResolverMethods.create();

  const resolvers: IResolvers = {
    Query: {
      user: userResolver.getUser.bind(userResolver),
    },
  };

  return resolvers;
}

export default createResolvers;
