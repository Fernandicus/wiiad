import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { VerificationEmail } from "../domain/VerificationEmail";
import { VerificationTokenId } from "../domain/VerificationTokenId";
import { SendEmailVerification } from "../use-case/SendVerificationEmail";

export class SendVerificationEmailHandler {
  constructor(private sendEmail: SendEmailVerification) {}

  async send(props: {
    userName: string;
    email: string;
    id: string;
  }): Promise<void> {
    const verificationEmail = new VerificationEmail({
      userName: new Name(props.userName),
      to: new Email(props.email),
      token: new VerificationTokenId(props.id),
    });
    await this.sendEmail.send(verificationEmail);
  }
}
