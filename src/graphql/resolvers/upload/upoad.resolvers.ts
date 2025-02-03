import { UploadDataInterface } from "../../../interfaces/upload-data.interface";
import UploadResolverMethods from "./upload-resolver-methods";

async function createResolvers() {
  const uploadResolverMethods = await UploadResolverMethods.create();

  const resolvers = {
    Mutation: {
      uploadFile: (
        _: unknown,
        { file, data }: { file: File; data: UploadDataInterface }
      ) => uploadResolverMethods.uploadFile(file, data),
    },
  };

  return resolvers;
}

export default createResolvers;
