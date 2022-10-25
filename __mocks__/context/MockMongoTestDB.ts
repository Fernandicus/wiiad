import { RolType } from "@/src/domain/Rol";
import { Ad, AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { IVerificationEmailRepo } from "@/src/modules/mailing/send-email-verification/domain/IVerificationEmailRepo";
import { IVerificationEmailTimerPrimitives, IVerificationEmailTimerProps } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { IUserPrimitives } from "@/src/modules/user/domain/User";
import { UniqId } from "@/src/utils/UniqId";
import { FakeAd } from "__mocks__/lib/ads/FakeAd";
import { TestAdMongoDBRepository } from "__mocks__/lib/ads/infraestructure/TestAdMongoDBRepository";
import { FakeAdvertiser } from "__mocks__/lib/advertiser/FakeAdvertiser";
import { TestAdvertiserMongoDBRepo } from "__mocks__/lib/advertiser/infrastructure/TestAdvertiserMongoDBRepo";
import { FakeCampaign } from "__mocks__/lib/campaign/FakeCampaign";
import { TestCampaignMongoDBRepo } from "__mocks__/lib/campaign/infrastructure/TestCampaignMongoDBRepo";
import { FakeVerificationEmailTimer } from "__mocks__/lib/mailing/send-email-verification/FakeVerificationEmailTimer";
import { TestVerificationEmailMongoDBRepo } from "__mocks__/lib/mailing/send-email-verification/infrastructure/TestVerificationEmailMongoDBRepo";
import { FakeUser } from "__mocks__/lib/user/FakeUser";
import { TestUserMongoDBRepo } from "__mocks__/lib/user/infrastructure/TestUserMongoDBRepo";

export class MockMongoTestDB {
  static async setAndInitAll(): Promise<void> {
    const adRepo = await TestAdMongoDBRepository.init();
    const advertiserRepo = await TestAdvertiserMongoDBRepo.init();
    const campaignRepo = await TestCampaignMongoDBRepo.init();
    const userRepo = await TestUserMongoDBRepo.init();
    const emailVerificationRepo = await TestVerificationEmailMongoDBRepo.init();

    const advertisers = this.setAdvertisers();
    const campaigns = this.setCampaigns({
      advertiserId: advertisers[0].id,
      amount: 5,
      status: CampaignStatusType.ACTIVE,
    });

    await adRepo.saveMany(this.setAds());
    await advertiserRepo.saveMany(advertisers);
    await campaignRepo.saveMany(campaigns);
    await userRepo.saveMany(this.setUsers());
    await emailVerificationRepo.saveMany(this.setEmailVerification())
  }

  private static setAds(): AdPropsPrimitives[] {
    return FakeAd.createManyWithPrimitives(UniqId.generate(), 5);
  }

  private static setAdvertisers(): AdvertiserPropsPrimitives[] {
    return FakeAdvertiser.createManyWithPrimitives();
  }

  private static setUsers(): IUserPrimitives[] {
    return FakeUser.createManyWithPrimitives(5);
  }

  private static setEmailVerification(): IVerificationEmailTimerPrimitives[] {
    return FakeVerificationEmailTimer.createManyWithPrimitives(5, RolType.BUSINESS);
  }

  private static setCampaigns(props: {
    amount: number;
    status: CampaignStatusType;
    advertiserId: string;
  }): ICampaignPrimitives[] {
    return FakeCampaign.createManyWithPrimitives(props);
  }
}
