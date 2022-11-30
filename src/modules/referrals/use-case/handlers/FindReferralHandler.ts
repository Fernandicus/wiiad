import { UniqId } from "@/src/utils/UniqId";
import { IReferralPrimitives } from "../../domain/Referral";
import { FindReferral } from "../FindReferral";

export class FindReferralHandler {
  constructor(private findReferral: FindReferral) {}

  async byUserId(id: string): Promise<IReferralPrimitives> {
    const uniqId = new UniqId(id);
    const referralFound = await this.findReferral.findByUserId(uniqId);
    return referralFound.toPrimitives();
  }
}
