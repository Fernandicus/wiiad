import { IEmailSender } from "../domain/IEmailSender";
import { VerificationURL } from "../domain/VerificationURL";

export class SendlVerificationEmail {
  constructor(private emailSender: IEmailSender) {}

  async send(verificationURL: VerificationURL): Promise<void> {
    await this.emailSender.send(verificationURL);
  }
}
