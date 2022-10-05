import { Email } from "@/src/domain/Email";
import { EmailVerificationToken } from "../domain/EmailVerificationToken";
import { ExpirationDate } from "../domain/ExpirationDate";
import { VerificationTokenId } from "../domain/VerificationTokenId";
import { SaveEmailVerificationToken } from "../use-case/SaveEmailVerificationToken";

export class EmailVerificationTokenHandler {
  constructor(private saveEmailVerficationToken: SaveEmailVerificationToken) {}

  async saveWithExpirationIn5min(props: {
    id: string;
    email: string;
  }): Promise<void> {
    const emailVerificationToken = new EmailVerificationToken({
      id: new VerificationTokenId(props.id),
      expirationDate: ExpirationDate.inFiveMinutes(),
      email: new Email(props.email),
    });
    this.saveEmailVerficationToken.save(emailVerificationToken);
  }
}
