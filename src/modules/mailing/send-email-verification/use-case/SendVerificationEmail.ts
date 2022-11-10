import { IAuthTokenRepo } from "../domain/IAuthTokenRepo";
import { IEmailSenderRepo } from "../domain/IEmailSenderRepo";
import { VerificationURL } from "../domain/VerificationURL";

export class SendlVerificationEmail {
  constructor(private emailSender: IEmailSenderRepo) {}

  async login(verificationURL: VerificationURL): Promise<void> {
    await this.emailSender.login(verificationURL);
  }
}
