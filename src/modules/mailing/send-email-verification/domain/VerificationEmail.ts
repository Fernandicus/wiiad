import { Email } from "@/src/domain/Email";
import { Role } from "@/src/domain/Role";
import { UniqId } from "@/src/utils/UniqId";
import { AuthToken } from "./AuthToken";
import { ExpirationDate } from "./ExpirationDate";

export interface IVerificationEmailPrimitives {
  id: string;
  expirationDate: Date;
  email: string;
  role: string;
  authToken: string;
}

export interface IVerificationEmailProps {
  id: UniqId;
  expirationDate: ExpirationDate;
  email: Email;
  role: Role;
  authToken: AuthToken;
}

export class VerificationEmail {
  readonly id;
  readonly expirationDate;
  readonly email;
  readonly role;
  readonly authToken;

  constructor(props: IVerificationEmailProps) {
    this.id = props.id;
    this.expirationDate = props.expirationDate;
    this.email = props.email;
    this.role = props.role;
    this.authToken = props.authToken;
  }

  toPrimitives(): IVerificationEmailPrimitives {
    return {
      id: this.id.id,
      email: this.email.email,
      role: this.role.role,
      expirationDate: this.expirationDate.date,
      authToken: this.authToken.token,
    };
  }
}
