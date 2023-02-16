import { IEmailSenderRepo } from "../domain/interfaces/IEmailSenderRepo";
import { VerificationURL } from "../domain/VerificationURL";

export class SendlVerificationEmail {
  constructor(private emailSender: IEmailSenderRepo) {}

  async login(verificationURL: VerificationURL): Promise<void> {
    await this.emailSender.login(verificationURL);
  }

  async signUp(verificationURL: VerificationURL): Promise<void> {
    await this.emailSender.signUp(verificationURL);
  }

  async updateEmail(verificationURL: VerificationURL): Promise<void> {
    await this.emailSender.updateEmail(verificationURL);
  }
}
