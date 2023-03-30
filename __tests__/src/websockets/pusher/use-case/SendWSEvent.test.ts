import { IWebSocketService } from "@/src/watching-ad/pusher/domain/interface/IWebSocketService";
import { WebSocketEventName } from "@/src/watching-ad/domain/WebSocketEventName";
import { SendWSEvent } from "@/src/watching-ad/pusher/use-case/SendWSEvent";
import { UniqId } from "@/src/common/domain/UniqId";
import { mockedWSS } from "../../../../../__mocks__/context/MockedWSS";
import { TPusherSendEvent, TWatchingAdEventData } from "@/src/watching-ad/pusher/domain/types/types";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";

describe("On SendWSEvent, GIVEN a StartWatchingAdEvent and an empty WatchAdDurationList", () => {
  let mock: IWebSocketService;
  let sendEvent: SendWSEvent;

  beforeAll(() => {
    mock = mockedWSS();
    sendEvent = new SendWSEvent(mock);
  });

  it(`WHEN call the finishWatchingAd method, 
  THEN the sendEventToUser method should be called`, async () => {
    const refereeId =  RefereeId.new();
    const event: TPusherSendEvent<TWatchingAdEventData> = {
      userId: refereeId.uniqId,
      event: WebSocketEventName.event("finish-watching-ad"),
      data: {
        message: "Ad watched",
        data: {
          status: 200,
        },
      },
    };

    sendEvent.finishWatchingAd(refereeId);

    expect(mock.sendEventToUser).toBeCalledWith(event);
  });
});
