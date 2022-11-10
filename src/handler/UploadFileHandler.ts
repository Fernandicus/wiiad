import { UploadFile } from "@/src/use-case/UploadFile";
import { Folder } from "../domain/Folder";
import { Name } from "../domain/Name";

export class UploadFileHandler {
  constructor(private uploadFile: UploadFile) {}

  async imageAdvertising(params: {
    file: string;
    advertiserName: string;
  }): Promise<string> {
    const userName = new Name(params.advertiserName);
    const folder = Folder.bannerAd(userName);
    const url = await this.uploadFile.adBanner(params.file, folder);
    return url.image;
  }

  async videoAdvertising(params: {
    file: string;
    advertiserName: string;
  }): Promise<string> {
    const userName = new Name(params.advertiserName);
    const folder = Folder.videoAd(userName);
    const url = await this.uploadFile.adVideo(params.file, folder);
    return url.image;
  }
}
