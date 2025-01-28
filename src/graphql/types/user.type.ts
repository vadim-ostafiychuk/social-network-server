export default `
type User {
  id: ID!
  description: String
}

type Query {
  user: User
}
`;
