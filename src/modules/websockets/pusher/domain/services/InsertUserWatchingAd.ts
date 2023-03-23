import { UniqId } from "@/src/utils/UniqId";
import { AdTimer } from "../AdTimer";
import { WatchAdTimeoutProps, WatchAdTimeout } from "../WatchAdTimeout";
import { WatchAdTimerList } from "../WatchAdTimeoutList";

export class InsertUserWatchingAd {
  constructor(private timeOutList: WatchAdTimerList) {}

  insert({ onTimeout, userId, timer, campaignId }: WatchAdTimeoutProps): void {
    this.timeOutList.add(
      new WatchAdTimeout({
        userId,
        campaignId,
        timer,
        onTimeout,
      })
    );
  }
}
