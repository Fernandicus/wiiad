import { UploadFileHandler } from "../handler/UploadFileHandler";
import { CloudinaryCloudStorageRepo } from "../infrastructure/CloudinaryCloudStorageRepo";
import { UploadFile } from "../use-case/UploadFile";

const cloudStorageRepo = new CloudinaryCloudStorageRepo();
const uploadFile = new UploadFile(cloudStorageRepo);

export const uploadFileHandler = new UploadFileHandler(uploadFile);
