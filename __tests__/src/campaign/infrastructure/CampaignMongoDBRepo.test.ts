import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { CampaignMongoDBRepo } from "@/src/modules/campaign/infrastructure/CampaignMongoDBRepo";
import { CreateCampaign } from "@/src/modules/campaign/use-case/CreateCampaign";
import { TestCampaignMongoDBRepo } from "../../../../__mocks__/lib/campaign/infrastructure/TestCampaignMongoDBRepo";
import { FakeCampaign } from "../../../../__mocks__/lib/campaign/FakeCampaign";

describe("On CampaignMongoDBRepo.test, GIVEN a some campaigns in MongoDB", () => {
  let campaigns: ICampaignPrimitives[];
  let campaignRepo: CampaignMongoDBRepo;
  let newCampaign: ICampaignPrimitives;

  beforeAll(async () => {
    const repo = await TestCampaignMongoDBRepo.init();
    campaigns = FakeCampaign.createManyWithPrimitives();
    await repo.saveMany(campaigns);
    newCampaign = FakeCampaign.createWithPrimitives();
    campaignRepo = new CampaignMongoDBRepo();
  }, 8000);

  it(`WHEN call launch method, THEN the campaign should be saved in MongoDB`, async () => {
    await campaignRepo.launch(newCampaign);
    const campaignFound = await campaignRepo.findByAdvertiserId(newCampaign.advertiserId);

    expect(campaignFound?.id).toBe(newCampaign.id)
    expect(campaignFound?.adId).toBe(newCampaign.adId)
    expect(campaignFound?.advertiserId).toBe(newCampaign.advertiserId)
    expect(campaignFound?.status).toBe(newCampaign.status)
    expect(campaignFound?.promoters).toEqual(newCampaign.promoters)
    expect(campaignFound?.watchers).toEqual(newCampaign.watchers)
    expect(campaignFound?.budget).toEqual(newCampaign.budget)
    expect(campaignFound?.metrics).toEqual(newCampaign.metrics)
  }, 8000);
});
