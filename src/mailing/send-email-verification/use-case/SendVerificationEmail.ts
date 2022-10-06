import { IEmailSender } from "../domain/IEmailSender";
import { SMTPData } from "../domain/SMTPData";
import { VerificationEmail } from "../domain/VerificationEmail";

export class SendlVerificationEmail {
  constructor(private emailSender: IEmailSender) {}

  async send(verificationEmail: VerificationEmail): Promise<void> {
    await this.emailSender.send({
      to: verificationEmail.to.email,
      url: verificationEmail.url,
    });
  }
}