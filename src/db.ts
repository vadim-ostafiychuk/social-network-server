import { MikroORM, Options, EntityManager } from "@mikro-orm/postgresql";
import config from "./mikro-orm.config";
import { User } from "./entities/user.entity";
import { UserRepository } from "./repositories/user.repository";

export interface Services {
  orm: MikroORM;
  em: EntityManager;
  user: UserRepository;
}

let cache: Services;

export async function initORM(options?: Options): Promise<Services> {
  if (cache) {
    return cache;
  }

  const orm = await MikroORM.init({
    ...config,
    ...options,
  });

  return (cache = {
    orm,
    em: orm.em,
    user: orm.em.getRepository(User),
  });
}
