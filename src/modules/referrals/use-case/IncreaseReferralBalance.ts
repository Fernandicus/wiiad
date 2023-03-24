import { Balance } from "@/src/common/domain/Balance";
import { UniqId } from "@/src/utils/UniqId";
import { UpdateReferral } from "./UpdateReferral";

export class IncreaseReferralBalance {
  constructor(private updateReferral: UpdateReferral) {}

  async increase(params: {
    referrerId: UniqId;
    refereeId: UniqId;
    balance: Balance;
  }): Promise<void> {
    const { refereeId, referrerId, balance } = params;
    const increaseReferrer = () =>
      this.updateReferral.increaseReferrerBalance(referrerId, balance);
    const increaseReferee = () =>
      this.updateReferral.increaseRefereeBalance(refereeId, balance);

    await Promise.allSettled([increaseReferrer(), increaseReferee()]);
  }
}
