import { AdFileUrl } from "@/src/modules/ad/domain/value-objects/AdFileUrl";

export interface ICloudFileStoreApiCall {
  uploadVideo(filePrimitives: string): Promise<AdFileUrl>;
  uploadBanner(filePrimitives: string): Promise<AdFileUrl>;
}
