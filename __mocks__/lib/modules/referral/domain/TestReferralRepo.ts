import { IReferralPrimitives } from "@/src/modules/referrals/domain/Referral";

export interface TestReferralRepo {
  saveMany(users: IReferralPrimitives[]): Promise<void>;
  getAll(): Promise<IReferralPrimitives[] | null>;
}
