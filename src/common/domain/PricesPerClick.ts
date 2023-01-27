export class PricesPerClick {
  readonly amounts = [
    [2000, 20],
    [5000, 20],
    [7000, 20],
    [10000, 20],
    [15000, 20],
  ];

  constructor() {}

  getAmounts():number[]{
    return this.amounts.map(amount => amount[0])
  }

  getPricePerClick():number[]{
    return this.amounts.map(amount => amount[1])
  }
  
  getClicksPerPrice(): number[] {
    return this.amounts.map((amount) => amount[0] / amount[1]);
  }
}
