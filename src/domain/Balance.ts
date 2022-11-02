export class Balance {
  readonly total;
  constructor(total: number) {
    if (total < 0) throw new Error("Balance cant be lower than zero");
    this.total = total;
  }

  static empty(): Balance {
    return new Balance(0);
  }
}
