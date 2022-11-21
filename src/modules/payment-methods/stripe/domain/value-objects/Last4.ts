export class Last4 {
  readonly digits;
  constructor(las4: string) {
    if (!las4) throw new Error("Last4 cant be empty");
    if (las4.length > 4) throw new Error("Last4 cant have more than 4 digits");
    if (las4.length < 4) throw new Error("Last4 cant have less than 4 digits");
    this.digits = las4;
  }
}
