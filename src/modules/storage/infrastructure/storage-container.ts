import { UploadFileHandler } from "../use-case/handlers/UploadFileHandler";
import { CloudinaryCloudStorageRepo } from "./cloudinary/CloudinaryCloudStorageRepo";
import { UploadFile } from "../use-case/UploadFile";
import { GetCloudinarySignedParams } from "./cloudinary/services/GetCloudinarySignedParams";
import { GetSignedParamsHandler } from "./cloudinary/handlers/GetSignedParamsHandler";

const cloudStorageRepo = new CloudinaryCloudStorageRepo();
const uploadFile = new UploadFile(cloudStorageRepo);
const getSignedParams = new GetCloudinarySignedParams(cloudStorageRepo);

export const uploadFileHandler = new UploadFileHandler(uploadFile);
export const getSignedParamsHandler = new GetSignedParamsHandler(getSignedParams);
