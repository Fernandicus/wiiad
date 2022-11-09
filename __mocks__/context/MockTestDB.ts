import { RoleType } from "@/src/domain/Role";
import { Ad, AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { Advertiser, AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import {
  Campaign,
  ICampaignPrimitives,
} from "@/src/modules/campaign/domain/Campaign";
import {
  CampaignStatus,
  CampaignStatusType,
} from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { IVerificationEmailTimerPrimitives, VerificationEmailTimer } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { IReferralPrimitives, Referral } from "@/src/modules/referrals/domain/Referral";
import { IUserPrimitives, User } from "@/src/modules/user/domain/User";
import { mockedAdRepo } from "./MockAdTestDB";
import { mockedAdvertiserRepo } from "./MockAdvertiserTestDB";
import { MockCampaignTestDB, mockedCampaignRepo } from "./MockCampaignTestDB";
import { mockedReferralRepo } from "./MockReferralTestDB";
import { mockedUserRepo } from "./MockUserTestDB";
import {
  mockedVerificationEmailRepo,
  MockVerificationEmailDB,
} from "./MockVerificationEmailDB";

interface IMockedDB {
  verificationEmailsDB: MockVerificationEmailDB;
}

interface ICampaignsByStatus {
  actives: ICampaignPrimitives[];
  finished: ICampaignPrimitives[];
  standBy: ICampaignPrimitives[];
}

interface IVerificationEmailsByStatus {
  expired: VerificationEmailTimer[];
  valids: VerificationEmailTimer[];
}

interface InitializedMongoTestDB {
  mocks: IMockedDB;
  campaigns: ICampaignsByStatus;
  advertisers: Advertiser[];
  ads: Ad[];
  users: User[];
  verificationEmails: IVerificationEmailsByStatus;
  referrals: Referral[];
}

export class MockTestDB {
  readonly mocks: IMockedDB;
  readonly campaigns: ICampaignsByStatus;
  readonly advertisers: Advertiser[];
  readonly ads: Ad[];
  readonly users: User[];
  readonly verificationEmails: IVerificationEmailsByStatus;

  constructor(params: InitializedMongoTestDB) {
    this.mocks = params.mocks;
    this.campaigns = params.campaigns;
    this.advertisers = params.advertisers;
    this.ads = params.ads;
    this.users = params.users;
    this.verificationEmails = params.verificationEmails;
  }

  static async setAndInitAll(): Promise<MockTestDB> {
    const totalAds = 9;

    const mockedAdDB = await mockedAdRepo(totalAds);
    const mockedAds = await mockedAdDB.getAllAds();

    const mockedAdvertisers = await mockedAdvertiserRepo();
    const advertisers = await mockedAdvertisers.getAllAdvertisers();

    const mockedCampaigns = await mockedCampaignRepo({
      activeAds: mockedAds!.slice(0, 3),
      finishedAds: mockedAds!.slice(3, 6),
      standByAds: mockedAds!.slice(6, 9),
    });
    const campaigns = await this.findCampaignsByStatus(mockedCampaigns);

    const mockedUsers = await mockedUserRepo(3);
    const users = await mockedUsers.getAll();

    const mockedVerificationEmails = await mockedVerificationEmailRepo(2, 4);
    const verificationEmails = await mockedVerificationEmails.getAll();

    const mockedReferrals = await mockedReferralRepo(
      users!.map((user) => user.id)
    );
    const referrals = await mockedReferrals.getAll();

    return new MockTestDB({
      mocks: {
        verificationEmailsDB: mockedVerificationEmails,
      },
      campaigns: {
        actives: campaigns.actives!.map(campaign => campaign.toPrimitives()),
        finished: campaigns.finished!.map(campaign => campaign.toPrimitives()),
        standBy: campaigns.standBy!.map(campaign => campaign.toPrimitives()),
      },
      advertisers: advertisers!,
      users: users!,
      ads: mockedAds!,
      verificationEmails: {
        expired: verificationEmails!.expired,
        valids: verificationEmails!.valid,
      },
      referrals: referrals!,
    });
  }

  private static async findCampaignsByStatus(
    mockedCampaigns: MockCampaignTestDB
  ): Promise<{
    actives: Campaign[] | null;
    finished: Campaign[] | null;
    standBy: Campaign[] | null;
  }> {
    const actives = await mockedCampaigns.findByStatus(
      new CampaignStatus(CampaignStatusType.ACTIVE)
    );
    const finished = await mockedCampaigns.findByStatus(
      new CampaignStatus(CampaignStatusType.FINISHED)
    );
    const standBy = await mockedCampaigns.findByStatus(
      new CampaignStatus(CampaignStatusType.STAND_BY)
    );
    return { actives, finished, standBy };
  }
}
