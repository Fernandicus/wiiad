import { Ad, AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { FakeAd } from "../../../../__mocks__/lib/ads/FakeAd";
import { FakeAdvertiser } from "../../../../__mocks__/lib/advertiser/FakeAdvertiser";
import { MockContext } from "../../../../__mocks__/context/Context";
import { userSession } from "@/src/use-case/container";
import { TestCampaignMongoDBRepo } from "../../../../__mocks__/lib/campaign/infrastructure/TestCampaignMongoDBRepo";
import launchCampaign from "@/pages/api/campaign/launch";

describe("On api/campaign/launch, GIVEN an advertiser and some ads", () => {
  let ad: AdPropsPrimitives;
  let advertiser: AdvertiserPropsPrimitives;

  beforeAll(async () => {
    await TestCampaignMongoDBRepo.init();
    advertiser = FakeAdvertiser.createPrimitives();
    ad = FakeAd.createWithPrimitives(advertiser.id);
  });

  it(`WHEN send a POST request with a valid ad id, 
  THEN return status code 200`, async () => {
    const { req, res } = MockContext("POST", { adId: ad.id });

    userSession.setFromServer({ req, res }, advertiser);
    await launchCampaign(req, res);

    expect(res.statusCode).toBe(200);
  });

  it(`WHEN try to launch a campaign without a session, 
  THEN return status code 400`, async () => {
    const { req, res } = MockContext("POST", { adId: ad.id });

    userSession.remove({ req, res });
    await launchCampaign(req, res);

    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a GET request, 
  THEN return status code 400`, async () => {
    const { req, res } = MockContext("GET", { adId: ad.id });

    await launchCampaign(req, res);

    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a POST request with an empty ad id, 
  THEN return status code 400`, async () => {
    const { req, res } = MockContext("GET", { adId: "" });

    await launchCampaign(req, res);

    expect(res.statusCode).toBe(400);
  });
});
