import { Email } from "@/src/domain/Email";
import { ExpirationDate } from "./ExpirationDate";
import { VerificationTokenId } from "./VerificationTokenId";

export interface IVerificationEmailTimerProps {
  id: VerificationTokenId;
  expirationDate: ExpirationDate;
  email: Email;
}

export class VerificationEmailTimer {
  readonly id;
  readonly expirationDate;
  readonly email;

  constructor(props: IVerificationEmailTimerProps) {
    this.id = props.id;
    this.expirationDate = props.expirationDate;
    this.email = props.email;
  }

}
