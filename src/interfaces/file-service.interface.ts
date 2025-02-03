import { UploadDataInterface } from "./upload-data.interface";

export interface FileServiceInterface {
  uploadFile(file: File, data: UploadDataInterface): Promise<boolean>;
  deleteFile(filePath: string): Promise<void>;
}
