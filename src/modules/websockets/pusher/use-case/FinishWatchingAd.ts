import { UniqId } from "@/src/utils/UniqId";
import { WatchAdTimerList } from "../domain/WatchAdTimeoutList";

export class FinishWatchingAd {
  constructor(private watchingAdList: WatchAdTimerList) {}

  async hasFinish(userId: UniqId): Promise<void> {
    this.watchingAdList.findAdByUserId(userId).match({
      some(adTimeout) {
        if (adTimeout.isEnded()) {
          console.log("Ad finished, adding To Referrals");
        } else {
          console.log("Ad has not ended");
        }
      },
      nothing() {
        throw new Error("User is not in the list");
      },
    });
  }
}
