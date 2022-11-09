import { Ad, AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { UniqId } from "@/src/utils/UniqId";
import { TestCampaignRepository } from "../../__mocks__/lib/modules/campaign/domain/TestCampaignRepository";
import { FakeAd } from "../../__mocks__/lib/modules/ads/FakeAd";
import { TestCampaignMongoDBRepo } from "../../__mocks__/lib/modules/campaign/infrastructure/TestCampaignMongoDBRepo";
import { CampaignStatus, CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import {
  Campaign,
  ICampaignPrimitives,
} from "@/src/modules/campaign/domain/Campaign";
import { FakeCampaign } from "../../__mocks__/lib/modules/campaign/FakeCampaign";

interface IMockedCampaignRepo {
  activeAds: Ad[];
  finishedAds: Ad[];
  standByAds: Ad[];
}

export const mockedCampaignRepo = async (
  props: IMockedCampaignRepo
): Promise<MockCampaignTestDB> => {
  const testCampaignRepo = await TestCampaignMongoDBRepo.init();
  return MockCampaignTestDB.setAndInit({
    ...props,
    campaignRepo: testCampaignRepo,
  });
};

export const autoMockedCampaigns = async () =>
  await mockedCampaignRepo({
    activeAds: FakeAd.createMany(UniqId.new(), 2),
    finishedAds: FakeAd.createMany(UniqId.new(), 2),
    standByAds: FakeAd.createMany(UniqId.new(), 2),
  });

export class MockCampaignTestDB {
  private readonly campaignRepo;

  private constructor(campaignRepo: TestCampaignRepository) {
    this.campaignRepo = campaignRepo;
  }

  static async setAndInit(params: {
    campaignRepo: TestCampaignRepository;
    activeAds: Ad[];
    finishedAds: Ad[];
    standByAds: Ad[];
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

  async saveMany(campaignPrimitives: Campaign[]): Promise<void> {
    await this.campaignRepo.saveMany(campaignPrimitives);
  }

  async findByStatus(status: CampaignStatus): Promise<Campaign[] | null> {
    const campaigns = await this.campaignRepo.getByStatus(status);
    return campaigns;
  }

  private static setActiveCampaigns(ads: Ad[]): Campaign[] {
    return FakeCampaign.createManyFromGivenAds(ads, CampaignStatusType.ACTIVE);
  }

  private static setFinishedCampaigns(ads: Ad[]): Campaign[] {
    return FakeCampaign.createManyFromGivenAds(
      ads,
      CampaignStatusType.FINISHED
    );
  }

  private static setStandByCampaigns(ads: Ad[]): Campaign[] {
    return FakeCampaign.createManyFromGivenAds(
      ads,
      CampaignStatusType.STAND_BY
    );
  }
}
