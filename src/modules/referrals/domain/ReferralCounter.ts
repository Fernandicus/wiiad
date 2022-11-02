import { ErrorCreatingReferral } from "./ErrorCreatingReferral";

export class ReferralCounter {
  readonly amount;

  constructor(amount: number) {
    if (amount < 0)
      throw new ErrorCreatingReferral("ReferralCounter amount must be >= 0");
    this.amount = amount;
  }

  static zero(): ReferralCounter {
    return new ReferralCounter(0);
  }

  increase(): number {
    return this.amount + 1;
  }
}
