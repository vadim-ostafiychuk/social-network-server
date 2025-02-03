import gql from "graphql-tag";

export default gql`
  type Mutation {
    login(data: LoginDto!): AuthLoginResponse!
    register(data: RegisterDto!): AuthLoginResponse!
  }

  input LoginDto {
    email: EmailAddress!
    password: String!
  }

  input RegisterDto {
    email: EmailAddress!
    password: String!
    firstName: String!
    lastName: String!
    middleName: String
  }

  type AuthLoginResponse {
    jwt: JWT!
  }
`;
