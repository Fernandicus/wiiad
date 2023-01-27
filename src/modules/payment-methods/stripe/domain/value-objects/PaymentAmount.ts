import { PricesPerClick } from "@/src/common/domain/PricesPerClick";

export class PaymentAmount {
  readonly amount;
  constructor(amount: number) {
    if (amount < 5000)
      throw new Error(
        `Payment amount must be at least 5000 (50,00€), and received: ${amount}`
      );
    this.amount = amount;
  }

  static fromItem(item: number, ppc = new PricesPerClick()): PaymentAmount {
    const amountAndPPClick = ppc.amounts[item];
    const amount = amountAndPPClick[0];
    return new PaymentAmount(amount);
  }
}
