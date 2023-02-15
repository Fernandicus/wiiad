import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { AdFileUrl } from "../../../ad/domain/value-objects/AdFileUrl";
import { ICloudinarySignedParams } from "../../infrastructure/cloudinary/CloudinaryCloudStorageRepo";
import { Folder } from "../Folder";

export interface ICloudStorageRepo {
  getSignedData(folder: Folder): ICloudinarySignedParams;
}
