import { ErrorCreatingAdvertiser } from "../../modules/advertiser/domain/ErrorCreatingAdvertiser";

export class Name {
  readonly name;
  constructor(name: string) {
    if (!name) throw new ErrorCreatingAdvertiser("Name cant be empty");
    this.name = name;
  }
}
