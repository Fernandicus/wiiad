import { UniqId } from "@/src/utils/UniqId";
import { RemoveVerificationEmail } from "../use-case/RemoveVerificationEmail";

export class RemoveVerificationEmailHandler {
  constructor(private removeVerificationEmail: RemoveVerificationEmail) {}

  async removeById(verificationEmailId: string): Promise<void> {
    const id = new UniqId(verificationEmailId);
    await this.removeVerificationEmail.removeById(id);
  }
}
