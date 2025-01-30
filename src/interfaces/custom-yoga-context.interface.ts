import { YogaInitialContext } from "graphql-yoga";
import { User } from "../entities/user.entity";

export interface CustomYogaContext extends YogaInitialContext {
  user?: User;
}
