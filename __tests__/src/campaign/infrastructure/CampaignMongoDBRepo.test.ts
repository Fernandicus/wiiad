import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import { CampaignMongoDBRepo } from "@/src/modules/campaign/infrastructure/CampaignMongoDBRepo";
import { FakeCampaign } from "../../../../__mocks__/lib/modules/campaign/FakeCampaign";
import { CampaignStatus, CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { UniqId } from "@/src/utils/UniqId";
import { autoSetTestCampaignDB } from "../../../../__mocks__/context/db/TestCampaignDB";

describe("On CampaignMongoDBRepo.test, GIVEN a some campaigns in MongoDB", () => {
  let campaignRepo: CampaignMongoDBRepo;
  let newCampaign: Campaign;
  let activeCampaigns: Campaign[] | null;

  beforeAll(async () => {
    const mock = await autoSetTestCampaignDB();
    activeCampaigns = await mock.findByStatus(CampaignStatus.active());
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
    const newCampaignSaved = campaignsFound?.find(
      (campaign) => campaign.id.id == newCampaign.id.id
    );
    expect(newCampaignSaved!).toEqual(newCampaign);
  }, 8000);

  it(`WHEN call findAllByStatus method, 
  THEN campaigns found length should be the same as saved`, async () => {
    const activeCampaignsFound = await campaignRepo.findAllByStatus(CampaignStatus.active());
    expect(activeCampaignsFound!.length).toBe(activeCampaigns!.length);
  }, 8000);


  it(`WHEN call findAllByAdvertiserId method without an existing advertiser id, THEN an ErrorFindingCampaign should be thrown`, async () => {
    const campaignsFound = await campaignRepo.findAllByAdvertiserId(UniqId.new());
    expect(campaignsFound).toBe(null);
  }, 8000);

});
