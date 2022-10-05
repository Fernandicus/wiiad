import { Email } from "@/src/domain/Email";
import { ExpirationDate } from "./ExpirationDate";
import { VerificationTokenId } from "./VerificationTokenId";

export class EmailVerificationToken {
  readonly id;
  readonly expirationDate;
  readonly email;

  constructor(
    id: VerificationTokenId,
    expirationDate: ExpirationDate,
    email: Email
  ) {
    this.id = id;
    this.expirationDate = expirationDate;
    this.email = email;
  }
}
