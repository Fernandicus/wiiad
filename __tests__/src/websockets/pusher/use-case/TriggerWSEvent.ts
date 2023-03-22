import { WatchAdTimerList } from "@/src/modules/websockets/pusher/domain/WatchAdTimeoutList";
//import { PusherWSS } from "@/src/modules/websockets/pusher/infrastructure/PusherWSS";
import { SendWSEvent } from "@/src/modules/websockets/pusher/domain/services/SendWSEvent";
import { projectConfig } from "@/src/utils/projectConfig";
import Pusher from "pusher";
import {
  TFinishWatchingAdEventData,
  TriggerWSEvent,
} from "@/src/modules/websockets/pusher/use-case/TriggerWSEvent";
import { InsertUserWatchingAd } from "@/src/modules/websockets/pusher/domain/services/InsertUserWatchingAd";
import { UniqId } from "@/src/utils/UniqId";
import { AdTimer } from "@/src/modules/websockets/pusher/domain/AdTimer";
import { IWebSocketService } from "@/src/modules/websockets/pusher/domain/interface/IWebSocketService";
import {
  TEventData,
  TPusherSendEvent,
} from "@/src/modules/websockets/pusher/domain/types/types";
import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";

describe("On TriggerWSEvent, GIVEN a TriggerEvent and an empty WatchAdTimerList", () => {
  let watchAdList: WatchAdTimerList;
  let triggerEvent: TriggerWSEvent;
  let webScoketService: IWebSocketService;

  beforeAll(() => {
    const { appId, cluster, key, secret } = projectConfig.PUSHER!;
    const wss = new Pusher({
      appId: appId!,
      key: key!,
      secret: secret!,
      cluster: cluster!,
    });

    webScoketService = {
      authenticateChannel: jest.fn(),
      authenticateUser: jest.fn(),
      closeConnection: jest.fn(),
      sendEventToUser: jest.fn(),
    };
    //new PusherWSS(wss);

    const sendEvent = new SendWSEvent(webScoketService);
    watchAdList = new WatchAdTimerList();
    const insertUserWatchingAd = new InsertUserWatchingAd(watchAdList);
    triggerEvent = new TriggerWSEvent(sendEvent, insertUserWatchingAd);
  });

  it.only(`WHEN call finishWatchingAd method, 
  THEN WatchAdTimerList should have a new WatchAdTimeout with the userId`, async () => {
    const userId = UniqId.new();
    const timer = new AdTimer(3);
    const eventData: TEventData<TFinishWatchingAdEventData> = {
      message: "Ad watched",
      data: {
        status: 200,
      },
    };

    triggerEvent.watchingAdTimer({
      userId,
      timer,
      eventData,
    });

    expect(watchAdList.isUserInTheList(userId)).toBeTruthy();
    expect(webScoketService.sendEventToUser).not.toBeCalled();

    const event: TPusherSendEvent<TFinishWatchingAdEventData> = {
      event: WebSocketEventName.event("finish-watching-ad"),
      userId,
      data: eventData,
    };

    const waitToTimeout = (resolve: Function) =>
      setTimeout(() => {
        resolve(true);
      }, timer.milliseconds);

    const d = () =>
      new Promise(waitToTimeout).then((_) =>
        expect(webScoketService.sendEventToUser).toBeCalledWith(event)
      );
    await d();
  });

  it(`WHEN call finishWatchingAd method more than one time, 
  THEN ONLY ONE instance of WatchAdTimeout should be in the WatchAdTimerList`, () => {
    const userId = UniqId.new();
    const timer = new AdTimer(2);
    const eventData: TEventData<TFinishWatchingAdEventData> = {
      message: "Ad watched",
      data: {
        status: 200,
      },
    };
    const listLength_Before = watchAdList.adsWatching.length;

    const repeat = Array(5).fill("");
    repeat.forEach((_) => {
      triggerEvent.watchingAdTimer({
        userId,
        timer,
        eventData,
      });
    });

    const listLength_After = watchAdList.adsWatching.length;
    const newElementsAdded = 1;

    expect(listLength_Before + newElementsAdded).toBe(listLength_After);
  });
});
