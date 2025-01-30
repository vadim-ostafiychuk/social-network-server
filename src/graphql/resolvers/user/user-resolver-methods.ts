import { CreateRequestContext } from "@mikro-orm/core";
import { initORM } from "../../../db";
import { User } from "../../../entities/user.entity";
import { UserRepository } from "../../../repositories/user.repository";

export default class UserResolverMethods {
  constructor(private readonly userRepository: UserRepository) {}

  static async create() {
    const db = await initORM();

    const userRepository = db.em.getRepository(User);

    const instance = new UserResolverMethods(userRepository);

    return instance;
  }

  @CreateRequestContext<UserResolverMethods>((t) => t.userRepository)
  public async getUser() {
    const user = await this.userRepository.findOneOrFail({ id: 2 });

    console.log(user);

    return user;
  }
}
