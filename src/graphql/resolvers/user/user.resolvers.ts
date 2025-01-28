import { IResolvers } from "@graphql-tools/utils";
import UserResolverMethods from "./UserResolverMethods";
import { initORM } from "../../../db";
import { RequestContext } from "@mikro-orm/core";

async function createResolvers() {
  const db = await initORM();

  const userResolver = await UserResolverMethods.create();

  const resolvers: IResolvers = {
    Query: {
      user: userResolver.getUser.bind(userResolver), // Прив'язка контексту
    },
  };

  return resolvers;
}

export default createResolvers;
