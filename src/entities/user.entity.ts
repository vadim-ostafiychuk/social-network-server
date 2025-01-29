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

  @Property({ unique: true })
  email!: string;

  @Property({ nullable: true })
  middleName: string | null = null;

  @Property({ type: "text" })
  hashedPassword!: string;

  @Property({})
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  [EntityRepositoryType]?: UserRepository;
}
