import { Email } from "@/src/common/domain/Email";
import { IVerificationEmailData } from "../../domain/interfaces/IVerificationEmailData";
import { VerificationURL } from "../../domain/VerificationURL";
import { createAuthTokenHandler } from "../../infrastructure/email-verification-container";
import { SendlVerificationEmail } from "../SendVerificationEmail";

interface ISendVerificationParams {
  sendTo: string;
  payload: IVerificationEmailData;
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
    const { sendTo, payload } = props;
    const authToken = createAuthTokenHandler.jwtExpiresIn15Min(payload);
    return new VerificationURL({
      to: new Email(sendTo),
      authToken,
    });
  }
}
