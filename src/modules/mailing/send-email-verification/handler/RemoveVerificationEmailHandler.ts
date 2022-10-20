import { UniqId } from "@/src/utils/UniqId";
import { RemoveVerificationEmail } from "../use-case/RemoveVerificationEmail";

export class RemoveVerificationEmailHandler {
  constructor(private removeVerificationEmail: RemoveVerificationEmail) {}

  async remove(verificationEmailId: string): Promise<void> {
    const tokenId = new UniqId(verificationEmailId);
    await this.removeVerificationEmail.remove(tokenId);
  }
}
