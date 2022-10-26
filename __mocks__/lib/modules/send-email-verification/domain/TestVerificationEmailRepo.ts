import { IVerificationEmailTimerPrimitives } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";

export interface TestVerificationEmailRepo {
  saveMany(
    verificationEmailProps: IVerificationEmailTimerPrimitives[]
  ): Promise<void>;
  findById(id: string): Promise<IVerificationEmailTimerPrimitives | null>;
  getAll(): Promise<IVerificationEmailTimerPrimitives[] | null> 
}
