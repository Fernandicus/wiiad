import { getEnumValues } from "@/src/utils/helpers";

export enum AvailableAmounts {
  Fifty = 5000,
  Seventy = 7000,
  OneHundred = 10000,
  OneHundredFifty = 15000,
  TwoHundred = 20000,
}

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
    const entries = getEnumValues(AvailableAmounts) as number[];

    if (item > entries.length - 1 || item < 0) {
      throw new Error(
        `Payment amount item '${item}' do not exist. These are '${entries.length}' available items: ${entries}`
      );
    }
    const amount = entries[item];
    return new PaymentAmount(amount);
  }
}
