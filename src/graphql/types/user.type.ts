export default `
type User {
  id: ID!
  firstName: String!
  lastName: String!
  middleName: String
  email: EmailAddress!
  createdAt: DateTimeISO!
  updatedAt: DateTimeISO!
}

type Query {
  user: User
  me: User! @auth
}
`;
