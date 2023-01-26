import { PaymentAmount } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentAmount";

export class Clicks {
  readonly clicks;
  constructor(clicks: number) {
    if (clicks <= 0) throw new Error("Clicks cant be zero or lower");
    this.clicks = clicks;
  }
}
