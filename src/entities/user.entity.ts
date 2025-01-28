import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { UserRepository } from "../repositories/user.repository";

@Entity({ repository: () => UserRepository })
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  email!: string;

  @Property({ nullable: true })
  middleName: string | null = null;

  @Property({ nullable: true, type: "text" })
  hashedPassword: string | null = null;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  [EntityRepositoryType]?: UserRepository;
}
