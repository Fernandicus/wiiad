import { AdConstants } from "../../ad-constants";
import { ErrorCreatingAd } from "../ErrorCreatingAd";

export class AdTitle {
  public readonly title;

  constructor(title: string) {
    if (title.length == 0) {
      throw new ErrorCreatingAd("Ad title is mandatory");
    }
    if (title.length > AdConstants.titleMaxLength) {
      throw new ErrorCreatingAd(
        `Ad title max length is ${AdConstants.titleMaxLength} characters`
      );
    }
    this.title = title;
  }
}
