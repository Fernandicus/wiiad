import { AdFileUrl } from "../../../ad/domain/value-objects/AdFileUrl";
import { Folder } from "../Folder";

export interface ICloudStorageRepo {
  uploadBannerAndGetUrl(file: string, folder: Folder): Promise<AdFileUrl>;
  uploadVideoAndGetUrl(file: string, foler: Folder): Promise<AdFileUrl>;
}
