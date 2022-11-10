import { VerificationEmail } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmail";
import { UniqId } from "@/src/utils/UniqId";

export interface TestVerificationEmailRepo {
  saveMany(verificationEmailProps: VerificationEmail[]): Promise<void>;
  findById(id: UniqId): Promise<VerificationEmail | null>;
  getAll(): Promise<VerificationEmail[] | null>;
}
