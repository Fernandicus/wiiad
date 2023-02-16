import { IApiRespCloudinarySignature } from "@/pages/api/v1/auth/cloudinary/video-sign-request";
import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { AdFileUrl } from "@/src/modules/ad/domain/value-objects/AdFileUrl";
import { ICloudinarySignedParams } from "@/src/modules/storage/infrastructure/cloudinary/CloudinaryCloudStorageRepo";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { getApiResponse } from "@/src/utils/helpers";
import {
  Cloudinary,
  CloudinaryImage,
  CloudinaryVideo,
  Transformation,
} from "@cloudinary/url-gen";
import { VideoEdit } from "@cloudinary/url-gen/actions";
import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import { fps } from "@cloudinary/url-gen/actions/transcode";
import { ErrorFetchingCloudinary } from "../domain/errors/ErrorFetchingCloudinary";
import { ICloudFileStoreApiCall } from "../domain/interfaces/ICloudFileStoreApiCall";

export class FetchCloudinaryApiCall implements ICloudFileStoreApiCall {
  private cld;

  constructor() {
    this.cld = new Cloudinary({
      cloud: {
        cloudName: ApiRoutes.cloudinaryCloudName,
      },
      /*  url: {
          secureDistribution: "http://localhost:3000/",
          secure: false,
        }, */
    });
  }

  async uploadProfilePic(file: string): Promise<ProfilePic> {
    const { public_id } = await this.getPublicId({
      file,
      signedDataEndPoint: ApiRoutes.cloudinarySignedProfilePic,
      cloudinaryEndPoint: ApiRoutes.cloudinaryImageEndPoint,
    });
    const transformedImage = this.transformImage(public_id, {
      width: 128,
      height: 128,
    });
    const url = transformedImage.toURL();
    return new ProfilePic(url);
  }

  async uploadBanner(file: string): Promise<AdFileUrl> {
    const { public_id } = await this.getPublicId({
      file,
      signedDataEndPoint: ApiRoutes.cloudinarySignedBannerData,
      cloudinaryEndPoint: ApiRoutes.cloudinaryImageEndPoint,
    });

    const transformedImage = this.transformImage(public_id);
    const url = transformedImage.toURL();
    return new AdFileUrl(url);
  }

  async uploadVideo(file: string): Promise<AdFileUrl> {
    const { public_id } = await this.getPublicId({
      file,
      signedDataEndPoint: ApiRoutes.cloudinarySignedVideoData,
      cloudinaryEndPoint: ApiRoutes.cloudinaryVideoEndPoint,
    });

    const format = "mp4";
    const transformedVideo = this.transformVideo(public_id, format);
    const url = this.toURLVideo(transformedVideo, format);

    return new AdFileUrl(url);
  }

  private async getPublicId(params: {
    file: string;
    signedDataEndPoint: string;
    cloudinaryEndPoint: string;
  }) {
    const { file, cloudinaryEndPoint, signedDataEndPoint } = params;
    
    const signedData = await this.getSignedData(signedDataEndPoint);
    const formData = this.formDataParse({
      file,
      data: signedData,
    });
    const resp = await fetch(cloudinaryEndPoint, {
      method: "POST",
      body: formData,
    });

    const jsonResp = await resp.json();
    return jsonResp as { public_id: string };
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

  private async getSignedData(url: string): Promise<ICloudinarySignedParams> {
    const resp = await fetch(url, {
      method: "GET",
    });
    const apiResp = await getApiResponse<IApiRespCloudinarySignature>(resp);
    if (resp.status !== 200 || !apiResp.data)
      throw ErrorFetchingCloudinary.gettingSignedData(apiResp.message);

    return apiResp.data;
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

  private transformImage(
    public_id: string,
    size?: { width: number; height: number }
  ): CloudinaryImage {
    const { width, height } = !size ? { width: 576, height: 324 } : size;
    
    const myImage = this.cld.image(public_id);
    const transformedImage = myImage
      .resize(fill().width(width).height(height).gravity("center"))
      .format("png");
    return transformedImage;
  }

  private toURLVideo(
    videoTransformed: CloudinaryVideo,
    format: string
  ): string {
    const url = videoTransformed.toURL();
    const cleanedURL = url.split("?")[0];
    const urlWithExtension = cleanedURL.concat("." + format);
    return urlWithExtension;
  }
}
