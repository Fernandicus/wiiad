import { ErrorCreatingAdvertiser } from "../advertiser/domain/ErrorCreatingAdvertiser";

export class Password {
  readonly password;
  constructor(password: string) {
    if (password == "")
      throw new ErrorCreatingAdvertiser("Password can't be empty");
    this.password = password;
  }
}
