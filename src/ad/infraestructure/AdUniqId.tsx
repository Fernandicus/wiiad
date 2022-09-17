import uniqid from "uniqid";

export class AdUniqId {
  static generate(): string {
    return uniqid();
  }
}
