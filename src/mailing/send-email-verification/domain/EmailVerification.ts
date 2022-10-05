import { Email } from "@/src/domain/Email";
import { ExpirationDate } from "./ExpirationDate";
import { VerificationTokenId } from "./VerificationTokenId";

export interface IEmailVerificationTokenProps {
  id: VerificationTokenId;
  expirationDate: ExpirationDate;
  email: Email;
}

export class EmailVerification {
  readonly id;
  readonly expirationDate;
  readonly email;

  constructor({ id, expirationDate, email }: IEmailVerificationTokenProps) {
    this.id = id;
    this.expirationDate = expirationDate;
    this.email = email;
  }
}
