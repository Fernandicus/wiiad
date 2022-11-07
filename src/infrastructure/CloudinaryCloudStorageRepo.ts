import { ICloudStorageRepo } from "../domain/ICloudStorageRepo";
import { v2 as cloudinary } from "cloudinary";

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
    const { url } = await cloudinary.uploader.upload(filePath, {
      folder,
      upload_preset: this.upload_preset,
    });

    return url;
  }
}
