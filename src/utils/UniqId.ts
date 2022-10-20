import { v4 as uuidv4 } from "uuid";

export class UniqId {
  readonly id;

  constructor(id: string) {
    if (!id) throw new Error("Id cant be empty");
    this.id = id;
  }

  static new() {
    return new UniqId(uuidv4());
  }

  static generate(): string {
    return uuidv4();
  }
}
