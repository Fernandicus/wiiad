import { Email } from "@/src/common/domain/Email";
import { LoginQuery } from "@/src/common/domain/LoginQueries";
import { LogStates } from "@/src/common/domain/LogStates";
import { AuthToken } from "./value-objects/AuthToken";

export interface IVerificationURLProps {
  to: Email;
  authToken: AuthToken;
}

export class VerificationURL {
  readonly to;
  readonly authToken;

  constructor(props: IVerificationURLProps) {
    const { to, authToken } = props;
    this.to = to;
    this.authToken = authToken;
  }

  login(): string {
    return this.verificationUrl(LogStates.LogIn);
  }

  signUp(): string {
    return this.verificationUrl(LogStates.SignUp);
  }

  updateEmail(): string {
    return this.verificationUrl(LogStates.UpdateEmail);
  }

  private verificationUrl(logState: LogStates) {
    const token = this.authToken.token;
    const log = LoginQuery.Log;
    const authToken = LoginQuery.AuthToken;
    return `profile?${log}=${logState}&${authToken}=${token}`;
  }
}
