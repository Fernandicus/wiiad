import { ICloudinarySignedParams } from "@/src/infrastructure/CloudinaryCloudStorageRepo";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import {
  Cloudinary,
  CloudinaryImage,
  CloudinaryVideo,
  Transformation,
} from "@cloudinary/url-gen";
import { VideoEdit } from "@cloudinary/url-gen/actions";
import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import { fps } from "@cloudinary/url-gen/actions/transcode";
import { Gravity } from "@cloudinary/url-gen/qualifiers";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

export class CloudinaryUploader {
  private cld;

  constructor() {
    this.cld = new Cloudinary({
      cloud: {
        cloudName: "fernanprojects",
      },
      /*  url: {
        secureDistribution: "http://localhost:3000/",
        secure: false,
      }, */
    });
  }

  async uploadBanner(file: string): Promise<string> {
    const data = await this.getSignedData();
    const formData = this.formDataParse({ file, data });

    const uploadResp = await fetch(ApiRoutes.cloudinaryImageEndPoint, {
      method: "POST",
      body: formData,
    });
    const jsonResp = await uploadResp.json();
    const { public_id } = jsonResp as { public_id: string };

    const transformedVideo = this.transformImage(public_id);

    return transformedVideo.toURL();
  }

  async uploadVideo(file: string): Promise<string> {
    const data = await this.getSignedData();
    const formData = this.formDataParse({ file, data });

    const uploadResp = await fetch(ApiRoutes.cloudinaryVideoEndPoint, {
      method: "POST",
      body: formData,
    });

    const jsonResp = await uploadResp.json();
    const { public_id } = jsonResp as { public_id: string };

    const format = "mp4";
    const transformedVideo = this.transformVideo(public_id, format);
    const url = this.toURL(transformedVideo, format);

    return url;
  }

  private async getSignedData(): Promise<ICloudinarySignedParams> {
    const apiResponse = await fetch(ApiRoutes.getCloudinarySignedData, {
      method: "GET",
    });

    const data = (await apiResponse.json()) as ICloudinarySignedParams;

    return data;
  }

  private formDataParse(params: {
    file: string;
    data: ICloudinarySignedParams;
  }): FormData {
    const { data, file } = params;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("signature", data.signature);
    formData.append("api_key", data.api_key);
    formData.append("timestamp", data.timestamp.toString());
    formData.append("folder", data.signedParams.folder!);
    return formData;
  }

  private transformVideo(public_id: string, format: string): CloudinaryVideo {
    const myVideo = this.cld.video(public_id);
    const videoTransformedData = myVideo
      .format(format)
      .quality("auto")
      .videoEdit(VideoEdit.trim().duration(30))
      .addTransformation(
        new Transformation()
          .resize(scale().width(750).height(405))
          .transcode(fps(30))
      );
    return videoTransformedData;
  }

  private toURL(videoTransformed: CloudinaryVideo, format: string): string {
    const url = videoTransformed.toURL();
    const cleanedURL = url.split("?")[0];
    const urlWithExtension = cleanedURL.concat("." + format);
    return urlWithExtension;
  }

  private transformImage(public_id: string): CloudinaryImage {
    const myImage = this.cld.image(public_id);
    const transformedImage = myImage
      .resize(fill().width(576).height(324).gravity("center"))
      .format("png");
    return transformedImage;
  }
}
