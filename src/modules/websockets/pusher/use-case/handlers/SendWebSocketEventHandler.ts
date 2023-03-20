import { UniqId } from "@/src/utils/UniqId";
import { SendWebSocketEvent } from "../SendWebSocketEvent";

export class SendWebSocketEventHandler {
  constructor(private sendEvent: SendWebSocketEvent) {}

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
