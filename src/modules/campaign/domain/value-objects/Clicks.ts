export class Clicks {
  readonly clicks;

  constructor(clicks: number) {
    if (clicks < 0) throw new Error("Clicks cant be negative");
    this.clicks = clicks;
  }

  static zero(): Clicks {
    return new Clicks(0);
  }
}
