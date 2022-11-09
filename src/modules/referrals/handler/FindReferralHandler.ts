import { UniqId } from "@/src/utils/UniqId";
import { IReferralPrimitives, Referral } from "../domain/Referral";
import { FindReferral } from "../use-case/FindReferral";

export class FindReferralHandler {
  constructor(private findReferral: FindReferral) {}

  async byUserId(id: string): Promise<IReferralPrimitives> {
    const uniqId = new UniqId(id);
    const referralFound = await this.findReferral.findByUserId(uniqId);
    return referralFound.toPrimitives();
  }
}
