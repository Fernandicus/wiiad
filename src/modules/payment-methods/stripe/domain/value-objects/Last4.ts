export class Last4 {
  readonly digits;
  constructor(last4: string) {
    if (!last4) throw new Error("Last4 cant be empty");
    if (last4.length !== 4) throw new Error(`Last4 must have 4 digits: ${last4}`);
    this.digits = last4;
  }
}
