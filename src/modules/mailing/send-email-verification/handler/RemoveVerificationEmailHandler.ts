import { VerificationTokenId } from "../domain/VerificationTokenId";
import { RemoveVerificationEmail } from "../use-case/RemoveVerificationEmail";

export class RemoveVerificationEmailHandler {
  constructor(private removeVerificationEmail: RemoveVerificationEmail) {}

  async remove(verificationEmailId: string): Promise<void> {
    const tokenId = new VerificationTokenId(verificationEmailId);
    await this.removeVerificationEmail.remove(tokenId);
  }
}
