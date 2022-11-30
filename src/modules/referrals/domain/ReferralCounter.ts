import { ErrorCreatingReferral } from "./errors/ErrorCreatingReferral";

export class ReferralCounter {
  private amount;

  constructor(amount: number) {
    if (amount < 0)
      throw new ErrorCreatingReferral("ReferralCounter amount must be >= 0");
    this.amount = amount;
  }

  static zero(): ReferralCounter {
    return new ReferralCounter(0);
  }

  static one(): ReferralCounter {
    return new ReferralCounter(1);
  }

  getAmount():number{
    return this.amount;
  }

  increase(): void {
    this.amount += 1;
  }
}
