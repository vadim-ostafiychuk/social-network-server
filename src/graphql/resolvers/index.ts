import UserResolver from "./user.resolvers";

const userResolver = new UserResolver();

const resolvers = {
  Query: {
    user: userResolver.getUser,
  },
};

export default resolvers;
