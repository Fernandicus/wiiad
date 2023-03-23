import { UniqId } from "@/src/utils/UniqId";
import { WatchAdTimerList } from "../domain/WatchAdTimeoutList";

export class StartWatchingAdWSEvent {
  constructor(private watchAdList: WatchAdTimerList) {}

  start(userId: UniqId): void {
    this.watchAdList.findAdByUserId(userId).match({
      some(ad) {
        ad.startTimer();
      },
      nothing() {
        throw new Error("User not found in the watching ads list");
      },
    });
  }
}
