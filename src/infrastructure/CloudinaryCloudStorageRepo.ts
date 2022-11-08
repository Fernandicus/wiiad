import { ICloudStorageRepo } from "../domain/ICloudStorageRepo";
import {
  UploadApiOptions,
  v2 as cloudinary,
  VideoFormat,
  VideoTransformationOptions,
} from "cloudinary";
import { ApiRoutes } from "../utils/ApiRoutes";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class CloudinaryCloudStorageRepo implements ICloudStorageRepo {
  private readonly image_upload_preset = "ml_default";
  private readonly video_upload_preset = "ml_video";

  async uploadImageAndGetUrl(
    filePath: string,
    folder: string
  ): Promise<string> {
    const { secure_url } = await cloudinary.uploader.upload(filePath, {
      folder,
      upload_preset: this.image_upload_preset,
    });

    return secure_url;
  }

  async uploadVideoAndGetUrl(
    filePath: string,
    folder: string
  ): Promise<string> {
    const { url, secure_url, public_id } = await cloudinary.uploader.upload(
      filePath,
      {
        resource_type: "video",
        folder,
        eager_async: true,
        chunk_size: 10 * 1024 * 1024, // 6mb
       // eager: [{ format: "mp4" }],
      }
    );

    const transformed_url = cloudinary.url(public_id, {
      resource_type: "video",
      format: "mp4",
      transformation: {
        duration: 30,
        width:720,
        height:405,
        fps:30,
      },
    });

    return transformed_url;
  }
}
