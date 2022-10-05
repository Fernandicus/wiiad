import { Email } from "@/src/domain/Email";
import { EmailVerification } from "../domain/EmailVerification";
import { ExpirationDate } from "../domain/ExpirationDate";
import { VerificationTokenId } from "../domain/VerificationTokenId";
import { SaveEmailVerification } from "../use-case/SaveEmailVerification";

export class EmailVerificationTokenHandler {
  constructor(private saveEmailVerficationToken: SaveEmailVerification) {}

  async saveWithExpirationIn5min(props: {
    id: string;
    email: string;
  }): Promise<void> {
    const emailVerificationToken = new EmailVerification({
      id: new VerificationTokenId(props.id),
      expirationDate: ExpirationDate.inFiveMinutes(),
      email: new Email(props.email),
    });
    this.saveEmailVerficationToken.save(emailVerificationToken);
  }
}
