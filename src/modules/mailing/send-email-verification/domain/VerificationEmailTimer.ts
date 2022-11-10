import { Email } from "@/src/domain/Email";
import { Role } from "@/src/domain/Role";
import { UniqId } from "@/src/utils/UniqId";
import { ExpirationDate } from "./ExpirationDate";

export interface IVerificationEmailTimerPrimitives {
  id: string;
  expirationDate: Date;
  email: string;
  role: string;
  authToken:string;
}

export interface IVerificationEmailTimerProps {
  id: UniqId;
  expirationDate: ExpirationDate;
  email: Email;
  role: Role;
  authToken:string;
}

export class VerificationEmailTimer {
  readonly id;
  readonly expirationDate;
  readonly email;
  readonly role;
  readonly authToken;

  constructor(props: IVerificationEmailTimerProps) {
    this.id = props.id;
    this.expirationDate = props.expirationDate;
    this.email = props.email;
    this.role = props.role;
    this.authToken = props.authToken;
  }

  toPrimitives(): IVerificationEmailTimerPrimitives {
    return {
      id: this.id.id,
      email: this.email.email,
      role: this.role.role,
      expirationDate: this.expirationDate.date,
      authToken: this.authToken,
    };
  }
}
