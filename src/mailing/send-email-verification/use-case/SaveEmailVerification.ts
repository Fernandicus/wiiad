import { IVerificationURLRepo } from "../domain/IVerificationURLRepo";
import { VerificationEmailTimer } from "../domain/VerificationEmailTimer";
import { IVerificationURLPropsPrimitives } from "../domain/VerificationURL";

export class SaveEmailVerification {
  constructor(private repository: IVerificationURLRepo) {}

  async save(verificationTimer: VerificationEmailTimer): Promise<void> {
    const verificationTimerPrimitives: IVerificationURLPropsPrimitives = {
      id: verificationTimer.id.id,
      email: verificationTimer.email.email,
      expirationDate: verificationTimer.expirationDate.date,
    };
    await this.repository.save(verificationTimerPrimitives);
  }
}
