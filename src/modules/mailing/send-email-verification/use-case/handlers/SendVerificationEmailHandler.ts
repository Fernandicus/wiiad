import { Email } from "@/src/common/domain/Email";
import { IVerificationEmailData } from "../../domain/interfaces/IVerificationEmailData";
import { VerificationURL } from "../../domain/VerificationURL";
import { createAuthTokenHandler } from "../../infrastructure/email-verification-container";
import { SendlVerificationEmail } from "../SendVerificationEmail";

interface ISendVerificationParams<T> {
  sendTo: string;
  payload: T;
}

interface ISendSignIn extends ISendVerificationParams<IVerificationEmailData> {}

export class SendVerificationEmailHandler {
  constructor(private sendEmail: SendlVerificationEmail) {}

  async sendLogin(props: ISendSignIn): Promise<void> {
    const verificationEmail = this.getVerificationURL(props);
    await this.sendEmail.login(verificationEmail);
  }

  async sendSignUp(props: ISendSignIn): Promise<void> {
    const verificationEmail = this.getVerificationURL(props);
    await this.sendEmail.signUp(verificationEmail);
  }

  async sendUpdate(
    props: ISendVerificationParams<{ email: string }>
  ): Promise<void> {
    const verificationEmail = this.getVerificationURL(props);
    await this.sendEmail.updateEmail(verificationEmail);
  }

  private getVerificationURL<T extends object>(
    props: ISendVerificationParams<T>
  ): VerificationURL {
    const { sendTo, payload } = props;
    const authToken = createAuthTokenHandler.jwtExpiresIn15Min<T>(payload);
    return new VerificationURL({
      to: new Email(sendTo),
      authToken,
    });
  }
}
