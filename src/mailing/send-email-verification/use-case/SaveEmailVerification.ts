import { IVerificationEmailRepo } from "../domain/IVerificationEmailRepo";
import { EmailVerification } from "../domain/EmailVerification";
import { VerificationEmailPropsPrimitives } from "../domain/VerificationEmail";

export class SaveEmailVerification {
  constructor(private repository: IVerificationEmailRepo) {}

  async save(emailVerificationToken: EmailVerification): Promise<void> {
    const emailVerificationTokenPrimitives: VerificationEmailPropsPrimitives = {
      id: emailVerificationToken.id.id,
      email: emailVerificationToken.email.email,
      expirationDate: emailVerificationToken.expirationDate.date,
    };
    await this.repository.save(emailVerificationTokenPrimitives);
  }
}
