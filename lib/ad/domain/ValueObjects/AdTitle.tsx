import { AdConstants } from "../../ad-constants";
import CreateAdError from "../CreateAdError";

export default class AdTitle {
  public readonly title;

  constructor(title: string) {
    if (title == null || title.length == 0) {
      throw new CreateAdError("Ad title is mandatory");
    }
    if (title.length > AdConstants.titleMaxLength) {
      throw new CreateAdError(
        `Ad title max length is 30 characters ${title} ${title.length}`
      );
    }
    this.title = title;
  }
  
}
