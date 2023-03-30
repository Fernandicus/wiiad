import { User } from "@/src/modules/users/user/domain/User";
import { AdDuration } from "@/src/modules/ad/domain/value-objects/AdDuration";
import { WatchAdTimeout } from "@/src/modules/websockets/pusher/domain/WatchAdTimeout";
import { WatchAdDurationList } from "@/src/modules/websockets/pusher/domain/WatchAdTimeoutList";
import { InsertUserWatchingAd } from "@/src/watching-ad/pusher/use-case/InsertUserWatchingAd";
import { SendWSEvent } from "@/src/watching-ad/pusher/use-case/SendWSEvent";
import { UniqId } from "@/src/common/domain/UniqId";
import { mockedWSS } from "../../../../../__mocks__/context/MockedWSS";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";

describe("ON InsertUserWatchingAd, GIVEN an InsertUserWatchingAd", () => {
  let insertUser: InsertUserWatchingAd;
  let watchAdTimeoutList: WatchAdDurationList;

  beforeAll(() => {
    const mock = mockedWSS();
    watchAdTimeoutList = new WatchAdDurationList();
    const sendEvent = new SendWSEvent(mock);
    insertUser = new InsertUserWatchingAd(watchAdTimeoutList, sendEvent);
  });

  it(`WHEN call insert method,
  THEN a WatchAdTimeout with the refereeId should be saved in the adsWatching array`, () => {
    const refereeId =  RefereeId.new();
    const referrerId =  ReferrerId.new();
    const campaignId = UniqId.new();
    const timer = new AdDuration(3);
    insertUser.insert({ campaignId, referrerId, refereeId, timer });

    expect(watchAdTimeoutList.isUserInTheList(refereeId)).toBeTruthy();
  });

});
