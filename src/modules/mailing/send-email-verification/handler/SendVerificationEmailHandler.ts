import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { UniqId } from "@/src/utils/UniqId";
import { VerificationURL } from "../domain/VerificationURL";
import { SendlVerificationEmail } from "../use-case/SendVerificationEmail";

export class SendVerificationEmailHandler {
  constructor(private sendEmail: SendlVerificationEmail) {}

  async send(props: {
    userName: string;
    email: string;
    id: string;
  }): Promise<void> {
    const verificationEmail = new VerificationURL({
      userName: new Name(props.userName),
      to: new Email(props.email),
      token: new UniqId(props.id),
    });
    await this.sendEmail.send(verificationEmail);
  }
}
