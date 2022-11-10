import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { AuthToken } from "./AuthToken";

export interface IVerificationURLProps {
  userName: Name;
  to: Email;
  authToken: AuthToken;
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
    const name = this.userName.name;
    const token = this.authToken.token;
    return `/${name}?log=${log}&authToken=${token}`;
  }
}
