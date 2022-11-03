import { UniqId } from "@/src/utils/UniqId";
import { IReferralPrimitives, Referral } from "../domain/Referral";
import { FindReferral } from "../use-case/FindReferral";

export class FindReferralHandler {
  constructor(private findReferral: FindReferral) {}

  async byUserId(id: string): Promise<IReferralPrimitives | null> {
    const uniqId = new UniqId(id);
    const referralFound = await this.findReferral.findByUserId(uniqId);
    if (!referralFound) return null;
    return referralFound.toPrimitives();
  }
}
