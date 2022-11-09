import { IVerificationEmailRepo } from "../domain/IVerificationEmailRepo";
import { VerificationEmailTimer } from "../domain/VerificationEmailTimer";

export class SaveEmailVerification {
  constructor(private repository: IVerificationEmailRepo) {}

  async save(verificationTimer: VerificationEmailTimer): Promise<void> {
    await this.repository.save(verificationTimer);
  }
}
