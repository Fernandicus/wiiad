import { WatchAdTimerList } from "@/src/modules/websockets/pusher/domain/WatchAdTimeoutList";
import { SendWSEvent } from "@/src/modules/websockets/pusher/domain/services/SendWSEvent";
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
import { mockedWSS } from "../../../../../__mocks__/context/MockedWSS";

describe("On TriggerWSEvent, GIVEN a TriggerEvent and an empty WatchAdTimerList", () => {
  let watchAdList: WatchAdTimerList;
  let triggerEvent: TriggerWSEvent;
  let webScoketService: IWebSocketService;

  beforeAll(() => {
    webScoketService = mockedWSS();
    const sendEvent = new SendWSEvent(webScoketService);
    watchAdList = new WatchAdTimerList();
    const insertUserWatchingAd = new InsertUserWatchingAd(watchAdList);
    triggerEvent = new TriggerWSEvent(sendEvent, insertUserWatchingAd);
  });

  it(`WHEN call finishWatchingAd method, 
  THEN WatchAdTimerList should have a new WatchAdTimeout with the userId,
  ONLY when the timer ends the sendEventToUser method should be called one time`, async () => {
    const userId = UniqId.new();
    const timer = new AdTimer(3);
    const eventData: TEventData<TFinishWatchingAdEventData> = {
      message: "Ad watched",
      data: {
        status: 200,
      },
    };

    const event: TPusherSendEvent<TFinishWatchingAdEventData> = {
      event: WebSocketEventName.event("finish-watching-ad"),
      userId,
      data: eventData,
    };

    triggerEvent.watchingAdTimer({
      userId,
      timer,
      eventData,
    });

    expect(watchAdList.isUserInTheList(userId)).toBeTruthy();
    expect(webScoketService.sendEventToUser).not.toBeCalled();

    const waitToTimeout = (resolve: Function) =>
      setTimeout(() => {
        resolve(true);
      }, timer.milliseconds);

    const d = () =>
      new Promise(waitToTimeout).then((_) => {
        expect(webScoketService.sendEventToUser).toBeCalledTimes(1);
        expect(webScoketService.sendEventToUser).toBeCalledWith(event);
      });

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
