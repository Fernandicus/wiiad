import { SendWSEvent } from "../domain/services/SendWSEvent";
import { UniqId } from "@/src/utils/UniqId";
import { AdTimer } from "../domain/AdTimer";
import { InsertUserWatchingAd } from "../domain/services/InsertUserWatchingAd";
import { TEventData } from "../domain/types/types";
import { WatchAdTimeoutProps, WatchAdTimeout } from "../domain/WatchAdTimeout";

export type TWatchingAdEventData = { status: number };

type TStartWatchingAdWSEvent = Omit<WatchAdTimeoutProps, "onTimeout"> & {
  eventData: TEventData<TWatchingAdEventData>;
};

export class StartWatchingAdWSEvent {
  constructor(
    private sendEvent: SendWSEvent,
    private insertUserWatchingAd: InsertUserWatchingAd
  ) {}

  start(props: TStartWatchingAdWSEvent): void {
    const { campaignId, eventData, timer, userId } = props;
    this.insertUserWatchingAd.insert({
      campaignId,
      userId,
      timer,
      onTimeout: async () => {
        await this.sendEvent.finishWatchingAd({
          userId,
          data: eventData,
        });
      },
    });
  }
}
