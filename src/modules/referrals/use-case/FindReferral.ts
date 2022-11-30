import { Balance } from "@/src/common/domain/Balance";
import { UniqId } from "@/src/utils/UniqId";
import { ErrorFindingReferral } from "../domain/errors/ErrorFindingReferral";
import { IReferralRepo } from "../domain/interfaces/IReferralRepo";
import { Referral } from "../domain/Referral";
import { ReferralCounter } from "../domain/ReferralCounter";

export class FindReferral {
  constructor(private referralRepo: IReferralRepo) {}

  async findByUserId(id: UniqId): Promise<Referral> {
    const referralFound = await this.referralRepo.findByUserID(id);
    if (!referralFound) throw ErrorFindingReferral.byUserId(id.id);
    return referralFound;
  }
}
