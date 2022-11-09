import {  Referral } from "@/src/modules/referrals/domain/Referral";

export interface TestReferralRepo {
  saveMany(users: Referral[]): Promise<void>;
  getAll(): Promise<Referral[] | null>;
}
