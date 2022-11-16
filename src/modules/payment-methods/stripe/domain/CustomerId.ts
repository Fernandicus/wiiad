import { ErrorCreatingStripe } from "./ErrorCreatingStripe";

export class CustomerId {
  readonly id;
  constructor(id: string) {
    if (!id) throw new ErrorCreatingStripe("Customer Id can't be empty");
    if (!id.includes("cus_"))
      throw new ErrorCreatingStripe("Customer Id must start with 'cus_'");
    this.id = id;
  }
}
