import path from "node:path";
import { mergeResolvers } from "@graphql-tools/merge";
import { loadFiles } from "@graphql-tools/load-files";
import { IResolvers } from "@graphql-tools/utils";

async function loadResolvers(): Promise<IResolvers> {
  const resolversArray = await loadFiles(
    path.join(__dirname, "./**/*.resolvers.*")
  );

  return mergeResolvers(resolversArray);
}

export default loadResolvers();
