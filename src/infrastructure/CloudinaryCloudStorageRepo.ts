import { ICloudStorageRepo } from "../domain/ICloudStorageRepo";
import {
  ImageTransformationOptions,
  TransformationOptions,
  UploadApiOptions,
  v2 as cloudinary,
} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class CloudinaryCloudStorageRepo implements ICloudStorageRepo {
  private readonly upload_preset = "ml_default";

  async uploadImageAndGetUrl(
    filePath: string,
    folder: string
  ): Promise<string> {

    /* const transformation: ImageTransformationOptions = {
      width: 100,
      height: 100,
      crop:"limit",
    }; */

     const { url } = await cloudinary.uploader.upload(filePath, {
      folder,
      upload_preset: this.upload_preset,
     /*  transformation, */
    }); 
    
    return url;
  }
}
