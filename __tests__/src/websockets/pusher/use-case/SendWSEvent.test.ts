import { IWebSocketService } from "@/src/modules/websockets/pusher/domain/interface/IWebSocketService";
import { WebSocketEventName } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { SendWSEvent } from "@/src/modules/websockets/pusher/use-case/SendWSEvent";
import { UniqId } from "@/src/utils/UniqId";
import { mockedWSS } from "../../../../../__mocks__/context/MockedWSS";

describe("On SendWSEvent, GIVEN a StartWatchingAdEvent and an empty WatchAdTimerList", () => {
  let mock: IWebSocketService;
  let sendEvent: SendWSEvent;

  beforeAll(() => {
    mock = mockedWSS();
    sendEvent = new SendWSEvent(mock);
  });

  it(`WHEN call the finishWatchingAd method, 
  THEN the sendEventToUser method should be called`, async () => {
    const userId = UniqId.new();
    const event = {
      userId,
      event: WebSocketEventName.event("finish-watching-ad"),
      data: {
        message: "Ad watched",
        data: {
          status: 200,
        },
      },
    };

    sendEvent.finishWatchingAd(userId);

    expect(mock.sendEventToUser).toBeCalledWith(event);
  });
});
