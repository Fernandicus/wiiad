import { Ad } from "@/src/modules/ad/domain/Ad";
import { Advertiser } from "@/src/modules/advertiser/domain/Advertiser";
import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import {
  CampaignStatus,
  CampaignStatusType,
} from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { VerificationEmailTimer } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { Referral } from "@/src/modules/referrals/domain/Referral";
import { User } from "@/src/modules/user/domain/User";
import { setTestAdDB } from "./TestAdDB";
import { setTestAdvertiserDB } from "./TestAdvertiserDB";
import { setTestCampaignDB, TestCampaignDB } from "./TestCampaignDB";
import { setTestReferralDB } from "./TestReferralDB";
import { setTestUserDB } from "./TestUserDB";
import {
  setTestVerificationEmailDB,
  TestVerificationEmailDB,
} from "./TestVerificationEmailDB";

interface IMockedDB {
  verificationEmailsDB: TestVerificationEmailDB;
}

interface ICampaignsByStatus {
  actives: Campaign[];
  finished: Campaign[];
  standBy: Campaign[];
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

export class TestDBs {
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

  static async setAndInitAll(): Promise<TestDBs> {
    const totalAds = 9;

    const mockedAdDB = await setTestAdDB(totalAds);
    const mockedAds = await mockedAdDB.getAllAds();

    const mockedAdvertisers = await setTestAdvertiserDB();
    const advertisers = await mockedAdvertisers.getAllAdvertisers();

    const mockedCampaigns = await setTestCampaignDB({
      activeCampaignAds: mockedAds!.slice(0, 3),
      finishedCampaignAds: mockedAds!.slice(3, 6),
      standByCampaignAds: mockedAds!.slice(6, 9),
    });
    const campaigns = await this.findCampaignsByStatus(mockedCampaigns);

    const mockedUsers = await setTestUserDB(3);
    const users = await mockedUsers.getAll();

    const mockedVerificationEmails = await setTestVerificationEmailDB(2, 4);
    const verificationEmails = await mockedVerificationEmails.getAll();

    const mockedReferrals = await setTestReferralDB(
      users!.map((user) => user.id)
    );
    const referrals = await mockedReferrals.getAll();

    return new TestDBs({
      mocks: {
        verificationEmailsDB: mockedVerificationEmails,
      },
      campaigns: {
        actives: campaigns.actives!.map((campaign) => campaign),
        finished: campaigns.finished!.map((campaign) => campaign),
        standBy: campaigns.standBy!.map((campaign) => campaign),
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
    testCampaignDB: TestCampaignDB
  ): Promise<{
    actives: Campaign[] | null;
    finished: Campaign[] | null;
    standBy: Campaign[] | null;
  }> {
    const actives = await testCampaignDB.findByStatus(
      new CampaignStatus(CampaignStatusType.ACTIVE)
    );
    const finished = await testCampaignDB.findByStatus(
      new CampaignStatus(CampaignStatusType.FINISHED)
    );
    const standBy = await testCampaignDB.findByStatus(
      new CampaignStatus(CampaignStatusType.STAND_BY)
    );
    return { actives, finished, standBy };
  }
}
