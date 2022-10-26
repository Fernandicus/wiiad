import { RolType } from "@/src/domain/Rol";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { IVerificationEmailTimerPrimitives } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { IUserPrimitives } from "@/src/modules/user/domain/User";
import { UniqId } from "@/src/utils/UniqId";
import { FakeAd } from "../lib/modules/ads/FakeAd";
import { TestAdMongoDBRepository } from "../lib/modules/ads/infraestructure/TestAdMongoDBRepository";
import { FakeAdvertiser } from "../../__mocks__/lib/modules/advertiser/FakeAdvertiser";
import { TestAdvertiserMongoDBRepo } from "../../__mocks__/lib/modules/advertiser/infrastructure/TestAdvertiserMongoDBRepo";
import { FakeCampaign } from "../../__mocks__/lib/modules/campaign/FakeCampaign";
import { TestCampaignMongoDBRepo } from "../../__mocks__/lib/modules/campaign/infrastructure/TestCampaignMongoDBRepo";
import { FakeVerificationEmailTimer } from "../../__mocks__/lib/modules/send-email-verification/FakeVerificationEmailTimer";
import { TestVerificationEmailMongoDBRepo } from "../../__mocks__/lib/modules/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";
import { FakeUser } from "../../__mocks__/lib/modules/user/FakeUser";
import { TestUserMongoDBRepo } from "../../__mocks__/lib/modules/user/infrastructure/TestUserMongoDBRepo";

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

export class MockMongoTestDB {
  static async setAndInitAll(): Promise<InitializedMongoTestDB> {
    const adRepo = await TestAdMongoDBRepository.init();
    const advertiserRepo = await TestAdvertiserMongoDBRepo.init();
    const campaignRepo = await TestCampaignMongoDBRepo.init();
    const userRepo = await TestUserMongoDBRepo.init();
    const emailVerificationRepo = await TestVerificationEmailMongoDBRepo.init();

    const advertisers = this.setAdvertisers();
    const ads = this.setAds(9);
    const activeCampaigns = this.setCampaigns({
      ads: ads.slice(0, 3),
      status: CampaignStatusType.ACTIVE,
    });
    const finishedCampaigns = this.setCampaigns({
      ads: ads.slice(3, 6),
      status: CampaignStatusType.FINISHED,
    });
    const standByCampaigns = this.setCampaigns({
      ads: ads.slice(6, 9),
      status: CampaignStatusType.STAND_BY,
    });
    const users = this.setUsers();
    const verificationEmails = this.setEmailVerification();

    await adRepo.saveMany(ads);
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
      ads,
      users,
      verificationEmails,
    };
  }

  private static setAds(amount: number): AdPropsPrimitives[] {
    return FakeAd.createManyWithPrimitives(UniqId.generate(), amount);
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
