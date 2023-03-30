import { StartWatchingAd } from "../StartWatchingAd";
import { UniqId } from "@/src/common/domain/UniqId";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";

export class StartWatchingAdHandler {
  constructor(private startWatchingAd: StartWatchingAd) {}

 async start(refereeId: string): Promise<void> {
    const referee = RefereeId.fromString(refereeId);
    await this.startWatchingAd.start(referee);
  }
}
