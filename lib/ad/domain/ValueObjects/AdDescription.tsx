import { AdConstants } from "../../ad-constants";
import CreateAdError from "../CreateAdError";

export default class AdDescription {
  public readonly description;

  constructor(description: string) {
    if (description == null || description.length == 0) {
      throw new CreateAdError("Ad description is mandatory");
    }
    if (description.length > AdConstants.descriptionMaxLength) {
      throw new CreateAdError("Ad description max length is 500 characters");
    }
    this.description = description;
  }
}
