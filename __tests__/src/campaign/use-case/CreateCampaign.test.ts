import {
  Campaign,
  ICampaignPrimitives,
} from "@/src/modules/campaign/domain/Campaign";
import { ICampaignRepo } from "@/src/modules/campaign/domain/ICampaignRepo";
import { CreateCampaign } from "@/src/modules/campaign/use-case/CreateCampaign";
import { FakeCampaign } from "../../../../__mocks__/lib/campaign/FakeCampaign";

describe("On CreateCampaign, GIVEN a Campaign and a Campaign Repo ", () => {
  let campaignRepo: ICampaignRepo;
  let createCampaign: CreateCampaign;
  let campaign: Campaign;

  beforeAll(() => {
    campaignRepo = { launch: jest.fn() };
    createCampaign = new CreateCampaign(campaignRepo);
    campaign = FakeCampaign.create();
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
    expect(campaignRepo.launch).toBeCalledWith(campaignPrimitives);
  });
});
