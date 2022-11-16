export class PaymentAmount {
  readonly amount;
  constructor(amount: number) {
    if (amount < 5000)
      throw new Error("Payment amount must be at least 5000 = 50,00€");
    this.amount = amount;
  }
}
