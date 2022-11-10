import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { IAuthTokenRepo } from "../domain/IAuthTokenRepo";
import { VerificationURL } from "../domain/VerificationURL";
import { CreateAuthToken } from "../use-case/CreateAuthToken";
import { SendlVerificationEmail } from "../use-case/SendVerificationEmail";

export class SendVerificationEmailHandler {
  constructor(private sendEmail: SendlVerificationEmail, private createAuthToken: CreateAuthToken) {}

  async send(props: {
    userName: string;
    email: string;
    id: string;
  }): Promise<void> {
    const token = this.createAuthToken.generate();
    const verificationEmail = new VerificationURL({
      userName: new Name(props.userName),
      to: new Email(props.email),
      token,
    });
    await this.sendEmail.send(verificationEmail);
  }
}
