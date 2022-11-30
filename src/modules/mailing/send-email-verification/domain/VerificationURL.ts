import { Email } from "@/src/common/domain/Email";
import { LogStates } from "@/src/common/domain/LogStates";
import { Name } from "@/src/common/domain/Name";
import { AuthToken } from "./value-objects/AuthToken";

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
    return this.verificationUrl(LogStates.LogIn);
  }

  signUp(): string {
    return this.verificationUrl(LogStates.SignUp);
  }

  private verificationUrl(log: LogStates) {
    const name = this.userName.name;
    const token = this.authToken.token;
    return `profile?userName=${name}&log=${log}&authToken=${token}`;
  }
}
