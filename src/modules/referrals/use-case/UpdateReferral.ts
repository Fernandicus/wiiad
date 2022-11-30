import { Balance } from "@/src/common/domain/Balance";
import { UniqId } from "@/src/utils/UniqId";
import { IReferralRepo } from "../domain/interfaces/IReferralRepo";
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
      counter: ReferralCounter.zero(),
    });
  }

  async increaseRefereeBalance(
    userId: UniqId,
    addBalance: Balance
  ): Promise<void> {
    await this.referralRepo.increaseRefereeData({
      userId,
      balance: addBalance,
      counter: ReferralCounter.zero(),
    });
  }

  async increaseWatchedAds(refereeId: UniqId): Promise<void> {
    await this.referralRepo.increaseRefereeData({
      userId: refereeId,
      counter: ReferralCounter.one(),
      balance: Balance.zero(),
    });
  }

  async increaseReferredUsers(userId: UniqId): Promise<void> {
    await this.referralRepo.increaseReferrerData({
      userId,
      balance: Balance.zero(),
      counter: ReferralCounter.one(),
    });
  }
}
