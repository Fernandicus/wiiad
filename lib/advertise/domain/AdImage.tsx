import CreateAdError from "./CreateAdError";

export default class AdImage {
  public readonly value;
  constructor(image: string) {
    if (image == null || image.length == 0) {
      throw new CreateAdError("Ad image is mandatory");
    }
    this.value = image;
  }
}
