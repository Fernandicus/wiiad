import { VerificationEmailTimer } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { UniqId } from "@/src/utils/UniqId";

export interface TestVerificationEmailRepo {
  saveMany(verificationEmailProps: VerificationEmailTimer[]): Promise<void>;
  findById(id: UniqId): Promise<VerificationEmailTimer | null>;
  getAll(): Promise<VerificationEmailTimer[] | null>;
}
