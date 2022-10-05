import { IEmailSender } from "../domain/IEmailSender";
import { VerificationEmail } from "../domain/VerificationEmail";

export class SendEmailVerification {
  constructor(private emailSender: IEmailSender) {}

  async send(verificationEmail: VerificationEmail): Promise<void> {
    await this.emailSender.send({
      to: verificationEmail.to.email,
      url: verificationEmail.url,
    });
  }
}
