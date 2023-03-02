import api_v1_IncreaseViews from "@/pages/api/v1/campaign/metrics/increase-views";
import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import { CampaignStatus } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import {
  autoSetTestCampaignDB,
  TestCampaignDB,
} from "../../../../../__mocks__/lib/infrastructure/db/TestCampaignDB";
import { mockedContext } from "../../../../../__mocks__/context/MockContext";
import { UniqId } from "@/src/utils/UniqId";

function handlePromise(
  resp: PromiseSettledResult<Campaign[] | null>
): Campaign[] | null {
  if (resp.status !== "rejected") return resp.value;
  throw new Error(resp.reason);
}

describe("On api/v1/campaign/metrics/increase-views, GIVEN some Campaigns", () => {
  let activeCampaigns: Campaign[] | null;
  let finisehdCampaigns: Campaign[] | null;
  let standByCampaigns: Campaign[] | null;
  let campaignsRepo: TestCampaignDB;

  beforeAll(async () => {
    campaignsRepo = await autoSetTestCampaignDB();
    const [active, standby, finished] = await Promise.allSettled([
      campaignsRepo.findByStatus(CampaignStatus.active()),
      campaignsRepo.findByStatus(CampaignStatus.standBy()),
      campaignsRepo.findByStatus(CampaignStatus.finished()),
    ]);

    activeCampaigns = handlePromise(active);
    standByCampaigns = handlePromise(standby);
    finisehdCampaigns = handlePromise(finished);
  });

  it(`WHEN send a not 'POST' request, 
    THEN status code should be 400`, async () => {
    const { req, res } = mockedContext({
      method: "GET",
    });

    await api_v1_IncreaseViews(req, res);
    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send POST request without campaign Id, 
  THEN status code should be 400`, async () => {
    const { req, res } = mockedContext({
      method: "POST",
    });

    await api_v1_IncreaseViews(req, res);
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

    await api_v1_IncreaseViews(req, res);
    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send POST request with or without user session an with an active campaign id, 
  THEN campaign total views should be increased by one and status code should be 200`, async () => {
    const campaign = activeCampaigns![0];
    const { req, res } = mockedContext({
      method: "POST",
      body: {
        campaignId: campaign.id.id,
      },
    });

    await api_v1_IncreaseViews(req, res);
    const campaignFound = await campaignsRepo.findById(campaign.id);

    expect(res.statusCode).toBe(200);
    expect(campaignFound!.metrics.totalViews).toBe(
      campaign.metrics.totalViews + 1
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

    await api_v1_IncreaseViews(req, res);

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

    await api_v1_IncreaseViews(req, res);

    expect(res.statusCode).toBe(400);
  });
});
