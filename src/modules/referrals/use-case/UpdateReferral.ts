import { Balance } from "@/src/common/domain/Balance";
import { UniqId } from "@/src/common/domain/UniqId";
import { IReferralRepo } from "../domain/interfaces/IReferralRepo";
import { RefereeId } from "../domain/RefereeId";
import { Referral } from "../domain/Referral";
import { ReferralCounter } from "../domain/ReferralCounter";
import { ReferrerId } from "../domain/ReferrerId";

export class UpdateReferral {
  constructor(private referralRepo: IReferralRepo) {}

  async increaseReferrerBalance(
    referrerId: ReferrerId,
    addBalance: Balance
  ): Promise<void> {
    await this.referralRepo.increaseReferrerData({
      referrerId,
      balance: addBalance,
      counter: ReferralCounter.zero(),
    });
  }

  async increaseRefereeBalance(
    refereeId: RefereeId,
    addBalance: Balance
  ): Promise<void> {
    await this.referralRepo.increaseRefereeData({
      refereeId,
      balance: addBalance,
      counter: ReferralCounter.zero(),
    });
  }

  async increaseWatchedAds(refereeId: RefereeId): Promise<void> {
    await this.referralRepo.increaseRefereeData({
      refereeId: refereeId,
      counter: ReferralCounter.one(),
      balance: Balance.zero(),
    });
  }

  async increaseReferredUsers(referrerId: ReferrerId): Promise<void> {
    await this.referralRepo.increaseReferrerData({
      referrerId,
      balance: Balance.zero(),
      counter: ReferralCounter.one(),
    });
  }
}
