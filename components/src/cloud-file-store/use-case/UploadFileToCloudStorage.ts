import { AdFileUrl } from "@/src/modules/ad/domain/value-objects/AdFileUrl";
import { ICloudFileStoreApiCall } from "../domain/interfaces/ICloudFileStoreApiCall";

export class UploadFileToCloudStorage {
  constructor(private apiCall: ICloudFileStoreApiCall) {}

  async video(filePrimitives: string): Promise<AdFileUrl> {
    return await this.apiCall.uploadVideo(filePrimitives);
  }

  async banner(filePrimitives: string): Promise<AdFileUrl> {
    return await this.apiCall.uploadBanner(filePrimitives);
  }
}
