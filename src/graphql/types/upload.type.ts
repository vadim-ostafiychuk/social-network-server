import gql from "graphql-tag";

export default gql`
  input UploadData {
    userId: Int
  }

  type File {
    id: Int!
    filename: String!
    mimetype: String!
    url: String!
    createdAt: DateTimeISO!
    updatedAt: DateTimeISO!
  }

  type Mutation {
    uploadFile(file: Upload!, data: UploadData!): File! @auth
  }
`;
