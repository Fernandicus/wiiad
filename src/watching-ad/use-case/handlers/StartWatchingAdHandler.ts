import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { StartWatchingAd } from "../StartWatchingAd";

export class StartWatchingAdHandler {
  constructor(private startWatchingAd: StartWatchingAd) {}

  async start(props:{refereeValue:string, referrerValue:string}){
    const refereeId = RefereeId.fromString(props.refereeValue);
    const referrerId = ReferrerId.fromString(props.referrerValue);

    await this.startWatchingAd.start({
        refereeId,
        referrerId,
    })
  }
}
