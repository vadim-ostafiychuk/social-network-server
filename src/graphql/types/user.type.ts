import gql from "graphql-tag";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    middleName: String
    email: EmailAddress!
    createdAt: DateTimeISO!
    updatedAt: DateTimeISO!
  }

  input UpdateUserInput {
    mainProfileImage: Int
  }

  type Query {
    user: User
    me: User! @auth
  }

  type Mutation {
    updateMe(data: UpdateUserInput!): User! @auth
  }
`;
