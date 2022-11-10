import { ICloudStorageRepo } from "../domain/ICloudStorageRepo";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class CloudinaryCloudStorageRepo implements ICloudStorageRepo {
  private readonly image_upload_preset = "ml_default";

  async uploadImageAndGetUrl(
    filePath: string,
    folderPath: string
  ): Promise<string> {
    const { secure_url } = await cloudinary.uploader.upload(filePath, {
      folder: folderPath,
      upload_preset: this.image_upload_preset,
    });

    return secure_url;
  }

  async uploadVideoAndGetUrl(
    filePath: string,
    folderPath: string
  ): Promise<string> {
    const { public_id } = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
      folder: folderPath,
      eager_async: true,
      chunk_size: 10 * 1024 * 1024, // 6mb
    });

    const transformed_url = cloudinary.url(public_id, {
      resource_type: "video",
      format: "mp4",
      transformation: {
        duration: 30,
        width: 720,
        height: 405,
        fps: 30,
        quality: "auto",
      },
    });

    return transformed_url;
  }
}
