import { UploadFileToCloudStorageHandler } from "../use-case/handlers/UploadFileToCloudStorageHandler";
import { UploadFileToCloudStorage } from "../use-case/UploadFileToCloudStorage";
import { FetchCloudinaryApiCall } from "./FetchCloudinaryApiCall";

const apiCall = new FetchCloudinaryApiCall();
const uploadFileToCloud = new UploadFileToCloudStorage(apiCall);
export const uploadFileToCloudHandler = new UploadFileToCloudStorageHandler(uploadFileToCloud);