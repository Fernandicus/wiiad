import { StartWatchingAdWSEvent } from "../StartWatchingAdWSEvent";
import { UniqId } from "@/src/utils/UniqId";

export class StartWatchingAdWSEventHandler {
  constructor(private startWatchingAd: StartWatchingAdWSEvent) {}

  start(userId: string): void {
    this.startWatchingAd.start(new UniqId(userId));
  }
}
