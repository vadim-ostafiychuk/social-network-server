import { GraphQLError } from "graphql";
import { YogaInitialContext } from "graphql-yoga";
import { JwtService } from "./services/jwt.service";
import { JwtPayload } from "jsonwebtoken";
import { UserService } from "./services/user.service";

export async function handleYogaContext(ctx: YogaInitialContext) {
  const authorizationHeader: string | null =
    ctx.request.headers.get("authorization");

  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      throw new GraphQLError("Invalid Authorization Header!");
    }

    const jwtService = new JwtService();
    let payload: JwtPayload | string;

    try {
      payload = jwtService.verifyToken(token);
    } catch {
      return ctx;
    }

    if (typeof payload !== "string" && !payload.id) {
      return ctx;
    }

    const userService = await UserService.create();

    if (typeof payload !== "string" && payload.id) {
      const user = await userService.getUser({ id: payload.id });

      if (user) {
        return { ...ctx, user };
      }
    }
  }

  return ctx;
}
