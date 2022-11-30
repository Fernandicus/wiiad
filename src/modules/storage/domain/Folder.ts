import { Name } from "../../../common/domain/Name";

export class Folder {
  readonly path;
  constructor(path: string) {
    this.path = path;
  }

  static bannerAd(userName: Name){
    const path = `advertisers/${userName.name}/ads/banners/`;
    return new Folder(path);
  }

  static videoAd(userName: Name){
    const path = `advertisers/${userName.name}/ads/videos/`;
    return new Folder(path);
  }
}
