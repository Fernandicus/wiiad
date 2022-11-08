import { UploadFile } from "@/src/use-case/UploadFile";

export class UploadFileHandler {
  constructor(private uploadFile: UploadFile) {}

  async imageAdvertising(params: {
    file: string;
    advertiserName: string;
  }): Promise<string> {
    const path = `advertisers/${params.advertiserName}/ads/images/`;
    const url = await this.uploadFile.image(params.file, path);
    return url;
  }

  async videoAdvertising(params: {
    file: string;
    advertiserName: string;
  }): Promise<string> {
    console.log("LOADING VIDEO ");
    const path = `advertisers/${params.advertiserName}/ads/videos/`;
    const url = await this.uploadFile.video(params.file, path);
    return url;
  }
}
