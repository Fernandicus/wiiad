import { RoleType } from "@/src/domain/Role";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { IVerificationEmailTimerPrimitives } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { IReferralPrimitives } from "@/src/modules/referrals/domain/Referral";
import { IUserPrimitives } from "@/src/modules/user/domain/User";
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
  expired: IVerificationEmailTimerPrimitives[];
  valids: IVerificationEmailTimerPrimitives[];
}

interface InitializedMongoTestDB {
  mocks: IMockedDB;
  campaigns: ICampaignsByStatus;
  advertisers: AdvertiserPropsPrimitives[];
  ads: AdPropsPrimitives[];
  users: IUserPrimitives[];
  verificationEmails: IVerificationEmailsByStatus;
  referrals: IReferralPrimitives[];
}

export class MockTestDB {
  readonly mocks: IMockedDB;
  readonly campaigns: ICampaignsByStatus;
  readonly advertisers: AdvertiserPropsPrimitives[];
  readonly ads: AdPropsPrimitives[];
  readonly users: IUserPrimitives[];
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
        actives: campaigns.actives!,
        finished: campaigns.finished!,
        standBy: campaigns.standBy!,
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
    actives: ICampaignPrimitives[] | null;
    finished: ICampaignPrimitives[] | null;
    standBy: ICampaignPrimitives[] | null;
  }> {
    const actives = await mockedCampaigns.findByStatus(
      CampaignStatusType.ACTIVE
    );
    const finished = await mockedCampaigns.findByStatus(
      CampaignStatusType.FINISHED
    );
    const standBy = await mockedCampaigns.findByStatus(
      CampaignStatusType.STAND_BY
    );
    return { actives, finished, standBy };
  }
}
