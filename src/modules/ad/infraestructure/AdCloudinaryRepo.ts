import { IAdCloudStorageRepo } from "../domain/IAdCloudStorageRepo";
import { v2 as cloudinary } from "cloudinary";

export class AdCloudinaryRepo implements IAdCloudStorageRepo {
  private readonly upload_preset = "ml_default";

  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImageAndGetUrl(imagePath: string): Promise<string> {
    const { url } = await cloudinary.uploader.upload_large(imagePath, {
      upload_preset: this.upload_preset,
    });
    return url;
  }
}
