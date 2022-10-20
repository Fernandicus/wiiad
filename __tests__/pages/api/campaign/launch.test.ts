import launchCampaign from "@/pages/api/campaign/launch";
import { Ad } from "@/src/modules/ad/domain/Ad";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { FakeAd } from "../../../../__mocks__/lib/ads/FakeAd";
import { TestAdMongoDBRepository } from "../../../../__mocks__/lib/ads/infraestructure/TestAdMongoDBRepository";
import { TestCreateAd } from "../../../../__mocks__/lib/ads/use-case/TestCreateAd";
import { FakeAdvertiser } from "../../../../__mocks__/lib/advertiser/FakeAdvertiser";
import { MockContext } from "../../../../__mocks__/context/Context";

describe("On api/campaign/launch, GIVEN an advertiser and some ads", () => {
  let ads: Ad[];
  let advertiser: AdvertiserPropsPrimitives;

  beforeAll(async () => {
    const repo = await TestAdMongoDBRepository.init();
    advertiser = FakeAdvertiser.createPrimitives();
    ads = FakeAd.createMany(advertiser.id, 3);
    const createAd = new TestCreateAd(repo);
    await createAd.saveMany(ads);
  });

  it(`WHEN send a POST request with a valid ad id, 
  THEN return status code 200`, async () => {
    const { req, res } = MockContext("POST", { adId: "123" });

    await launchCampaign(req, res);

    expect(res.statusCode).toBe(200);
  });

  it(`WHEN send a GET request, 
  THEN return status code 400`, async () => {
    const { req, res } = MockContext("GET", { adId: "123" });

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
