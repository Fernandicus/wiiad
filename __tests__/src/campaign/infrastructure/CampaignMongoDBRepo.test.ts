import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { CampaignMongoDBRepo } from "@/src/modules/campaign/infrastructure/CampaignMongoDBRepo";
import { CreateCampaign } from "@/src/modules/campaign/use-case/CreateCampaign";
import { TestCampaignMongoDBRepo } from "../../../../__mocks__/lib/campaign/infrastructure/TestCampaignMongoDBRepo";
import { FakeCampaign } from "../../../../__mocks__/lib/campaign/FakeCampaign";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { UniqId } from "@/src/utils/UniqId";

describe("On CampaignMongoDBRepo.test, GIVEN a some campaigns in MongoDB", () => {
  let campaigns: ICampaignPrimitives[];
  let campaignsStatus: CampaignStatusType;
  let advertiserId: string;
  let campaignRepo: CampaignMongoDBRepo;
  let newCampaign: ICampaignPrimitives;

  beforeAll(async () => {
    const repo = await TestCampaignMongoDBRepo.init();
    advertiserId = UniqId.generate();
    campaignsStatus = CampaignStatusType.ACTIVE;
    campaigns = FakeCampaign.createManyWithPrimitives({
      amount: 5,
      status: campaignsStatus,
      advertiserId,
    });
    await repo.saveMany(campaigns);
    newCampaign = FakeCampaign.createWithPrimitives({
      advertiserId,
      status: CampaignStatusType.STAND_BY,
    });
    campaignRepo = new CampaignMongoDBRepo();
  }, 8000);

  it(`WHEN call launch method with a valid advertiser id, 
  THEN the launched campaign should be saved in MongoDB`, async () => {
    await campaignRepo.launch(newCampaign);
    const campaignsFound = await campaignRepo.findAllByAdvertiserId(
      newCampaign.advertiserId
    );

    const newCampaignSaved = campaignsFound?.find(
      (campaign) => campaign.id == newCampaign.id
    );

    expect(campaignsFound?.length).toBe(campaigns.length + 1);
    expect(newCampaignSaved!).toEqual(newCampaign);
  }, 8000);

  it(`WHEN call findAllByStatus method, 
  THEN campaigns found length should be the same as saved`, async () => {
    const campaignsFound = await campaignRepo.findByStatus(campaignsStatus);
    
    expect(campaignsFound?.length).toBe(campaigns.length);
    campaignsFound?.forEach((campaign) => {
      expect(campaign.status).toBe(campaignsStatus);
    });
  }, 8000);

  it(`WHEN call launch method without an existing advertiser id, THEN campaigns found should be null`, async () => {
    const campaignsFound = await campaignRepo.findAllByAdvertiserId("123");
    expect(campaignsFound).toEqual([]);
  }, 8000);
});
