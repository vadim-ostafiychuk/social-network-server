import { CreateRequestContext } from "@mikro-orm/core";
import { initORM } from "../../../db";
import { User } from "../../../entities/user.entity";
import { UserRepository } from "../../../repositories/user.repository";
import { CustomYogaContext } from "../../../interfaces/custom-yoga-context.interface";
import { UpdateUserDataInterface } from "../../../interfaces/update-user-data.interface";
import { UserService } from "../../../services/user.service";

export default class UserResolverMethods {
  private static instance: UserResolverMethods;

  private constructor(private readonly userService: UserService) {}

  static async create() {
    if (!UserResolverMethods.instance) {
      const userService = await UserService.create();

      UserResolverMethods.instance = new UserResolverMethods(userService);
    }

    return UserResolverMethods.instance;
  }

  public async getUser() {
    // const user = await this.userRepository.findOneOrFail({ id: 2 });

    return {};
  }

  public async getMe(ctx: CustomYogaContext): Promise<User> {
    const { user } = ctx;

    if (user) {
      return user;
    } else {
      throw new Error("Error!");
    }
  }

  public async updateMe(data: UpdateUserDataInterface, ctx: CustomYogaContext) {
    const user = ctx.user;

    if (user) {
      await this.userService.updateUser(user, data);
    }

    return user;
  }
}
