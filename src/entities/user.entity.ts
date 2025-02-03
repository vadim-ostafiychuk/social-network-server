import {
  Collection,
  Entity,
  EntityRepositoryType,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { UserRepository } from "../repositories/user.repository";
import { File } from "./file.entity";

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

  @OneToOne({
    inversedBy: "mainProfileImage",
    nullable: true,
  })
  mainProfileImage?: File;

  @OneToMany(() => File, (file) => file.user)
  profileImages? = new Collection<File>(this);

  @Property({})
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  [EntityRepositoryType]?: UserRepository;
}
