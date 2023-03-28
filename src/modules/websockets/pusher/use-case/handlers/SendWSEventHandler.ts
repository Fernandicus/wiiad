import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { UniqId } from "@/src/common/domain/UniqId";
import { SendWSEvent } from "../SendWSEvent";

export class SendWSEventHandler {
  constructor(private sendEvent: SendWSEvent) {}

  async finishWatchingAd(userId: string): Promise<void> {
    await this.sendEvent.finishWatchingAd(RefereeId.fromString(userId));
  }
}
