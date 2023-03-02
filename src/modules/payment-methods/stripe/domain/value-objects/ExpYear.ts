export class ExpYear {
  readonly year;
  constructor(year: number) {
    this.assertYear(year);
    this.year = year;
  }
  
  private assertYear(year: number): boolean {
    if (this.isExpired(year)) throw new Error(`Exp Year is expired: ${year}`);
    if (this.hasFormat_YYYY(year))
      throw new Error(`Exp Year format must be YYYY`);
    return true;
  }

  private isExpired(year: number): boolean {
    const currentYear = new Date(Date.now()).getFullYear();
    return currentYear > year;
  }

  private hasFormat_YYYY(year: number): boolean {
    return year.toString().length !== 4;
  }
}
