import CreateAdError from "./CreateAdError";

export default class AdDescription {
  public readonly description;

  constructor(description: string) {
    if (description == null || description.length == 0) {
      throw new CreateAdError("Ad description is mandatory");
    }
    if (description.length > 500) {
      throw new CreateAdError("Ad description max length is 500 characters");
    }
    this.description = description;
  }
}
