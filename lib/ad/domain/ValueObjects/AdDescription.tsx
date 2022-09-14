import { AdConstants } from "../../ad-constants";
import {ErrorCreatingAd} from "../ErrorCreatingAd";

export default class AdDescription {
  public readonly description;

  constructor(description: string) {
    if (description == null || description.length == 0) {
      throw new ErrorCreatingAd("Ad description is mandatory");
    }
    if (description.length > AdConstants.descriptionMaxLength) {
      throw new ErrorCreatingAd("Ad description max length is 500 characters");
    }
    this.description = description;
  }
}
