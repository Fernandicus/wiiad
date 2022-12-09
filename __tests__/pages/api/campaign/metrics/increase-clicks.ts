import api_v1_IncreaseClicks from "@/pages/api/v1/campaign/metrics/increase-clicks";
import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import { CampaignStatus } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import {
  autoSetTestCampaignDB,
  TestCampaignDB,
} from "../../../../../__mocks__/lib/infrastructure/db/TestCampaignDB";
import { mockedContext } from "../../../../../__mocks__/context/MockContext";
import { UniqId } from "@/src/utils/UniqId";
import { TestCampaignMongoDBRepo } from "__mocks__/lib/modules/campaign/infrastructure/TestCampaignMongoDBRepo";
import { CampaignMongoDBRepo } from "@/src/modules/campaign/infrastructure/db/CampaignMongoDBRepo";
import { findCampaignHandler } from "@/src/modules/campaign/infrastructure/campaign-container";

describe("On api/v1/campaign/metrics/increase-clicks, GIVEN ....", () => {
  let activeCampaigns: Campaign[] | null;
  let finisehdCampaigns: Campaign[] | null;
  let standByCampaigns: Campaign[] | null;
  let campaignsRepo: TestCampaignDB;

  beforeAll(async () => {
    campaignsRepo = await autoSetTestCampaignDB();
    activeCampaigns = await campaignsRepo.findByStatus(CampaignStatus.active());
    standByCampaigns = await campaignsRepo.findByStatus(
      CampaignStatus.standBy()
    );
    finisehdCampaigns = await campaignsRepo.findByStatus(
      CampaignStatus.finished()
    );
  });

  it(`WHEN send a not 'POST' request, 
    THEN status code should be 400`, async () => {
    const { req, res } = mockedContext({
      method: "GET",
    });

    await api_v1_IncreaseClicks(req, res);
    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send POST request without campaign Id, 
  THEN status code should be 400`, async () => {
    const { req, res } = mockedContext({
      method: "POST",
    });

    await api_v1_IncreaseClicks(req, res);
    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send POST request with a not existing campaign id, 
  THEN status code should be 400`, async () => {
    const { req, res } = mockedContext({
      method: "POST",
      body: {
        campaignId: UniqId.generate(),
      },
    });

    await api_v1_IncreaseClicks(req, res);
    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send POST request with an active campaign id, 
  THEN campaign  total clicks should be increased by one and status code should be 200`, async () => {
    const campaign = activeCampaigns![0];
    const { req, res } = mockedContext({
      method: "POST",
      body: {
        campaignId: campaign.id.id,
      },
    });

    await api_v1_IncreaseClicks(req, res);
    const campaignFound = await campaignsRepo.findById(campaign.id);

    expect(res.statusCode).toBe(200);
    expect(campaignFound!.metrics.totalClicks).toBe(
      campaign.metrics.totalClicks + 1
    );
  });

  it(`WHEN send POST request with a stand by campaign id, 
  THEN status code shoudl be 400`, async () => {
    const campaign = standByCampaigns![0];
    const { req, res } = mockedContext({
      method: "POST",
      body: {
        campaignId: campaign.id.id,
      },
    });

    await api_v1_IncreaseClicks(req, res);

    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send POST request with a finished campaign id, 
  THEN status code shoudl be 400`, async () => {
    const campaign = finisehdCampaigns![0];
    const { req, res } = mockedContext({
      method: "POST",
      body: {
        campaignId: campaign.id.id,
      },
    });

    await api_v1_IncreaseClicks(req, res);

    expect(res.statusCode).toBe(400);
  });
});
