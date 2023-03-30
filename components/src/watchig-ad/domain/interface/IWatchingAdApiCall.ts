import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";

export interface IWatchingAdApiCall {
  startWatchingAd(data: {
    refereeId: RefereeId;
    referrerId: ReferrerId;
  }): Promise<void>;

  finishWatchingAd(data: {
    refereeId: RefereeId;
    referrerId: ReferrerId;
  }): Promise<void>;
}
