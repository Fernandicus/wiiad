import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { AuthToken } from "../domain/AuthToken";
import { IAuthTokenRepo } from "../domain/IAuthTokenRepo";
import { VerificationURL } from "../domain/VerificationURL";
import { CreateAuthToken } from "../use-case/CreateAuthToken";
import { SendlVerificationEmail } from "../use-case/SendVerificationEmail";

export class SendVerificationEmailHandler {
  constructor(private sendEmail: SendlVerificationEmail) {}

  async sendLogin(props: {
    userName: string;
    email: string;
    authToken: string;
  }): Promise<void> {
    const verificationEmail = new VerificationURL({
      userName: new Name(props.userName),
      to: new Email(props.email),
      authToken: new AuthToken(props.authToken),
    });
    await this.sendEmail.login(verificationEmail);
  }
}
