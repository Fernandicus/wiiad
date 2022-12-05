export class ExpMonth {
  readonly month;
  constructor(month: number) {
    if (month < 0) throw new Error("Exp Month cant be less than 0");
    if (month > 11) throw new Error("Exp Month cant be more than 11");
    this.month = month;
  }
}
