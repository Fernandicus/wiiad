import { ErrorCreatingAdvertiser } from "../advertiser/domain/ErrorCreatingAdvertiser";

export class Email {
  readonly email;
  constructor(email: string) {
    if (email == "") throw new ErrorCreatingAdvertiser("Email can't be empty");
    this.email = email;
  }
}
