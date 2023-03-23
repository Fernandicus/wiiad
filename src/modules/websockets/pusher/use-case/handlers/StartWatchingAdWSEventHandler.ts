import {
  TWatchingAdEventData,
  StartWatchingAdWSEvent,
} from "../StartWatchingAdWSEvent";
import { UniqId } from "@/src/utils/UniqId";
import { AdTimer } from "../../domain/AdTimer";
import { TEventData } from "../../domain/types/types";

type TWatchingAdEventDataTimer = {
  userId: string;
  campaignId: string;
  timer: number;
  eventData: TEventData<TWatchingAdEventData>;
};

export class StartWatchingAdWSEventHandler {
  constructor(private startWatchingAd: StartWatchingAdWSEvent) {}

  start(params: TWatchingAdEventDataTimer): void {
    const { campaignId, timer, eventData, userId } = params;

    this.startWatchingAd.start({
      campaignId: new UniqId(campaignId),
      userId: new UniqId(userId),
      timer: new AdTimer(timer),
      eventData,
    });
  }
}
