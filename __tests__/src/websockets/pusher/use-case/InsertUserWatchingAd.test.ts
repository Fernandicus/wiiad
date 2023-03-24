import { User } from "@/src/modules/users/user/domain/User";
import { AdTimer } from "@/src/modules/ad/domain/value-objects/AdTimer";
import { WatchAdTimeout } from "@/src/modules/websockets/pusher/domain/WatchAdTimeout";
import { WatchAdTimerList } from "@/src/modules/websockets/pusher/domain/WatchAdTimeoutList";
import { InsertUserWatchingAd } from "@/src/modules/websockets/pusher/use-case/InsertUserWatchingAd";
import { SendWSEvent } from "@/src/modules/websockets/pusher/use-case/SendWSEvent";
import { UniqId } from "@/src/utils/UniqId";
import { mockedWSS } from "../../../../../__mocks__/context/MockedWSS";

describe("ON InsertUserWatchingAd, GIVEN an InsertUserWatchingAd", () => {
  let insertUser: InsertUserWatchingAd;
  let watchAdTimeoutList: WatchAdTimerList;

  beforeAll(() => {
    const mock = mockedWSS();
    watchAdTimeoutList = new WatchAdTimerList();
    const sendEvent = new SendWSEvent(mock);
    insertUser = new InsertUserWatchingAd(watchAdTimeoutList, sendEvent);
  });

  it(`WHEN call insert method,
  THEN a WatchAdTimeout with the userId should be saved in the adsWatching array`, () => {
    const userId = UniqId.new();
    const campaignId = UniqId.new();
    const timer = new AdTimer(3);
    insertUser.insert({ campaignId, userId, timer });

    expect(watchAdTimeoutList.isUserInTheList(userId)).toBeTruthy();
  });

});
