import { amountsAndPPClick } from "@/src/common/domain/AmountsAndPricePerClick";
import { getValuesForNumericEnum } from "@/src/utils/helpers";

export class PaymentAmount {
  readonly amount;
  constructor(amount: number) {
    if (amount < 5000)
      throw new Error(
        `Payment amount must be at least 5000 (50,00€), and received: ${amount}`
      );
    this.amount = amount;
  }

  static fromItem(item: number): PaymentAmount {
    const amountAndPPClick = amountsAndPPClick[item];
    const amount = amountAndPPClick[0];
    return new PaymentAmount(amount);
  }
}
