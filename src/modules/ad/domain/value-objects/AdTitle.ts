export class AdTitle {
  public readonly title;
  static readonly maxLength = 40;

  constructor(title: string) {
    if (title.length == 0) {
      throw new Error("Ad title is mandatory");
    }
    if (title.length > AdTitle.maxLength) {
      throw new Error(`Ad title max length is ${AdTitle.maxLength} characters`);
    }
    this.title = title;
  }
}
