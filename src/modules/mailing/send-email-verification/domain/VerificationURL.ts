import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";

export interface IVerificationURLProps {
  userName: Name;
  to: Email;
  token: string;
}

export class VerificationURL {
  readonly url;
  readonly to;
  readonly userName;

  constructor(props: IVerificationURLProps) {
    const { to, token, userName } = props;
    this.to = to;
    this.userName = userName;
    this.url = `/${userName.name}?email=${to.email}&verificationToken=${token}`;
  }
}
