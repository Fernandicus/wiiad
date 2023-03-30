import { StartWatchingAdWSEvent } from "../StartWatchingAdWSEvent";
import { UniqId } from "@/src/common/domain/UniqId";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";

export class StartWatchingAdWSEventHandler {
  constructor(private startWatchingAd: StartWatchingAdWSEvent) {}

 async start(refereeId: string): Promise<void> {
    const referee = RefereeId.fromString(refereeId);
    await this.startWatchingAd.start(referee);
  }
}
