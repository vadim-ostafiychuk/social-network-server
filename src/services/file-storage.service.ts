import path from "node:path";
import fs from "fs-extra";
import { v4 as uuidv4 } from "uuid";
import { StorageServiceInterface } from "../interfaces/storage-service.interface";

export class FileStorageService implements StorageServiceInterface {
  private baseUploadPath: string;

  constructor() {
    this.baseUploadPath = path.join(__dirname, "../../uploads");
  }

  async uploadFile(file: File, folder?: string) {
    const filename = file.name;
    const fileArrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileArrayBuffer);

    const folderPath: string = folder
      ? path.join(this.baseUploadPath, folder)
      : this.baseUploadPath;

    await fs.ensureDir(folderPath);

    const uniqueFilename = `${uuidv4()}-${filename}`;
    const filePath = path.join(folderPath, uniqueFilename);

    await fs.writeFile(filePath, buffer);

    return `/uploads/${folder ? folder + "/" : ""}${uniqueFilename}`;
  }

  async deleteFile(filePath: string) {}
}
