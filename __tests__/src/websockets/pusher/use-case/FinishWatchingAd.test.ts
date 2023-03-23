import { ICampaignRepo } from "@/src/modules/campaign/domain/interfaces/ICampaignRepo";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { UpdateCampaignMetrics } from "@/src/modules/campaign/use-case/UpdateCampaignMetrics";
import { AdTimer } from "@/src/modules/websockets/pusher/domain/AdTimer";
import { WatchAdTimeout } from "@/src/modules/websockets/pusher/domain/WatchAdTimeout";
import { WatchAdTimerList } from "@/src/modules/websockets/pusher/domain/WatchAdTimeoutList";
import { FinishWatchingAd } from "@/src/modules/websockets/pusher/use-case/FinishWatchingAd";
import { StartWatchingAdWSEvent } from "@/src/modules/websockets/pusher/use-case/StartWatchingAdWSEvent";
import { UniqId } from "@/src/utils/UniqId";
import { mockedCampaignsRepo } from "../../../../../__mocks__/context/MockCampaignRepo";
import { FakeCampaign } from "../../../../../__mocks__/lib/modules/campaign/FakeCampaign";

describe("ON FinishWatchingAd, GIVEN an InsertUserWatchingAd", () => {
  let finishWatchingAd: FinishWatchingAd;
  let timer = new AdTimer(3);
  let startWatching: StartWatchingAdWSEvent;
  let userWatchingAd: UniqId;
  let mockedRepo: ICampaignRepo;

  beforeAll(() => {
    userWatchingAd = UniqId.new();
    const campaign = FakeCampaign.create({
      status: CampaignStatusType.ACTIVE,
      advertiserId: UniqId.new(),
    });

    mockedRepo = mockedCampaignsRepo([campaign]);
    const updateCampaignMetrics = new UpdateCampaignMetrics(mockedRepo);
    const watchingAds = new WatchAdTimerList();
    watchingAds.add(
      new WatchAdTimeout({
        userId: userWatchingAd,
        campaignId: campaign.id,
        timer,
        onTimeout() {},
      })
    );

    startWatching = new StartWatchingAdWSEvent(watchingAds);
    finishWatchingAd = new FinishWatchingAd(updateCampaignMetrics, watchingAds);
  });

  it(`WHEN call hasFinish method without starting the WatchAdTimeout.startTimer,
  THEN the Campaigns Repo addReferral method should not be called`, async () => {
    expect(finishWatchingAd.hasFinish(userWatchingAd)).rejects.toThrowError(
      Error
    );
    expect(mockedRepo.addReferral).not.toBeCalled();
  });

  it(`WHEN call hasFinish method and the user id watching ad do not exist  ,
  THEN an Error should be thrown`, async () => {
    expect(finishWatchingAd.hasFinish(UniqId.new())).rejects.toThrowError(
      Error
    );
  });

  it(`WHEN call StartWatchingAdWSEvent.startTimeout method,
    THEN WHEN hasFinish method is called WITHOUT waiting ad timer to end,
    the Campaigns Repo addReferral method SHOULD NOT be called `, async () => {
    startWatching.start(userWatchingAd);

    expect(finishWatchingAd.hasFinish(userWatchingAd)).rejects.toThrowError(
      Error
    );
    expect(mockedRepo.addReferral).not.toBeCalled();
  });

  it(`WHEN call StartWatchingAdWSEvent.startTimeout method,
    THEN WHEN hasFinish method is called waiting ad timer to end,
    the Campaigns Repo addReferral method SHOULD be called `, async () => {
    startWatching.start(userWatchingAd);

    const waitTimeout = (resolve: (value: boolean) => void) =>
      setTimeout(() => {
        resolve(true);
      }, timer.milliseconds);

    const promise = async (expected: () => void) => {
      return new Promise(waitTimeout).then(async (_) => {
        expected();
      });
    };

    await promise(async () => {
      await finishWatchingAd.hasFinish(userWatchingAd);
      expect(mockedRepo.addReferral).toBeCalled();
    });
  });
});
