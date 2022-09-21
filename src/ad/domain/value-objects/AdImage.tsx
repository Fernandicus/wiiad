import {ErrorCreatingAd} from "../ErrorCreatingAd";

export class AdImage {
  public readonly image;
  constructor(image: string) {
    if (image == null || image.length == 0) {
      throw new ErrorCreatingAd("Ad image is mandatory");
    }
    this.image = image;
  }
}
