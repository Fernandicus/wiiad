import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";

export interface IVerificationURLProps {
  userName: Name;
  to: Email;
  authToken: string;
}

export class VerificationURL {
  readonly to;
  readonly userName;
  readonly authToken;

  constructor(props: IVerificationURLProps) {
    const { to, authToken, userName } = props;
    this.to = to;
    this.userName = userName;
    this.authToken = authToken;
  }

  login(): string {
    return this.verificationUrl("login");
  }

  signUp(): string {
    return this.verificationUrl("sign-up");
  }

  private verificationUrl(log: string) {
    return `/${this.userName.name}?log=${log}&authToken=${this.authToken}`;
  }
}
