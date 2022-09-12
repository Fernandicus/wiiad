import CreateAdError from "./CreateAdError";

export default class AdTitle {
  public readonly value;

  constructor(title: string) {
    if (title == null || title.length == 0) {
      throw new CreateAdError("Ad title is mandatory");
    }
    if (title.length > 30) {
      throw new CreateAdError("Ad title max length is 30 characters");
    }
    this.value = title;
  }
}
