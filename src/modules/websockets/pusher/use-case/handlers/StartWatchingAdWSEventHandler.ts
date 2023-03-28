import { StartWatchingAdWSEvent } from "../StartWatchingAdWSEvent";
import { UniqId } from "@/src/common/domain/UniqId";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";

export class StartWatchingAdWSEventHandler {
  constructor(private startWatchingAd: StartWatchingAdWSEvent) {}

  start(refereeId: string): void {
    const referee = RefereeId.fromString(refereeId);
    this.startWatchingAd.start(referee);
  }
}
