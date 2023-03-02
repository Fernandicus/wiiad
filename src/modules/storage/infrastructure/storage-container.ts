import { CloudinaryCloudStorageRepo } from "./cloudinary/CloudinaryCloudStorageRepo";
import { GetCloudinarySignedParams } from "./cloudinary/services/GetCloudinarySignedParams";
import { GetSignedParamsHandler } from "./cloudinary/handlers/GetSignedParamsHandler";

const cloudStorageRepo = new CloudinaryCloudStorageRepo();
const getSignedParams = new GetCloudinarySignedParams(cloudStorageRepo);

export const getSignedParamsHandler = new GetSignedParamsHandler(getSignedParams);
