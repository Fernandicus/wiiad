import { IEmailSender } from "../domain/IEmailSender";
import { SMTPData } from "../domain/SMTPData";
import { VerificationURL } from "../domain/VerificationURL";

export class SendlVerificationEmail {
  constructor(private emailSender: IEmailSender) {}

  async send(verificationURL: VerificationURL): Promise<void> {
    await this.emailSender.send({
      to: verificationURL.to.email,
      url: verificationURL.url,
    });
  }
}