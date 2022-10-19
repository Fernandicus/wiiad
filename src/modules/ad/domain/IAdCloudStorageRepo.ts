import { ImageBase64 } from "./value-objects/ImageBase64";

export interface IAdCloudStorageRepo{
    uploadImage(imageBase64: ImageBase64):Promise<string>;
}