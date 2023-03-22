import { TFinishWatchingAdEventData, TriggerWSEvent } from "../TriggerWSEvent";
import { UniqId } from "@/src/utils/UniqId";
import { AdTimer } from "../../domain/AdTimer";
import { TEventData } from "../../domain/types/types";

export class TriggerWSEventHandler {
  constructor(private triggerEvent: TriggerWSEvent) {}

  finishWatchingAd() {
    this.triggerEvent.finishWatchingAd();
  }

  watchingAdTimer(
    userId: string,
    eventData: TEventData<TFinishWatchingAdEventData>
  ): void {
    this.triggerEvent.watchingAdTimer({
      userId: new UniqId(userId),
      timer: new AdTimer(2),
      eventData,
    });
  }
}
