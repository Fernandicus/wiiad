import { UniqId } from "@/src/utils/UniqId";
import { SendWSEvent } from "../SendWSEvent";

export class SendWSEventHandler {
  constructor(private sendEvent: SendWSEvent) {}

  async finishWatchingAd(userId: string): Promise<void> {
    await this.sendEvent.finishWatchingAd(new UniqId(userId));
  }
}
