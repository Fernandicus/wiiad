import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { UniqId } from "@/src/utils/UniqId";
import { TestCampaignRepository } from "../../__mocks__/lib/modules/campaign/domain/TestCampaignRepository";
import { FakeAd } from "../../__mocks__/lib/modules/ads/FakeAd";
import { TestAdMongoDBRepository } from "../../__mocks__/lib/modules/ads/infraestructure/TestAdMongoDBRepository";
import { TestCampaignMongoDBRepo } from "../../__mocks__/lib/modules/campaign/infrastructure/TestCampaignMongoDBRepo";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { FakeCampaign } from "../../__mocks__/lib/modules/campaign/FakeCampaign";

export const mockedCampaignRepo = async (props: {
  activeAds: AdPropsPrimitives[];
  finishedAds: AdPropsPrimitives[];
  standByAds: AdPropsPrimitives[];
}): Promise<MockCampaignTestDB> => {
  const testCampaignRepo = await TestCampaignMongoDBRepo.init();
  return MockCampaignTestDB.setAndInit({
    ...props,
    campaignRepo: testCampaignRepo,
  });
};

export const autoMockedCampaigns = async ()=> await mockedCampaignRepo({
  activeAds: FakeAd.createManyWithPrimitives(UniqId.generate(), 2),
  finishedAds: FakeAd.createManyWithPrimitives(UniqId.generate(), 2),
  standByAds: FakeAd.createManyWithPrimitives(UniqId.generate(), 2),
});

export class MockCampaignTestDB {
  readonly campaignRepo;

  private constructor(campaignRepo: TestCampaignRepository) {
    this.campaignRepo = campaignRepo;
  }

  static async setAndInit(params: {
    campaignRepo: TestCampaignRepository;
    activeAds: AdPropsPrimitives[];
    finishedAds: AdPropsPrimitives[];
    standByAds: AdPropsPrimitives[];
  }): Promise<MockCampaignTestDB> {
    const activeCampaigns = this.setActiveCampaigns(params.activeAds);
    const finishedCampaigns = this.setFinishedCampaigns(params.finishedAds);
    const standByCampaigns = this.setStandByCampaigns(params.standByAds);
    await params.campaignRepo.saveMany([
      ...activeCampaigns,
      ...standByCampaigns,
      ...finishedCampaigns,
    ]);
    return new MockCampaignTestDB(params.campaignRepo);
  }

  async saveMany(campaignPrimitives: ICampaignPrimitives[]): Promise<void> {
    await this.campaignRepo.saveMany(campaignPrimitives);
  }

  async findByStatus(status: string): Promise<ICampaignPrimitives[] | null> {
    const campaigns = await this.campaignRepo.getByStatus(status);
    return campaigns;
  }

  private static setActiveCampaigns(
    ads: AdPropsPrimitives[]
  ): ICampaignPrimitives[] {
    return FakeCampaign.createManyFromGivenAds(ads, CampaignStatusType.ACTIVE);
  }

  private static setFinishedCampaigns(
    ads: AdPropsPrimitives[]
  ): ICampaignPrimitives[] {
    return FakeCampaign.createManyFromGivenAds(
      ads,
      CampaignStatusType.FINISHED
    );
  }

  private static setStandByCampaigns(
    ads: AdPropsPrimitives[]
  ): ICampaignPrimitives[] {
    return FakeCampaign.createManyFromGivenAds(
      ads,
      CampaignStatusType.STAND_BY
    );
  }
}
