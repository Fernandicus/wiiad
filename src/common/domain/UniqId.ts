import { v4 as uuidv4, validate } from "uuid";

export class UniqId {
  readonly id;

  constructor(id: string) {
    if (!id) throw new Error("Id cant be empty");
    const uniqId = id.split("_").at(-1)!;
    if (!validate(uniqId)) throw new Error("Id is not a valid UUID");
    this.id = uniqId;
  }

  static new(): UniqId {
    return new UniqId(uuidv4());
  }

  static generate(): string {
    return uuidv4();
  }

  /* getStringUUID(): string {
    return this.id.split("_").at(-1)!;
  }

  getUUID(): UniqId {
    return new UniqId(this.getStringUUID());
  } */
}
