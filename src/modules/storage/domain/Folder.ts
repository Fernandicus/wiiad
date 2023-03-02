import { UniqId } from "@/src/utils/UniqId";

export class Folder {
  readonly path;
  constructor(path: string) {
    this.path = path;
  }

  static bannerAd(userId: UniqId) {
    const path = `advertisers/${userId.id}/ads/banners/`;
    return new Folder(path);
  }

  static videoAd(userId: UniqId) {
    const path = `advertisers/${userId.id}/ads/videos/`;
    return new Folder(path);
  }

  static advertiserProfilePic(userId: UniqId) {
    const path = `advertisers/${userId.id}/profilePic/`;
    return new Folder(path);
  }

  static userProfilePic(userId: UniqId) {
    const path = `users/${userId.id}/profilePic/`;
    return new Folder(path);
  }
}
