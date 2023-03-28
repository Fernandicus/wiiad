import { Balance } from "@/src/common/domain/Balance";
import { UniqId } from "@/src/common/domain/UniqId";
import { RefereeId } from "../domain/RefereeId";
import { ReferrerId } from "../domain/ReferrerId";
import { UpdateReferral } from "./UpdateReferral";

export class IncreaseReferralBalance {
  constructor(private updateReferral: UpdateReferral) {}

  async increase(params: {
    referrerId: ReferrerId;
    refereeId: RefereeId;
    balance: Balance;
  }): Promise<void> {
    const { refereeId, referrerId, balance } = params;

    await Promise.allSettled([
      this.updateReferral.increaseReferrerBalance(referrerId, balance),
      this.updateReferral.increaseRefereeBalance(refereeId, balance),
    ]);
  }
}
