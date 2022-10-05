import { Email } from "@/src/domain/Email";
import { ExpirationDate } from "./ExpirationDate";
import { VerificationTokenId } from "./VerificationTokenId";

export interface EmailVerificationTokenProps {
  id: VerificationTokenId;
  expirationDate: ExpirationDate;
  email: Email;
}

export interface EmailVerificationTokenPropsPrimitives {
  id: string;
  expirationDate: Date;
  email: string;
}

export class EmailVerificationToken {
  readonly id;
  readonly expirationDate;
  readonly email;

  constructor({ id, expirationDate, email }: EmailVerificationTokenProps) {
    this.id = id;
    this.expirationDate = expirationDate;
    this.email = email;
  }
}
