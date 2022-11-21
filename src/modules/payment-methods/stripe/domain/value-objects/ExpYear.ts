export class ExpYear {
  readonly year;
  constructor(year: number) {
    const currentYear = new Date(Date.now()).getFullYear();
    if (currentYear > year) throw new Error(`Exp Year is expired: ${year}`);
    this.year = year;
  }
}
