import { PaymentAmount } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentAmount";

export class PricesPerClick {
  readonly amounts = [
    [2000, 20],
    [5000, 20],
    [7000, 20],
    [10000, 20],
    [15000, 20],
  ];

  readonly selectedBudget;
  readonly selectedAmount;
  readonly selectedClicks;

  constructor(budget = 0) {
    if (budget > this.amounts.length - 1 || budget < 0)
      throw new Error(
        `Prices per click selectedBudget can't be bigger than ${
          this.amounts.length - 1
        } or smaller than 0`
      );
    this.selectedBudget = budget;
    this.selectedAmount = this.amounts[budget][0];
    this.selectedClicks = this.getClicksPerPrice()[budget];
  }

  static fromAmount(pAmount: PaymentAmount) {
    const ppc = new PricesPerClick();
    const amounts = ppc.getAmounts();
    const index = amounts.findIndex((amount) => amount == pAmount.amount);
    return new PricesPerClick(index);
  }

  getAmounts(): number[] {
    return this.amounts.map((amount) => amount[0]);
  }

  getPricePerClick(): number[] {
    return this.amounts.map((amount) => amount[1]);
  }

  getClicksPerPrice(): number[] {
    return this.amounts.map((amount) => amount[0] / amount[1]);
  }

  getIndexFromPrice(price: number): number {
    return this.amounts.findIndex((budget) => budget[0] === price);
  }
}
