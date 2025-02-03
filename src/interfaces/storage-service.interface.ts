export interface StorageServiceInterface {
  uploadFile(file: File, folder?: string): Promise<string>;
  deleteFile(filePath: string): Promise<void>;
}
