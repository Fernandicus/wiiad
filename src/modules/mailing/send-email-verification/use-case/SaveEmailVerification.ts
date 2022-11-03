import { IVerificationEmailRepo } from "../domain/IVerificationEmailRepo";
import { IVerificationEmailTimerPrimitives, VerificationEmailTimer } from "../domain/VerificationEmailTimer";

export class SaveEmailVerification {
  constructor(private repository: IVerificationEmailRepo) {}

  async save(verificationTimer: VerificationEmailTimer): Promise<void> {
    const verificationTimerPrimitives: IVerificationEmailTimerPrimitives = {
      id: verificationTimer.id.id,
      email: verificationTimer.email.email,
      expirationDate: verificationTimer.expirationDate.date,
      role: verificationTimer.role.role,
    };
    await this.repository.save(verificationTimerPrimitives);
  }
}
