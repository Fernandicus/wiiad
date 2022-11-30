import { Ad, AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { FakeAd } from "../../../../../__mocks__/lib/modules/ads/FakeAd";
import { FakeAdvertiser } from "../../../../../__mocks__/lib/modules/advertiser/FakeAdvertiser";
import { mockedContext } from "../../../../../__mocks__/context/MockContext";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { TestCampaignMongoDBRepo } from "../../../../../__mocks__/lib/modules/campaign/infrastructure/TestCampaignMongoDBRepo";
import launchCampaign from "@/pages/api/v1/campaign/launch";
import { CampaignBudget } from "@/src/modules/campaign/domain/value-objects/Budget";
import { autoSetTestCampaignDB } from "../../../../../__mocks__/lib/infrastructure/db/TestCampaignDB";
import { Balance } from "@/src/domain/Balance";

describe("On api/campaign/launch, GIVEN an advertiser and some ads", () => {
  let ad: AdPropsPrimitives;
  let advertiser: AdvertiserPropsPrimitives;
  let budget: CampaignBudget;

  beforeAll(async () => {
    await autoSetTestCampaignDB();
    advertiser = FakeAdvertiser.createPrimitives();
    ad = FakeAd.createWithPrimitives(advertiser.id);
    budget = new CampaignBudget({
      clicks: 1000,
      balance: new Balance(50),
    });
  }, 20000);

  it(`WHEN send a POST request with a valid ad id and a, 
  THEN return status code 200`, async () => {
    const { req, res } = mockedContext({
      method: "POST",
      body: { id: ad.id, budget },
    });

    userSession.setFromServer({ req, res }, advertiser);
    await launchCampaign(req, res);

    expect(res.statusCode).toBe(200);
  });

  it(`WHEN send a POST request with a valid ad id, 
  THEN return status code 400`, async () => {
    const { req, res } = mockedContext({
      method: "POST",
      body: { id: ad.id, budget },
    });

    userSession.setFromServer({ req, res }, advertiser);
    await launchCampaign(req, res);

    expect(res.statusCode).toBe(200);
  });

  it(`WHEN try to launch a campaign without a session, 
  THEN return status code 400`, async () => {
    const { req, res } = mockedContext({
      method: "POST",
      body: { id: ad.id, budget },
    });

    userSession.remove({ req, res });
    await launchCampaign(req, res);

    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a GET request, 
  THEN return status code 400`, async () => {
    const { req, res } = mockedContext({
      method: "GET",
      body: { id: ad.id, budget },
    });

    await launchCampaign(req, res);

    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a POST request with an empty ad id, 
  THEN return status code 400`, async () => {
    const { req, res } = mockedContext({
      method: "GET",
      body: { id: "", budget },
    });

    await launchCampaign(req, res);

    expect(res.statusCode).toBe(400);
  });
});
