import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { VerificationTokenId } from "./VerificationTokenId";

export interface IVerificationEmailPropsPrimitives {
  id: string;
  expirationDate: Date;
  email: string;
}

export interface IVerificationURLProps {
  userName: Name;
  to: Email;
  token: VerificationTokenId;
}

export class VerificationURL {
  readonly url;
  readonly to;
  readonly userName;

  constructor(props: IVerificationURLProps) {
    const { to, token, userName } = props;
    this.to = to;
    this.userName = userName;
    this.url = `/${userName.name}?email=${to.email}&verificationToken=${token.id}`;
  }
}
