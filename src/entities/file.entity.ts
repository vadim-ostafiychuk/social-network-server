import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { FileRepository } from "../repositories/file.repository";
import { User } from "./user.entity";

@Entity({ repository: () => FileRepository })
export class File {
  @PrimaryKey()
  id!: number;

  @Property()
  filename!: string;

  @Property()
  mimetype!: string;

  @Property()
  url!: string;

  @ManyToOne(() => User, {
    nullable: true,
  })
  user?: User;

  @OneToOne(() => User, {
    mappedBy: "mainProfileImage",
    nullable: true,
  })
  mainProfileImage?: User;

  @Property({})
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  [EntityRepositoryType]?: FileRepository;
}
