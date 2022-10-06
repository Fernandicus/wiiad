import { IVerificationEmailRepo } from "../domain/IVerificationEmailRepo";
import { VerificationEmailTimer } from "../domain/VerificationEmailTimer";
import { IVerificationEmailPropsPrimitives } from "../domain/VerificationURL";

export class SaveEmailVerification {
  constructor(private repository: IVerificationEmailRepo) {}

  async save(verificationTimer: VerificationEmailTimer): Promise<void> {
    const verificationTimerPrimitives: IVerificationEmailPropsPrimitives = {
      id: verificationTimer.id.id,
      email: verificationTimer.email.email,
      expirationDate: verificationTimer.expirationDate.date,
    };
    await this.repository.save(verificationTimerPrimitives);
  }
}
