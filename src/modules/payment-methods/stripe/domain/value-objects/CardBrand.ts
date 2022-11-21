export class CardBrand {
  readonly brand;
  constructor(brand: string) {
    if (!brand) throw new Error("Brand cant be empty");
    this.brand = brand;
  }
}
