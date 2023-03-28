import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { UniqId } from "@/src/common/domain/UniqId";
import { WatchAdTimerList } from "../domain/WatchAdTimeoutList";

export class StartWatchingAdWSEvent {
  constructor(private watchAdList: WatchAdTimerList) {}

  start(refereeId: RefereeId): void {
    this.watchAdList.findAdByRefereeId(refereeId).match({
      some(ad) {
        ad.startTimer();
      },
      nothing() {
        throw new Error("User not found in the watching ads list");
      },
    });
  }
}
