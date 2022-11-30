export class AdDescription {
  public readonly description;
  static readonly maxLength = 500;

  constructor(description: string) {
    if (description.length == 0) {
      throw new Error("Ad description is mandatory");
    }
    if (description.length > AdDescription.maxLength) {
      throw new Error("Ad description max length is 500 characters");
    }
    this.description = description;
  }
}
