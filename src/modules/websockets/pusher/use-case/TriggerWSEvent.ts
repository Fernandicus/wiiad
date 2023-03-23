import { SendWSEvent } from "../domain/services/SendWSEvent";
import { UniqId } from "@/src/utils/UniqId";
import { AdTimer } from "../domain/AdTimer";
import { InsertUserWatchingAd } from "../domain/services/InsertUserWatchingAd";
import { TEventData } from "../domain/types/types";

export type TWatchingAd = { status: number };

type TFinishWatchingAd = {
  userId: UniqId;
  timer: AdTimer;
  eventData: TEventData<TWatchingAd>;
};

export class TriggerWSEvent {
  constructor(
    private sendEvent: SendWSEvent,
    private insertUserWatchingAd: InsertUserWatchingAd
  ) {}

  finishWatchingAd() {
    //Todo: add video/banner duration
    //Todo: send data when timer has concluded
    console.log("Finish watching ad");
  }

  watchingAdTimer(props: TFinishWatchingAd): void {
    const { eventData, timer, userId } = props;
    this.insertUserWatchingAd.insert({
      userId,
      timer,
      onTimeout: async () => {
        console.log("sending event...");
        await this.sendEvent.finishWatchingAd({
          userId,
          data: eventData,
        });
      },
    });
  }
}
