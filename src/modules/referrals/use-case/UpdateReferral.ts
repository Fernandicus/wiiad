import { Balance } from "@/src/domain/Balance";
import { UniqId } from "@/src/utils/UniqId";
import { IReferralRepo } from "../domain/IReferralRepo";
import { Referral } from "../domain/Referral";
import { ReferralCounter } from "../domain/ReferralCounter";

export class UpdateReferral {
  constructor(private referralRepo: IReferralRepo) {}

  async increaseReferrerBalance(
    userId: UniqId,
    addBalance: Balance
  ): Promise<void> {
    await this.referralRepo.increaseReferrerData({
      userId: userId.id,
      balance: addBalance.total,
      counter: 1,
    });
  }

  async increaseRefereeBalance(
    userId: UniqId,
    addBalance: Balance
  ): Promise<void> {
    await this.referralRepo.increaseRefereeData({
      userId: userId.id,
      balance: addBalance.total,
      counter: 1,
    });
  }
}
