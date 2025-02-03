import { FileMetadataInterface } from "../interfaces/file-metadata.interface";
import { initORM } from "../db";
import { FileRepository } from "../repositories/file.repository";
import { File } from "../entities/file.entity";
import { CreateRequestContext } from "@mikro-orm/core";

export class FileDatabaseService {
  private static instance: FileDatabaseService;

  private constructor(private readonly fileRepository: FileRepository) {}

  static async create() {
    if (!FileDatabaseService.instance) {
      const db = await initORM();

      const fileRepository = db.em.getRepository(File);

      FileDatabaseService.instance = new FileDatabaseService(fileRepository);
    }

    return FileDatabaseService.instance;
  }

  @CreateRequestContext<FileDatabaseService>((t) => t.fileRepository)
  async saveFileMetadata(data: FileMetadataInterface): Promise<File> {
    const file = this.fileRepository.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: data.userId,
    });

    const id = await this.fileRepository.insert(file);

    file.id = id;

    return file;
  }
}
