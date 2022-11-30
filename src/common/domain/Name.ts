
export class Name {
  readonly name;
  constructor(name: string) {
    if (!name) throw new Error("Name cant be empty");
    this.name = name;
  }
}
