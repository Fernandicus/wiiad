import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import { FakeCampaign } from "../../../../__mocks__/lib/modules/campaign/FakeCampaign";
import {
  CampaignStatus,
  CampaignStatusType,
} from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { UniqId } from "@/src/common/domain/UniqId";
import { autoSetTestCampaignDB } from "../../../../__mocks__/lib/infrastructure/db/TestCampaignDB";
import { CampaignMongoDBRepo } from "@/src/modules/campaign/infrastructure/db/CampaignMongoDBRepo";

describe("On CampaignMongoDBRepo.test, GIVEN a some campaigns in MongoDB", () => {
  let campaignRepo: CampaignMongoDBRepo;
  let newCampaign: Campaign;
  let activeCampaigns: Campaign[] | null;

  beforeAll(async () => {
    const testCampaignDB = await autoSetTestCampaignDB();
    activeCampaigns = await testCampaignDB.findByStatus(
      CampaignStatus.active()
    );
    newCampaign = FakeCampaign.create({
      advertiserId: UniqId.new(),
      status: CampaignStatusType.STAND_BY,
    });
    campaignRepo = new CampaignMongoDBRepo();
  }, 8000);

  it(`WHEN call save method, 
  THEN the launched campaign should be saved and foundedByAdvertiserId in MongoDB`, async () => {
    await campaignRepo.save(newCampaign);
    const campaignsFound = await campaignRepo.findAllByAdvertiserId(
      newCampaign.advertiserId
    );
    expect(campaignsFound).toContainEqual(newCampaign);
  }, 8000);

  it(`WHEN call findAllByStatus method, 
  THEN campaigns found length should be the same as saved`, async () => {
    const activeCampaignsFound = await campaignRepo.findAllByStatus(
      CampaignStatus.active()
    );
    expect(activeCampaignsFound!.length).toBe(activeCampaigns!.length);
  }, 8000);

  it(`WHEN call findAllByAdvertiserId method without an existing advertiser id, THEN an ErrorFindingCampaign should be thrown`, async () => {
    const campaignsFound = await campaignRepo.findAllByAdvertiserId(
      UniqId.new()
    );
    expect(campaignsFound).toBe(null);
  }, 8000);

  it(`WHEN call removeByAdId method without an existing advertiser id, THEN an ErrorFindingCampaign should be thrown`, async () => {
    
    const campaign = activeCampaigns![0];
    await campaignRepo.removeByAdId(
      campaign.adId
    );
    const campaignFound = await campaignRepo.byId(campaign.id);
    expect(campaignFound).toBe(null);
  }, 8000);
});
