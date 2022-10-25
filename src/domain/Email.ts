import { ErrorCreatingAdvertiser } from "../modules/advertiser/domain/ErrorCreatingAdvertiser";

export class Email {
  readonly email;
  constructor(email: string) {
    if (!email || !email.match(RegExp(/.+\@.+\..+/)))
      throw new Error("Email can't be empty");
    this.email = email;
  }
}
