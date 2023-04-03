import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";

export type TWatchingAdApiCallAction = {
  refereeId: RefereeId;
  referrerId: ReferrerId;
};

export interface IWatchingAdApiCall {
  startWatchingAd(data: TWatchingAdApiCallAction): Promise<void>;
  finishWatchingAd(data: TWatchingAdApiCallAction): Promise<void>;
}
