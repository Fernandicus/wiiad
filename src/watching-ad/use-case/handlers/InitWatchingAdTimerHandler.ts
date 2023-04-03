
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { InitWatchingAdTimer } from "../InitWatchingAdTimer";

export class InitWatchingAdTimerHandler {
  constructor(private startWatchingAd: InitWatchingAdTimer) {}

 async start(refereeId: string): Promise<void> {
    const referee = RefereeId.fromString(refereeId);
    await this.startWatchingAd.start(referee);
  }
}
