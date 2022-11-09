import { Balance } from "@/src/domain/Balance";
import { UniqId } from "@/src/utils/UniqId";
import { ErrorFindingReferral } from "../domain/ErrorFindingReferral";
import { IReferralRepo } from "../domain/IReferralRepo";
import { Referral } from "../domain/Referral";
import { ReferralCounter } from "../domain/ReferralCounter";

export class FindReferral {
  constructor(private referralRepo: IReferralRepo) {}

  async findByUserId(id: UniqId): Promise<Referral> {
    const referralFound = await this.referralRepo.findByUserID(id);
    if (!referralFound) throw new ErrorFindingReferral("Referral id not found");
    return referralFound;
  }
}
