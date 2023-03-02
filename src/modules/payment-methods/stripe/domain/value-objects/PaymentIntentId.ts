import { ErrorCreatingStripe } from "../errors/ErrorCreatingStripe";

export class PaymentIntentId {
  readonly id;
  constructor(id: string) {
    if (!id) throw new ErrorCreatingStripe("Payment Method Id can't be empty");
    if (!id.includes("pi_"))
      throw new ErrorCreatingStripe("Payment Method Id must start with 'pi_'");
    this.id = id;
  }
}
