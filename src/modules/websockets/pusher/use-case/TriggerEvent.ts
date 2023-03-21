import { UniqId } from "@/src/utils/UniqId";
import {
  insertUserWatchingAdHandler,
  sendWebSocketEventHandler,
} from "../infrastructure/pusher-container";

//Todo: add video/banner duration
//Todo: send data when timer has concluded

export class TriggerEvent {
  startWatchingAd() {
    console.log("Start watching ad");
  }

  finishWatchingAd(uniqId: UniqId): void {
    insertUserWatchingAdHandler.insert({
      userId: uniqId.id,
      seconds: 2,
      onTimeout: async () => {
        await sendWebSocketEventHandler.finishWatchingAd({
          userId: uniqId.id,
          data: {
            message: `Ad watched!: user id ${uniqId.id}`,
            status: 200,
          },
        });
      },
    });
  }
}
