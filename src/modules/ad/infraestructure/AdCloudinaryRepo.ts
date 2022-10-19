import { IAdCloudStorageRepo } from "../domain/IAdCloudStorageRepo";
import { v2 as cloudinary } from "cloudinary";
import { ImageBase64 } from "../domain/value-objects/ImageBase64";

export class AdCloudinaryRepo implements IAdCloudStorageRepo {
  private readonly upload_preset = "ml_default";

  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(imageBase64: ImageBase64): Promise<string> {
    const { url } = await cloudinary.uploader.upload_large(imageBase64.image, {
      upload_preset: this.upload_preset,
    });
    return url;
  }
}
