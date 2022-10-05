import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { VerificationTokenId } from "./VerificationTokenId";

export interface VerificationEmailPropsPrimitives {
  id: string;
  expirationDate: Date;
  email: string;
}

export class VerificationEmail {
  readonly url;
  readonly to;
  readonly userName;

  constructor(props: {
    userName: Name;
    to: Email;
    token: VerificationTokenId;
  }) {
    const { to, token, userName } = props;
    this.to = to;
    this.userName = userName;
    this.url = `/${userName.name}?email=${to.email}&verificationToken=${token.id}`;
  }
}
