export class ExpMonth {
  readonly month;
  constructor(month: number) {
    if (month < 1) throw new Error("Exp Month cant be less than 0");
    if (month > 12) throw new Error("Exp Month cant be more than 12");
    this.month = month;
  }
}
