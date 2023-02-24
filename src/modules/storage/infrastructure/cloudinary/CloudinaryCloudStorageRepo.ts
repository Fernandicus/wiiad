import { ICloudStorageRepo } from "../../domain/interfaces/ICloudStorageRepo";
import { UploadApiOptions, v2 as cloudinary } from "cloudinary";
import { Folder } from "../../domain/Folder";
import { AdFileUrl } from "../../../ad/domain/value-objects/AdFileUrl";
import { Name } from "../../../../common/domain/Name";
import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { projectConfig } from "@/src/utils/projectConfig";

cloudinary.config({
  cloud_name: projectConfig.CLOUDINARY.name,
  api_key: projectConfig.CLOUDINARY.api_key,
  api_secret: projectConfig.CLOUDINARY.api_secret,
});

interface ICloudinaryApiSign {
  signature: string;
  timestamp: number;
  signedParams: UploadApiOptions;
}

export interface ICloudinarySignedParams {
  signature: string;
  timestamp: number;
  signedParams: UploadApiOptions;
  api_key: string;
}

export class CloudinaryCloudStorageRepo implements ICloudStorageRepo {
  getSignedData(folder: Folder): ICloudinarySignedParams {
    const { signature, timestamp, signedParams } = this.apiSignature({
      folder: folder.path,
    });
    return {
      signature,
      timestamp,
      signedParams,
      api_key: projectConfig.CLOUDINARY.api_key!,
    };
  }

  /**
   * Docs:
   *
   * https://cloudinary.com/documentation/upload_images#generating_authentication_signatures
   *
   * https://cloudinary.com/documentation/upload_images#uploading_with_a_direct_call_to_the_rest_api
   *
   * */
  private apiSignature(params_to_sign: UploadApiOptions): ICloudinaryApiSign {
    const timestamp = Date.now();
    const signedParams = params_to_sign;
    const signature = cloudinary.utils.api_sign_request(
      { ...signedParams, timestamp },
      projectConfig.CLOUDINARY.api_secret!
    );
    return { signature, timestamp, signedParams };
  }
}
