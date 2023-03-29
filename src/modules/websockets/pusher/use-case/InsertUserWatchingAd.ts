import { WatchAdTimeoutProps, WatchAdTimeout } from "../domain/WatchAdTimeout";
import { WatchAdTimerList } from "../domain/WatchAdTimeoutList";
import { SendWSEvent } from "./SendWSEvent";

export type TInsertUserWatchingAd = Omit<WatchAdTimeoutProps, "onTimeout">;

export class InsertUserWatchingAd {
  constructor(
    private timeOutList: WatchAdTimerList,
    private sendEvent: SendWSEvent
  ) {}

  insert({
    refereeId,
    referrerId,
    timer,
    campaignId,
  }: TInsertUserWatchingAd): void {
    this.timeOutList.add(
      new WatchAdTimeout({
        refereeId,
        referrerId,
        campaignId,
        timer,
        onTimeout: async () => {
          await this.sendEvent.finishWatchingAd(refereeId);
        },
      })
    );
  }
}
