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
      userId,
      balance: addBalance,
      counter: ReferralCounter.one(),
    });
  }

  async increaseRefereeBalance(
    userId: UniqId,
    addBalance: Balance
  ): Promise<void> {
    await this.referralRepo.increaseRefereeData({
      userId,
      balance: addBalance,
      counter: ReferralCounter.one(),
    });
  }

  async increaseWatchedAds(refereeId: UniqId): Promise<void> {
    await this.referralRepo.increaseReferrerData({
      userId: refereeId,
      counter:  ReferralCounter.one(),
      balance: Balance.empty()
    });
  }
}
