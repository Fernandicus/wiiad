import { UploadFileToCloudStorage } from "../UploadFileToCloudStorage";

export class UploadFileToCloudStorageHandler {
  constructor(private uploadFile: UploadFileToCloudStorage) {}

  async video(file: string): Promise<string> {
    const adFileUrl = await this.uploadFile.video(file);
    return adFileUrl.file;
  }

  async banner(file: string): Promise<string> {
    const adFileUrl = await this.uploadFile.banner(file);
    return adFileUrl.file;
  }

  async profilePic(file: string): Promise<string> {
    const profilePic = await this.uploadFile.profilePic(file);
    return profilePic.url;
  }
}
