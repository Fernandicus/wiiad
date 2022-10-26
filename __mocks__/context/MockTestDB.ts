import { RolType } from "@/src/domain/Rol";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { IVerificationEmailTimerPrimitives } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { IUserPrimitives } from "@/src/modules/user/domain/User";
import { FakeAdvertiser } from "../lib/modules/advertiser/FakeAdvertiser";
import { FakeCampaign } from "../lib/modules/campaign/FakeCampaign";
import { TestCampaignMongoDBRepo } from "../lib/modules/campaign/infrastructure/TestCampaignMongoDBRepo";
import { FakeVerificationEmailTimer } from "../lib/modules/send-email-verification/FakeVerificationEmailTimer";
import { TestVerificationEmailMongoDBRepo } from "../lib/modules/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";
import { FakeUser } from "../lib/modules/user/FakeUser";
import { TestUserMongoDBRepo } from "../lib/modules/user/infrastructure/TestUserMongoDBRepo";
import { mockedAdRepo } from "./MockAdTestDB";
import { mockedAdvertiserRepo } from "./MockAdvertiserTestDB";

interface InitializedMongoTestDB {
  campaigns: {
    actives: ICampaignPrimitives[];
    finished: ICampaignPrimitives[];
    standBy: ICampaignPrimitives[];
  };
  advertisers: AdvertiserPropsPrimitives[];
  ads: AdPropsPrimitives[];
  users: IUserPrimitives[];
  verificationEmails: {
    expired: IVerificationEmailTimerPrimitives[];
    valids: IVerificationEmailTimerPrimitives[];
  };
}

export class MockTestDB {
  static async setAndInitAll(): Promise<InitializedMongoTestDB> {
    const mockedAdDB = await mockedAdRepo();
    const mockedAds = await mockedAdDB.getAllAds();
    
    const advertiserRepo = await mockedAdvertiserRepo();
    const campaignRepo = await TestCampaignMongoDBRepo.init();
    const userRepo = await TestUserMongoDBRepo.init();
    const emailVerificationRepo = await TestVerificationEmailMongoDBRepo.init();

    const advertisers = this.setAdvertisers();
    const activeCampaigns = this.setCampaigns({
      ads: mockedAds!.slice(0, 3),
      status: CampaignStatusType.ACTIVE,
    });
    const finishedCampaigns = this.setCampaigns({
      ads: mockedAds!.slice(3, 6),
      status: CampaignStatusType.FINISHED,
    });
    const standByCampaigns = this.setCampaigns({
      ads: mockedAds!.slice(6, 9),
      status: CampaignStatusType.STAND_BY,
    });
    const users = this.setUsers();
    const verificationEmails = this.setEmailVerification();

    await advertiserRepo.saveMany(advertisers);
    await campaignRepo.saveMany([
      ...activeCampaigns,
      ...standByCampaigns,
      ...finishedCampaigns,
    ]);
    await userRepo.saveMany(users);
    await emailVerificationRepo.saveMany([
      ...verificationEmails.expired,
      ...verificationEmails.valids,
    ]);

    return {
      campaigns: {
        actives: activeCampaigns,
        finished: finishedCampaigns,
        standBy: standByCampaigns,
      },
      advertisers,
      ads: mockedAds!,
      users,
      verificationEmails,
    };
  }

  private static setAdvertisers(): AdvertiserPropsPrimitives[] {
    return FakeAdvertiser.createManyWithPrimitives();
  }

  private static setUsers(): IUserPrimitives[] {
    return FakeUser.createManyWithPrimitives(5);
  }

  private static setEmailVerification(): {
    expired: IVerificationEmailTimerPrimitives[];
    valids: IVerificationEmailTimerPrimitives[];
  } {
    const expiredEmails = FakeVerificationEmailTimer.createManyWithPrimitives(
      5,
      RolType.BUSINESS,
      true
    );
    const validEmails = FakeVerificationEmailTimer.createManyWithPrimitives(
      5,
      RolType.BUSINESS,
      false
    );
    return {
      expired: expiredEmails,
      valids: validEmails,
    };
  }

  private static setCampaigns(props: {
    ads: AdPropsPrimitives[];
    status: CampaignStatusType;
  }): ICampaignPrimitives[] {
    return FakeCampaign.createManyFromGivenAds(props.ads, props.status);
  }
}
