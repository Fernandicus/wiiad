import { ErrorCreatingAd } from "../ErrorCreatingAd";

export class AdTitle {
  public readonly title;
  static readonly maxLength = 30;

  constructor(title: string) {
    if (title.length == 0) {
      throw new ErrorCreatingAd("Ad title is mandatory");
    }
    if (title.length > AdTitle.maxLength) {
      throw new ErrorCreatingAd(
        `Ad title max length is ${AdTitle.maxLength} characters`
      );
    }
    this.title = title;
  }
}