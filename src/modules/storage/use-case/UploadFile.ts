import { Folder } from "../domain/Folder";
import { ICloudStorageRepo } from "../domain/interfaces/ICloudStorageRepo";
import { Name } from "../../../common/domain/Name";
import { AdFileUrl } from "../../ad/domain/value-objects/AdFileUrl";

export class UploadFile {
  constructor(private cloudStorageRepo: ICloudStorageRepo) {}

  async adBanner(filePath: string, folder: Folder): Promise<AdFileUrl> {
    const url = await this.cloudStorageRepo.uploadBannerAndGetUrl(
      filePath,
      folder
    );
    return url;
  }

  async adVideo(filePath: string, folder: Folder): Promise<AdFileUrl> {
    const url = await this.cloudStorageRepo.uploadVideoAndGetUrl(
      filePath,
      folder
    );
    return url;
  }
}
