import { FileServiceInterface } from "../../../interfaces/file-service.interface";
import { UploadDataInterface } from "../../../interfaces/upload-data.interface";
import { FileService } from "../../../services/file.service";

export default class UploadResolverMethods {
  private static instance: UploadResolverMethods;

  private constructor(private readonly fileService: FileServiceInterface) {}

  static async create() {
    if (!UploadResolverMethods.instance) {
      const fileService = await FileService.create();

      UploadResolverMethods.instance = new UploadResolverMethods(fileService);
    }

    return UploadResolverMethods.instance;
  }

  async uploadFile(file: File, data: UploadDataInterface) {
    const isSuccess = await this.fileService.uploadFile(file, data);

    return {
      status: isSuccess,
    };
  }
}
