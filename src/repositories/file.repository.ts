import { EntityRepository } from "@mikro-orm/postgresql";
import { File } from "../entities/file.entity";

export class FileRepository extends EntityRepository<File> {}
