import { Ad } from "@/src/modules/ad/domain/Ad";
import { UniqId } from "@/src/utils/UniqId";
import { TestCampaignRepository } from "../../modules/campaign/domain/TestCampaignRepository";
import { FakeAd } from "../../modules/ads/FakeAd";
import { TestCampaignMongoDBRepo } from "../../modules/campaign/infrastructure/TestCampaignMongoDBRepo";
import {
  CampaignStatus,
  CampaignStatusType,
} from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import { FakeCampaign } from "../../modules/campaign/FakeCampaign";

interface ICampaignSorted {
  activeCampaignAds: Ad[];
  finishedCampaignAds: Ad[];
  standByCampaignAds: Ad[];
}

export const setTestCampaignDB = async (
  campaigns: ICampaignSorted
): Promise<TestCampaignDB> => {
  const testCampaignRepo = await TestCampaignMongoDBRepo.init();
  return TestCampaignDB.setAndInit({
    ...campaigns,
    campaignRepo: testCampaignRepo,
  });
};

export const autoSetTestCampaignDB = async () => {
  const testCampaignRepo = await TestCampaignMongoDBRepo.init();
  return TestCampaignDB.autoSetAndInit(testCampaignRepo);
};

export class TestCampaignDB {
  private constructor(private campaignRepo: TestCampaignRepository) {}

  static async setAndInit(params: {
    campaignRepo: TestCampaignRepository;
    activeCampaignAds: Ad[];
    finishedCampaignAds: Ad[];
    standByCampaignAds: Ad[];
  }): Promise<TestCampaignDB> {
    const activeCampaigns = this.setActiveCampaigns(params.activeCampaignAds);
    const finishedCampaigns = this.setFinishedCampaigns(
      params.finishedCampaignAds
    );
    const standByCampaigns = this.setStandByCampaigns(
      params.standByCampaignAds
    );
    await params.campaignRepo.saveMany([
      ...activeCampaigns,
      ...standByCampaigns,
      ...finishedCampaigns,
    ]);
    return new TestCampaignDB(params.campaignRepo);
  }

  static async autoSetAndInit(
    campaignRepo: TestCampaignRepository
  ): Promise<TestCampaignDB> {
    const campaigns = this.autoSet();
    await campaignRepo.saveMany(campaigns);
    return new TestCampaignDB(campaignRepo);
  }

  async saveMany(campaignPrimitives: Campaign[]): Promise<void> {
    await this.campaignRepo.saveMany(campaignPrimitives);
  }

  async findByStatus(status: CampaignStatus): Promise<Campaign[] | null> {
    const campaigns = await this.campaignRepo.getByStatus(status);
    return campaigns;
  }

  async findByAdId(id: UniqId): Promise<Campaign | null> {
    const campaigns = await this.campaignRepo.findByAdId(id);
    return campaigns;
  }

  async findById(id: UniqId): Promise<Campaign | null> {
    return await this.campaignRepo.findById(id);
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

  private static autoSet(): Campaign[] {
    const activeCampaignAds = FakeAd.createMany(UniqId.new(), 2);
    const finishedCampaignAds = FakeAd.createMany(UniqId.new(), 2);
    const standByCampaignAds = FakeAd.createMany(UniqId.new(), 2);
    const activeCampaigns = this.setActiveCampaigns(activeCampaignAds);
    const finishedCampaigns = this.setFinishedCampaigns(finishedCampaignAds);
    const standByCampaigns = this.setStandByCampaigns(standByCampaignAds);
    return [...activeCampaigns, ...finishedCampaigns, ...standByCampaigns];
  }
}
