import { ICloudStorageRepo } from "../domain/ICloudStorageRepo";

export class UploadFile {
  constructor(private cloudStorageRepo: ICloudStorageRepo) {}

  async image(filePath: string, folder: string): Promise<string> {
    const url = await this.cloudStorageRepo.uploadImageAndGetUrl(filePath, folder);
    return url;
  }

  async video(filePath: string, folder: string): Promise<string> {
    const url = await this.cloudStorageRepo.uploadVideoAndGetUrl(filePath, folder);
    return url;
  }
}
