import { WatchAdDurationList } from "@/src/modules/websockets/pusher/domain/WatchAdTimeoutList";
import { InitWatchingAdTimer } from "@/src/watching-ad/pusher/use-case/InitWatchingAdTimer";
import { UniqId } from "@/src/common/domain/UniqId";
import { AdDuration } from "@/src/modules/ad/domain/value-objects/AdDuration";
import { WatchAdTimeout } from "@/src/modules/websockets/pusher/domain/WatchAdTimeout";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";

describe("On InitWatchingAdTimer, GIVEN a WatchAdDurationList with a WatchAdTimeout", () => {
  let watchAdList: WatchAdDurationList;
  let watchAdTimeout: WatchAdTimeout;
  const timer = new AdDuration(2);
  let startWatchingAdWS: InitWatchingAdTimer;
  let counter = 0;

  beforeAll(() => {
    watchAdList = new WatchAdDurationList();
    watchAdTimeout = new WatchAdTimeout({
      refereeId:  RefereeId.new(),
      referrerId:  ReferrerId.new(),
      campaignId: UniqId.new(),
      timer,
      onTimeout() {
        counter += 1;
      },
    });
    watchAdList.add(watchAdTimeout);
    startWatchingAdWS = new InitWatchingAdTimer(watchAdList);
  });

  it(`WHEN call start method more than one time, 
  THEN the WatchAdTimeout.onTimeout method should be called once`, async () => {
    const repeat = Array(5).fill("");
    repeat.forEach((_) => {
      startWatchingAdWS.start(watchAdTimeout.refereeId);
    });

    const waitToTimeout = (resolve: Function) =>
      setTimeout(() => {
        resolve(true);
      }, timer.milliseconds);

    const promise = (expect: () => void) =>
      new Promise(waitToTimeout).then((_) => {
        expect();
      });

    await promise(() => expect(counter).toBe(1));

    repeat.forEach((_) => {
      startWatchingAdWS.start(watchAdTimeout.refereeId);
    });

    await promise(() => expect(counter).toBe(1));
  });
});
