import { IVerificationEmailRepo } from "../domain/interfaces/IVerificationEmailRepo";
import { VerificationEmail } from "../domain/VerificationEmail";

export class SaveVerificationEmail {
  constructor(private repository: IVerificationEmailRepo) {}

  async save(verificationTimer: VerificationEmail): Promise<void> {
    await this.repository.save(verificationTimer);
  }
}
