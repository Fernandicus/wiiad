import { ErrorCreatingStripe } from "./ErrorCreatingStripe";

export class PaymentMethodId {
  readonly id;
  constructor(id: string) {
    if (!id) throw new ErrorCreatingStripe("Payment Method Id can't be empty");
    if (!id.includes("pm_"))
      throw new ErrorCreatingStripe("Payment Method Id must start with 'pm_'");
    this.id = id;
  }
}
