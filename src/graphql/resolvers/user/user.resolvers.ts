import { IResolvers } from "@graphql-tools/utils";
import UserResolver from "./UserResolverMethods";

const userResolver = new UserResolver();

const resolvers: IResolvers = {
  Query: {
    user: userResolver.getUser,
  },
};

export default resolvers;
