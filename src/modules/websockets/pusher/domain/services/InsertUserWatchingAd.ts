import { UniqId } from "@/src/utils/UniqId";
import { AdTimer } from "../AdTimer";
import { WatchAdTimeout } from "../WatchAdTimeout";
import { WatchAdTimerList } from "../WatchAdTimeoutList";

type TAddUserWatchingAd = {
  userId: UniqId;
  onTimeout: () => void;
  timer: AdTimer;
};

export class InsertUserWatchingAd {
  constructor(private timeOutList: WatchAdTimerList) {}

  insert({ onTimeout, userId, timer }: TAddUserWatchingAd): void {
    this.timeOutList.add(
      new WatchAdTimeout({
        onTimeout,
        userId,
        timer,
      })
    );
  }
}
