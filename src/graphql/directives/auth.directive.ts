import { defaultFieldResolver, GraphQLError, GraphQLSchema } from "graphql";
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";

export function authDirective(directiveName: string) {
  return {
    authDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD](fieldConfig) {
          const authDirective = getDirective(
            schema,
            fieldConfig,
            directiveName
          );

          if (authDirective?.length) {
            const { resolve = defaultFieldResolver } = fieldConfig;

            fieldConfig.resolve = function (source, args, context, info) {
              const { user } = context;
              if (!user) throw new GraphQLError("Unautorized!");

              return resolve(source, args, context, info);
            };
            return fieldConfig;
          }
        },
      }),
  };
}
