import {
  Campaign,
  ICampaignPrimitives,
} from "@/src/modules/campaign/domain/Campaign";
import { ICampaignRepo } from "@/src/modules/campaign/domain/ICampaignRepo";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { CreateCampaign } from "@/src/modules/campaign/use-case/CreateCampaign";
import { UniqId } from "@/src/utils/UniqId";
import { FakeCampaign } from "../../../../__mocks__/lib/campaign/FakeCampaign";

describe("On CreateCampaign, GIVEN a Campaign and a Campaign Repo ", () => {
  let campaignRepo: ICampaignRepo;
  let createCampaign: CreateCampaign;
  let campaign: Campaign;

  beforeAll(() => {
    campaignRepo = {
      save: jest.fn(),
      findAllByAdvertiserId: jest.fn(),
      findByStatus: jest.fn(),
    };
    createCampaign = new CreateCampaign(campaignRepo);
    campaign = FakeCampaign.create({advertiserId: UniqId.new(), status: CampaignStatusType.ACTIVE});
  });

  it(`WHEN call the launch method, 
  THEN the repo should be called with the campaign primitives`, async () => {
    await createCampaign.launch(campaign);

    let campaignPrimitives: ICampaignPrimitives = {
      id: campaign.id.id,
      advertiserId: campaign.advertiserId.id,
      adId: campaign.adId.id,
      promoters: campaign.promoters.map((promoter) => promoter.id),
      watchers: campaign.watchers.map((watcher) => watcher.id),
      status: campaign.status,
      budget: {
        maxClicks: campaign.budget.maxClicks,
        moneyToSpend: campaign.budget.moneyToSpend,
      },
      metrics: {
        totalClicks: campaign.metrics.totalClicks,
        totalViews: campaign.metrics.totalViews,
      },
    };
    expect(campaignRepo.save).toBeCalledWith(campaignPrimitives);
  });
});
