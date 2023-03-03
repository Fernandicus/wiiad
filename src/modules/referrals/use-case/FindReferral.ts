import { Balance } from "@/src/common/domain/Balance";
import { Maybe } from "@/src/common/domain/Maybe";
import { UniqId } from "@/src/utils/UniqId";
import { ErrorFindingReferral } from "../domain/errors/ErrorFindingReferral";
import { IReferralRepo } from "../domain/interfaces/IReferralRepo";
import { Referral } from "../domain/Referral";
import { ReferralCounter } from "../domain/ReferralCounter";

export class FindReferral {
  constructor(private referralRepo: IReferralRepo) {}

  async findByUserId(id: UniqId): Promise<Maybe<Referral>> {
    return await this.referralRepo.findByUserID(id);
  }
}
