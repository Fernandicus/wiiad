import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import { ICampaignRepo } from "@/src/modules/campaign/domain/ICampaignRepo";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { CreateCampaign } from "@/src/modules/campaign/use-case/CreateCampaign";
import { UniqId } from "@/src/utils/UniqId";
import { mockedCampaignsRepo } from "../../../../__mocks__/context/MockCampaignRepo";
import { FakeCampaign } from "../../../../__mocks__/lib/modules/campaign/FakeCampaign";

describe("On CreateCampaign, GIVEN a Campaign and a Campaign Repo ", () => {
  let mockedRepo: ICampaignRepo;
  let createCampaign: CreateCampaign;
  let campaign: Campaign;

  beforeAll(() => {
    const campaigns = FakeCampaign.createMany({
      advertiserId: UniqId.new(),
      status: CampaignStatusType.ACTIVE,
      amount: 3,
    });
    campaign = campaigns[0];
    mockedRepo = mockedCampaignsRepo(campaigns);
    createCampaign = new CreateCampaign(mockedRepo);
  });

  it(`WHEN call the launch method, 
  THEN the repo save method should be called with the campaign object`, async () => {
    await createCampaign.launch(campaign);
    expect(mockedRepo.save).toBeCalledWith(campaign);
  });
});
