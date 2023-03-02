import { ErrorCreatingStripe } from "../errors/ErrorCreatingStripe";

export class SetupIntentId {
  readonly id;
  constructor(id: string) {
    if (!id) throw new Error("Setup Intent Id can't be empty");
    if (!id.includes("seti_"))
      throw new Error("Setup Intent Id must start with 'seti_'");
    this.id = id;
  }
}
