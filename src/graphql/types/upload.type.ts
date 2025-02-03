import gql from "graphql-tag";

export default gql`
  input UploadData {
    userId: Int
  }

  type Mutation {
    uploadFile(file: File!, data: UploadData!): StatusResponse!
  }
`;
