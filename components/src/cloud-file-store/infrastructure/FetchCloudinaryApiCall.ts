import { IApiRespCloudinaryVideoSign } from "@/pages/api/v1/auth/cloudinary/video-sign-request";
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

  async uploadBanner(file: string): Promise<AdFileUrl> {
    const signedData = await this.getSignedData();
    const formData = this.formDataParse({ file, data: signedData });

    const uploadResp = await fetch(ApiRoutes.cloudinaryImageEndPoint, {
      method: "POST",
      body: formData,
    });
    const jsonResp = await uploadResp.json();
    const { public_id } = jsonResp as { public_id: string };

    const transformedVideo = this.transformImage(public_id);
    const url = transformedVideo.toURL();
    return new AdFileUrl(url);
  }

  async uploadVideo(file: string): Promise<AdFileUrl> {
    const signedData = await this.getSignedData();
    const formData = this.formDataParse({
      file,
      data: signedData,
    });

    const resp = await fetch(ApiRoutes.cloudinaryVideoEndPoint, {
      method: "POST",
      body: formData,
    });

    const jsonResp = await resp.json();
    const { public_id } = jsonResp as { public_id: string };

    const format = "mp4";
    const transformedVideo = this.transformVideo(public_id, format);
    const url = this.toURLVideo(transformedVideo, format);

    return new AdFileUrl(url);;
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

  private async getSignedData(): Promise<ICloudinarySignedParams> {
    const resp = await fetch(ApiRoutes.cloudinarySignedVideoData, {
      method: "GET",
    });
    const apiResp = await getApiResponse<IApiRespCloudinaryVideoSign>(resp);

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

  private transformImage(public_id: string): CloudinaryImage {
    const myImage = this.cld.image(public_id);
    const transformedImage = myImage
      .resize(fill().width(576).height(324).gravity("center"))
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
