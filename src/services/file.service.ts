import { File as FileDb } from "../entities/file.entity";
import { FileServiceInterface } from "../interfaces/file-service.interface";
import { StorageServiceInterface } from "../interfaces/storage-service.interface";
import { UploadDataInterface } from "../interfaces/upload-data.interface";
import { FileDatabaseService } from "./file-database.service";
import { FileStorageService } from "./file-storage.service";

export class FileService implements FileServiceInterface {
  private static instance: FileService;

  private constructor(
    private readonly storageService: StorageServiceInterface,
    private readonly fileDatabaseService: FileDatabaseService
  ) {}

  static async create() {
    if (!FileService.instance) {
      const storageService = new FileStorageService();
      const fileDatabaseService = await FileDatabaseService.create();

      FileService.instance = new FileService(
        storageService,
        fileDatabaseService
      );
    }

    return FileService.instance;
  }

  async uploadFile(file: File, data: UploadDataInterface): Promise<FileDb> {
    let folder;

    if (data.userId) {
      folder = "user";
    }

    const url = await this.storageService.uploadFile(file, folder);

    const { type, name } = file;

    return this.fileDatabaseService.saveFileMetadata({
      filename: name,
      mimetype: type,
      url: url,
      userId: data.userId,
    });
  }
  async deleteFile(fileId: string) {}
}
