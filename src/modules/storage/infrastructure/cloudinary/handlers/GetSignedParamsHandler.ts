import { Name } from "@/src/common/domain/Name";
import { UniqId } from "@/src/common/domain/UniqId";
import { Folder } from "../../../domain/Folder";
import { ICloudinarySignedParams } from "../CloudinaryCloudStorageRepo";
import { GetCloudinarySignedParams } from "../services/GetCloudinarySignedParams";

export class GetSignedParamsHandler {
  constructor(private getSignedParams: GetCloudinarySignedParams) {}

  forVideo(userId: string): ICloudinarySignedParams {
    const folder = Folder.videoAd(new UniqId(userId));
    return this.getSignedParams.get(folder);
  }

  forBanner(userId: string): ICloudinarySignedParams {
    const folder = Folder.bannerAd(new UniqId(userId));
    return this.getSignedParams.get(folder);
  }

  forAdvertiserProfilePic(userId: string): ICloudinarySignedParams {
    const folder = Folder.advertiserProfilePic(new UniqId(userId));
    return this.getSignedParams.get(folder);
  }

  forUserProfilePic(userId: string): ICloudinarySignedParams {
    const folder = Folder.userProfilePic(new UniqId(userId));
    return this.getSignedParams.get(folder);
  }
}
