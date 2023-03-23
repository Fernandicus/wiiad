import { TWatchingAd, TriggerWSEvent } from "../TriggerWSEvent";
import { UniqId } from "@/src/utils/UniqId";
import { AdTimer } from "../../domain/AdTimer";
import { TEventData } from "../../domain/types/types";

type TWatchingAdTimer = {
  timer: number;
  userId: string;
  eventData: TEventData<TWatchingAd>;
};

export class TriggerWSEventHandler {
  constructor(private triggerEvent: TriggerWSEvent) {}

  finishWatchingAd() {
    this.triggerEvent.finishWatchingAd();
  }

  watchingAdTimer(params: TWatchingAdTimer): void {
    const { timer, eventData, userId } = params;
  
    this.triggerEvent.watchingAdTimer({
      userId: new UniqId(userId),
      timer: new AdTimer(timer),
      eventData,
    });
  }
}
