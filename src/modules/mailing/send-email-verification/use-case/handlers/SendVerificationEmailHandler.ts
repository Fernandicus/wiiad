import { Email } from "@/src/common/domain/Email";
import { AuthToken } from "../../domain/value-objects/AuthToken";
import { VerificationURL } from "../../domain/VerificationURL";
import { SendlVerificationEmail } from "../SendVerificationEmail";

interface ISendVerificationParams {
  email: string;
  authToken: string;
}

export class SendVerificationEmailHandler {
  constructor(private sendEmail: SendlVerificationEmail) {}

  async sendLogin(props: ISendVerificationParams): Promise<void> {
    const verificationEmail = this.getVerificationURL(props);
    await this.sendEmail.login(verificationEmail);
  }

  async sendSignUp(props: ISendVerificationParams): Promise<void> {
    const verificationEmail = this.getVerificationURL(props);
    await this.sendEmail.signUp(verificationEmail);
  }

  private getVerificationURL(props: ISendVerificationParams): VerificationURL {
    return new VerificationURL({
      to: new Email(props.email),
      authToken: new AuthToken(props.authToken),
    });
  }
}
