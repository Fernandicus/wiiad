import { IVerificationTokenRepo } from "../domain/IVerificationTokenRepo";
import { VerificationTokenModelProps } from "../infrastructure/VerificationTokenModel";
import { EmailVerificationToken } from "../domain/EmailVerificationToken";

export class SaveEmailVerificationToken {
  constructor(private repository: IVerificationTokenRepo) {}

  async save(emailVerificationToken: EmailVerificationToken): Promise<void> {
    const emailVerificationTokenPrimitives: VerificationTokenModelProps = {
      _id: emailVerificationToken.id.id,
      email: emailVerificationToken.email.email,
      expirationDate: emailVerificationToken.expirationDate.date,
    };
    await this.repository.save(emailVerificationTokenPrimitives);
  }
}
