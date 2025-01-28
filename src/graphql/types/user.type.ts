export default `
type User {
  id: ID!
  firstName: String!
  lastName: String!
  middleName: String
  email: String!
  createdAt: DateTimeISO!
  updatedAt: DateTimeISO!
}

type Query {
  user: User
}
`;
