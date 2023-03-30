import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { IWatchingAdApiCall } from "../domain/interface/IWatchingAdApiCall";

export class SendWatchingAdAction {
  constructor(private watchingAdApiCall: IWatchingAdApiCall) {}

  async startWatchingAd(props: {
    refereeId: RefereeId;
    referrerId: ReferrerId;
  }): Promise<void> {
    await this.watchingAdApiCall.startWatchingAd(props);
  }

  async finishWatchingAd(props: {
    refereeId: RefereeId;
    referrerId: ReferrerId;
  }): Promise<void> {
    await this.watchingAdApiCall.finishWatchingAd(props);
  }
}
