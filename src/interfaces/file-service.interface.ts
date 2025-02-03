import { UploadDataInterface } from "./upload-data.interface";
import { File as FileDb } from "../entities/file.entity";

export interface FileServiceInterface {
  uploadFile(file: File, data: UploadDataInterface): Promise<FileDb>;
  deleteFile(filePath: string): Promise<void>;
}
