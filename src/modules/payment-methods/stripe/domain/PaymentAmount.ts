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
      throw new Error("Payment amount must be at least 5000 = 50,00€");
    this.amount = amount;
  }

  static fromItem(item: number): PaymentAmount {
    const keys = Object.keys(AvailableAmounts);
    const amount = parseInt(keys[item]);
    return new PaymentAmount(amount);
  }

  isValidAmount(): boolean {
    const keys = Object.keys(AvailableAmounts);
    const index = keys.indexOf(this.amount.toString());
    if (index == -1) return false;
    return true;
  }
}
