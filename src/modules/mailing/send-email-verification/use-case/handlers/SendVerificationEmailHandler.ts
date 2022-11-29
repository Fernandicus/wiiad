import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { AuthToken } from "../../domain/value-objects/AuthToken";
import { VerificationURL } from "../../domain/VerificationURL";
import { SendlVerificationEmail } from "../SendVerificationEmail";

interface ISendVerificationParams {
  userName: string;
  email: string;
  authToken: string;
}

//TODO: PASAR EL sendSignUp a la logica y coger la query "log" (sign-up / login)

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
    return new VerificationURL({
      userName: new Name(props.userName),
      to: new Email(props.email),
      authToken: new AuthToken(props.authToken),
    });
  }
}
