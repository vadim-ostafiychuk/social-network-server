import path from "node:path";
import { mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { IResolvers } from "@graphql-tools/utils";

const resolversArray = loadFilesSync(
  path.join(__dirname, "./**/*.resolvers.*")
);

export default <IResolvers>mergeResolvers(resolversArray);
