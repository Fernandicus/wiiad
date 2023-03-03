import { IReferralPrimitives } from "@/src/modules/referrals/domain/Referral";
import { GetReferralData } from "../GetReferralData";

export class GetReferralDataHandler {
  constructor(private refData: GetReferralData) {}

  async get(): Promise<IReferralPrimitives> {
    const referralData = await this.refData.get();
    return referralData.toPrimitives();
  }
}
