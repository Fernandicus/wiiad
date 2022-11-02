import {
  Campaign,
  ICampaignPrimitives,
} from "@/src/modules/campaign/domain/Campaign";
import { ICampaignRepo } from "@/src/modules/campaign/domain/ICampaignRepo";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { CreateCampaign } from "@/src/modules/campaign/use-case/CreateCampaign";
import { UniqId } from "@/src/utils/UniqId";
import { FakeCampaign } from "../../../../__mocks__/lib/modules/campaign/FakeCampaign";

describe("On CreateCampaign, GIVEN a Campaign and a Campaign Repo ", () => {
  let campaignRepo: ICampaignRepo;
  let createCampaign: CreateCampaign;
  let campaign: Campaign;

  beforeAll(() => {
    campaignRepo = {
      save: jest.fn(),
      findAllByAdvertiserId: jest.fn(),
      findByStatus: jest.fn(),
      addReferral: jest.fn(),
      addWatcher: jest.fn(),
      byId: jest.fn(),
      increaseClicks:jest.fn(),
      increaseViews:jest.fn(),
    };
    createCampaign = new CreateCampaign(campaignRepo);
    campaign = FakeCampaign.create({advertiserId: UniqId.new(), status: CampaignStatusType.ACTIVE});
  });

  it(`WHEN call the launch method, 
  THEN the repo should be called with the campaign primitives`, async () => {
    await createCampaign.launch(campaign);

    expect(campaignRepo.save).toBeCalledWith(campaign.toPrimitives());
  });
});
