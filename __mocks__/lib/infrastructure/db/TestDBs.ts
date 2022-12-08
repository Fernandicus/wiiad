import { Ad } from "@/src/modules/ad/domain/Ad";
import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import {
  CampaignStatus,
  CampaignStatusType,
} from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { VerificationEmail } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmail";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { Referral } from "@/src/modules/referrals/domain/Referral";
import { User } from "@/src/modules/users/user/domain/User";
import { setTestAdDB } from "./TestAdDB";
import { setTestCampaignDB, TestCampaignDB } from "./TestCampaignDB";
import { setTestReferralDB } from "./TestReferralDB";
import { setTestStripeDB } from "./TestStripeDB";
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
  expired: VerificationEmail[];
  valids: VerificationEmail[];
}

interface InitializedMongoTestDB {
  mocks: IMockedDB;
  campaigns: ICampaignsByStatus;
  advertisers: User[];
  ads: Ad[];
  users: User[];
  verificationEmails: IVerificationEmailsByStatus;
  referrals: Referral[];
  stripes: Stripe[];
}

export class TestDBs {
  readonly mocks: IMockedDB;
  readonly campaigns: ICampaignsByStatus;
  readonly advertisers: User[];
  readonly ads: Ad[];
  readonly users: User[];
  readonly verificationEmails: IVerificationEmailsByStatus;
  readonly stripes: Stripe[];

  constructor(params: InitializedMongoTestDB) {
    this.mocks = params.mocks;
    this.campaigns = params.campaigns;
    this.advertisers = params.advertisers;
    this.ads = params.ads;
    this.users = params.users;
    this.verificationEmails = params.verificationEmails;
    this.stripes = params.stripes;
  }

  static async setAndInitAll(): Promise<TestDBs> {
    const totalAds = 9;

    const mockedAdDB = await setTestAdDB(totalAds);
    const mockedAds = await mockedAdDB.getAllAds();

    const mockedCampaigns = await setTestCampaignDB({
      activeCampaignAds: mockedAds!.slice(0, 3),
      finishedCampaignAds: mockedAds!.slice(3, 6),
      standByCampaignAds: mockedAds!.slice(6, 9),
    });
    const campaigns = await this.findCampaignsByStatus(mockedCampaigns);

    const mockedUsers = await setTestUserDB(3);
    const users = await mockedUsers.getAllUsers();
    const advertisers = await mockedUsers.getAllAdvertisers();

    const mockedVerificationEmails = await setTestVerificationEmailDB({
      valid: users!,
      expired: advertisers!,
    });
    const verificationEmails = await mockedVerificationEmails.getAll();

    const mockedReferrals = await setTestReferralDB(
      users!.map((user) => user.id)
    );
    const referrals = await mockedReferrals.getAll();

    const advertiserIds = advertisers!.map((advertiser) => advertiser.id);
    const mockedStripe = await setTestStripeDB([...advertiserIds]);
    const stripeModels = await mockedStripe.getAll();

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
      stripes: stripeModels!,
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
