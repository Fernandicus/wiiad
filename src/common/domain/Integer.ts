export class Integer {
  readonly value;
  constructor(value: number) {
    if (value < 0) throw new Error("Value must be > 0");
    this.value = value;
  }
}
