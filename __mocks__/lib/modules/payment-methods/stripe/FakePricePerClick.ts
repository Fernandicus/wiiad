import { PricesPerClick } from "@/src/common/domain/PricesPerClick";

export class FakePricePerClick extends PricesPerClick {
  constructor(budgetItem = 0) {
    super(budgetItem);
  }

  static selectRandomFromList(): FakePricePerClick {
    const pricePerClick = new PricesPerClick();
    const amounts =  pricePerClick.getAmounts();
    const listLength = amounts.length - 1;
    const randomNum = Math.round(Math.random() * listLength);
    return new FakePricePerClick(randomNum);
  }
}
