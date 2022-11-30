import { UploadFileHandler } from "../use-case/handlers/UploadFileHandler";
import { CloudinaryCloudStorageRepo } from "./CloudinaryCloudStorageRepo";
import { UploadFile } from "../use-case/UploadFile";

const cloudStorageRepo = new CloudinaryCloudStorageRepo();
const uploadFile = new UploadFile(cloudStorageRepo);

export const uploadFileHandler = new UploadFileHandler(uploadFile);
