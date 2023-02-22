import { Ad } from "@/src/modules/ad/domain/Ad";
import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import {
  CampaignStatus,
  CampaignStatusType,
} from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { Referral } from "@/src/modules/referrals/domain/Referral";
import { User } from "@/src/modules/users/user/domain/User";
import { setTestAdDB, TestAdDB } from "./TestAdDB";
import { setTestCampaignDB, TestCampaignDB } from "./TestCampaignDB";
import { setTestReferralDB } from "./TestReferralDB";
import { setTestStripeDB, TestStripeDB } from "./TestStripeDB";
import { setTestUserDB, TestUserDB } from "./TestUserDB";

interface IDBs {
  users: TestUserDB;
  ads:TestAdDB;
  stripe: TestStripeDB;
  campaigns: TestCampaignDB;
}

interface ICampaignsByStatus {
  actives: Campaign[];
  finished: Campaign[];
  standBy: Campaign[];
}

interface InitializedMongoTestDB {
  dbs: IDBs;
  campaigns: ICampaignsByStatus;
  advertisers: User[];
  ads: Ad[];
  users: User[];
  referrals: Referral[];
  stripes: Stripe[];
}

export class TestDBs {
  readonly dbs: IDBs;
  readonly campaigns: ICampaignsByStatus;
  readonly advertisers: User[];
  readonly ads: Ad[];
  readonly users: User[];
  readonly stripes: Stripe[];

  constructor(params: InitializedMongoTestDB) {
    this.dbs = params.dbs;
    this.campaigns = params.campaigns;
    this.advertisers = params.advertisers;
    this.ads = params.ads;
    this.users = params.users;
    this.stripes = params.stripes;
  }

  static async setAndInitAll(): Promise<TestDBs> {
    const mockedUsers = await setTestUserDB({
      usersAmount: 3,
      advertisersAmount: 3,
    });
    const users = await mockedUsers.getAllUsers();
    const advertisers = await mockedUsers.getAllAdvertisers();

    const mockedAdDB = await setTestAdDB(advertisers!);
    const ads = await mockedAdDB.getAllAds();

    const mockedCampaigns = await setTestCampaignDB({
      activeCampaignAds: ads!.slice(0, 3),
      finishedCampaignAds: ads!.slice(3, 6),
      standByCampaignAds: ads!.slice(6, 9),
    });
    const campaigns = await this.findCampaignsByStatus(mockedCampaigns);

    const mockedReferrals = await setTestReferralDB(
      users!.map((user) => user.id)
    );
    const referrals = await mockedReferrals.getAll();

    const advertiserIds = advertisers!.map((advertiser) => advertiser.id);
    const mockedStripe = await setTestStripeDB([...advertiserIds]);
    const stripeModels = await mockedStripe.getAll();

    return new TestDBs({
      dbs: {
        users: mockedUsers,
        ads: mockedAdDB,
        stripe: mockedStripe,
        campaigns: mockedCampaigns,
      },
      campaigns: {
        actives: campaigns.actives!.map((campaign) => campaign),
        finished: campaigns.finished!.map((campaign) => campaign),
        standBy: campaigns.standBy!.map((campaign) => campaign),
      },
      advertisers: advertisers!,
      users: users!,
      ads: ads!,
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
