import { UniqId } from "@/src/utils/UniqId";
import { SendWSEvent } from "../SendWSEvent";

export class SendWSEventHandler {
  constructor(private sendEvent: SendWSEvent) {}

  async finishWatchingAd(props: {
    userId: string;
    data: object;
  }): Promise<void> {
    await this.sendEvent.finishWatchingAd({
      userId: new UniqId(props.userId),
      data: props.data,
    });
  }
}
