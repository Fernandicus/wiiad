import { UniqId } from "@/src/utils/UniqId";
import { AdTimer } from "../domain/AdTimer";
import { WatchAdTimeout } from "../domain/WatchAdTimeout";
import { WatchAdTimerList } from "../domain/WatchAdTimeoutList";

type TAddUserWatchingAd = {
  userId: UniqId;
  onTimeout: () => void;
  timer: AdTimer;
};

export class InsertUserWatchingAd {
  constructor(private timeOutList: WatchAdTimerList) {}

  insert({ onTimeout, userId, timer }: TAddUserWatchingAd): void {
    if (this.timeOutList.isUserInTheList(userId)) {
      this.timeOutList.removeTimer(userId); //[timeOutIndex].clearTimeOut();
    }

    this.timeOutList.add(
      new WatchAdTimeout({
        onTimeout,
        userId,
        timer,
      })
    );
  }
}
