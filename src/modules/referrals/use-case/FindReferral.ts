import { Balance } from "@/src/domain/Balance";
import { UniqId } from "@/src/utils/UniqId";
import { IReferralRepo } from "../domain/IReferralRepo";
import { Referral } from "../domain/Referral";
import { ReferralCounter } from "../domain/ReferralCounter";

export class FindReferral {
  constructor(private referralRepo: IReferralRepo) {}

  async findByUserId(id: UniqId): Promise<Referral | null> {
    const referralFound = await this.referralRepo.findByUserID(id.id);
    if (!referralFound) return null;
    return new Referral({
      id: new UniqId(referralFound.id),
      userId: new UniqId(referralFound.userId),
      referees: new ReferralCounter(referralFound.referees),
      referrers: new ReferralCounter(referralFound.referrers),
      refereeBalance: new Balance(referralFound.refereeBalance),
      referrerBalance: new Balance(referralFound.referrerBalance),
    });
  }
}
