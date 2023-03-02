import { Folder } from "../../../domain/Folder";
import {
  CloudinaryCloudStorageRepo,
  ICloudinarySignedParams,
} from "../CloudinaryCloudStorageRepo";

export class GetCloudinarySignedParams {
  constructor(private cloudStorageRepo: CloudinaryCloudStorageRepo) {}

  get(folder: Folder): ICloudinarySignedParams {
    return this.cloudStorageRepo.getSignedData(folder);
  }
}
