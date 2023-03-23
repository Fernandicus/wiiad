import { WatchAdTimeoutProps, WatchAdTimeout } from "../domain/WatchAdTimeout";
import { WatchAdTimerList } from "../domain/WatchAdTimeoutList";
import { SendWSEvent } from "./SendWSEvent";

export type TInsertUserWatchingAd = Omit<WatchAdTimeoutProps, "onTimeout">;

export class InsertUserWatchingAd {
  constructor(
    private timeOutList: WatchAdTimerList,
    private sendEvent: SendWSEvent
  ) {}

  //todo: pass by params a WatchAdTimeout to have a better testability using the
  insert({ userId, timer, campaignId }: TInsertUserWatchingAd): void {
    this.timeOutList.add(
      new WatchAdTimeout({
        userId,
        campaignId,
        timer,
        onTimeout: async () => {
          await this.sendEvent.finishWatchingAd(userId);
        },
      })
    );
  }
}
