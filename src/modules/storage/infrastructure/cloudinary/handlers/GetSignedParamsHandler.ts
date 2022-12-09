import { Name } from "@/src/common/domain/Name";
import { Folder } from "../../../domain/Folder";
import { ICloudinarySignedParams } from "../CloudinaryCloudStorageRepo";
import { GetCloudinarySignedParams } from "../services/GetCloudinarySignedParams";

export class GetSignedParamsHandler {
  constructor(private getSignedParams: GetCloudinarySignedParams) {}

  forVideo(userName: string): ICloudinarySignedParams {
    const folder = Folder.videoAd(new Name(userName));
    return this.getSignedParams.get(folder);
  }

  forBanner(userName: string): ICloudinarySignedParams {
    const folder = Folder.bannerAd(new Name(userName));
    return this.getSignedParams.get(folder);
  }
}
