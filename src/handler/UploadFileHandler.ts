import { UploadFile } from "@/src/use-case/UploadFile";

export class UploadFileHandler {
  constructor(private uploadFile: UploadFile) {}

  async advertiseImage(params: {
    file: string;
    advertiserName: string;
  }): Promise<string> {
    const path = `advertisers/${params.advertiserName}/ads/`;
    const url = await this.uploadFile.image(params.file, path);
    return url;
  }
}
