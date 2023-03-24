import { ICampaignRepo } from "@/src/modules/campaign/domain/interfaces/ICampaignRepo";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { FindCampaign } from "@/src/modules/campaign/use-case/FindCampaign";
import { UpdateCampaignData } from "@/src/modules/campaign/use-case/UpdateCampaignData";
import { IReferralRepo } from "@/src/modules/referrals/domain/interfaces/IReferralRepo";
import { IncreaseReferralBalance } from "@/src/modules/referrals/use-case/IncreaseReferralBalance";
import { UpdateReferral } from "@/src/modules/referrals/use-case/UpdateReferral";
import { AdTimer } from "@/src/modules/websockets/pusher/domain/AdTimer";
import { WatchAdTimeout } from "@/src/modules/websockets/pusher/domain/WatchAdTimeout";
import { WatchAdTimerList } from "@/src/modules/websockets/pusher/domain/WatchAdTimeoutList";
import { FinishWatchingAd } from "@/src/modules/websockets/pusher/use-case/FinishWatchingAd";
import { StartWatchingAdWSEvent } from "@/src/modules/websockets/pusher/use-case/StartWatchingAdWSEvent";
import { UniqId } from "@/src/utils/UniqId";
import { mockedReferralRepo } from "../../../../../__mocks__/context/MockedReferralRepo";
import { FakeReferral } from "../../../../../__mocks__/lib/modules/referral/FakeReferral";
import { mockedCampaignsRepo } from "../../../../../__mocks__/context/MockCampaignRepo";
import { FakeCampaign } from "../../../../../__mocks__/lib/modules/campaign/FakeCampaign";
import { AddReferralToCampaign } from "@/src/common/use-case/AddReferralToCampaign";
import { FindReferral } from "@/src/modules/referrals/use-case/FindReferral";

describe("ON FinishWatchingAd, GIVEN an InsertUserWatchingAd", () => {
  let finishWatchingAd: FinishWatchingAd;
  let timer = new AdTimer(3);
  let startWatching: StartWatchingAdWSEvent;
  let userWatchingAd: UniqId;
  let mockedCampaignsRep: ICampaignRepo;
  let mockedReferralsRep: IReferralRepo;

  beforeAll(() => {
    userWatchingAd = UniqId.new();
    const campaign = FakeCampaign.create({
      status: CampaignStatusType.ACTIVE,
      advertiserId: UniqId.new(),
    });
    const referrals = FakeReferral.create(userWatchingAd);

    mockedCampaignsRep = mockedCampaignsRepo([campaign]);
    mockedReferralsRep = mockedReferralRepo([referrals]);

    const updateCampaign = new UpdateCampaignData(mockedCampaignsRep);
    const findReferral = new FindReferral(mockedReferralsRep);
    const addReferralToCampaign = new AddReferralToCampaign({
      updateCampaign,
      findReferral,
    });
    const findCampaign = new FindCampaign(mockedCampaignsRep);
    const watchingAds = new WatchAdTimerList();
    const updateReferral = new UpdateReferral(mockedReferralsRep);
    const increaseBalance = new IncreaseReferralBalance(updateReferral);

    watchingAds.add(
      new WatchAdTimeout({
        userId: userWatchingAd,
        campaignId: campaign.id,
        timer,
        onTimeout() {},
      })
    );

    startWatching = new StartWatchingAdWSEvent(watchingAds);
    finishWatchingAd = new FinishWatchingAd({
      watchingAdList: watchingAds,
      addReferralToCampaign,
      findCampaign,
      increaseBalance,
    });
  });

  it(`WHEN call validateAndAirdrop method without starting the WatchAdTimeout.startTimer,
  THEN the Campaigns Repo validateAndAirdrop method should not be called`, async () => {
    expect(
      finishWatchingAd.validateAndAirdrop({
        refereeId: userWatchingAd,
        referrerId: UniqId.new(),
      })
    ).rejects.toThrowError(Error);
    expect(mockedCampaignsRep.addReferral).not.toBeCalled();
    expect(mockedCampaignsRep.byId).not.toBeCalled();
    expect(mockedReferralsRep.increaseRefereeData).not.toBeCalled();
    expect(mockedReferralsRep.increaseReferrerData).not.toBeCalled();
  });

  it(`WHEN call validateAndAirdrop method and the user id watching ad do not exist  ,
  THEN an Error should be thrown`, async () => {
    expect(
      finishWatchingAd.validateAndAirdrop({
        refereeId: userWatchingAd,
        referrerId: UniqId.new(),
      })
    ).rejects.toThrowError(Error);
  });

  it(`WHEN call StartWatchingAdWSEvent.startTimeout method,
    THEN WHEN validateAndAirdrop method is called WITHOUT waiting ad timer to end,
    the Campaigns Repo validateAndAirdrop method SHOULD NOT be called `, async () => {
    startWatching.start(userWatchingAd);

    expect(
      finishWatchingAd.validateAndAirdrop({
        refereeId: userWatchingAd,
        referrerId: UniqId.new(),
      })
    ).rejects.toThrowError(Error);
    expect(mockedCampaignsRep.addReferral).not.toBeCalled();
    expect(mockedCampaignsRep.byId).not.toBeCalled();
    expect(mockedReferralsRep.increaseRefereeData).not.toBeCalled();
    expect(mockedReferralsRep.increaseReferrerData).not.toBeCalled();
  });

  it(`WHEN call StartWatchingAdWSEvent.startTimeout method,
    THEN WHEN validateAndAirdrop method is called waiting ad timer to end,
    the Campaigns Repo validateAndAirdrop method SHOULD be called `, async () => {
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
      await finishWatchingAd.validateAndAirdrop({
        refereeId: userWatchingAd,
        referrerId: UniqId.new(),
      });
      expect(mockedCampaignsRep.addReferral).toBeCalled();
      expect(mockedCampaignsRep.byId).toBeCalled();
      expect(mockedReferralsRep.increaseRefereeData).toBeCalled();
      expect(mockedReferralsRep.increaseReferrerData).toBeCalled();
    });
  });
});
