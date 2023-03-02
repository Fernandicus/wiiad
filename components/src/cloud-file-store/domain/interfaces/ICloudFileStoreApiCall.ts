import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { AdFileUrl } from "@/src/modules/ad/domain/value-objects/AdFileUrl";

export interface ICloudFileStoreApiCall {
  uploadVideo(filePrimitives: string): Promise<AdFileUrl>;
  uploadBanner(filePrimitives: string): Promise<AdFileUrl>;
  uploadProfilePic(filePrimitives: string): Promise<ProfilePic>;
}
