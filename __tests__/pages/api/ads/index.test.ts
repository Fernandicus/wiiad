import { AdModel } from "@/src/modules/ad/infraestructure/AdModel";
import findAd from "@/pages/api/ads";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { NextApiRequest, NextApiResponse } from "next";
import { TestAdMongoDBRepository } from "../../../../__mocks__/lib/ads/infraestructure/TestAdMongoDBRepository";
import { TestCreateAd } from "../../../../__mocks__/lib/ads/use-case/TestCreateAd";
import { TestCreateAdController } from "../../../../__mocks__/lib/ads/controller/TestCreateAdController";
import { MockContext } from "../../../../__mocks__/context/Context";
import { userSession } from "@/src/use-case/container";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { FakeAdvertiser } from "../../../../__mocks__/lib/advertiser/FakeAdvertiser";

describe("On api/ads, GIVEN some Ads saved in MognoDB ", () => {
  let advertiser: AdvertiserPropsPrimitives;

  beforeAll(async () => {
    const testAdRepo = await TestAdMongoDBRepository.init();
    advertiser = FakeAdvertiser.createPrimitives();
    const testCreateAd = new TestCreateAd(testAdRepo);
    const controller = new TestCreateAdController(testCreateAd);

    await controller.crateManyWithGivenAdvertiserId(advertiser.id);
  }, 8000);

  afterAll(async () => {
    await TestAdMongoDBRepository.disconnectMongoDB();
  }, 8000);

  it(`WHEN send a 'GET' request with a user session, 
  THEN receive a statusCode 200 and same amount of ads that in the DB`, async () => {
    const adsInMongoose = await AdModel.count({ advertiserId: advertiser.id });

    const ctx = MockContext("GET", { id: advertiser.id });
    userSession.setFromServer(ctx, advertiser);
    await findAd(ctx.req, ctx.res);

    const adsData: AdPropsPrimitives[] = JSON.parse(ctx.res._getJSONData().ads);
    expect(ctx.res.statusCode).toBe(200);
    expect(adsData.length).toBe(adsInMongoose);
  });

  it(`WHEN send a 'GET' request without a user session, 
  THEN receive a statusCode 400`, async () => {
    const ctx = MockContext("GET", { id: advertiser.id });
    userSession.remove(ctx);

    await findAd(ctx.req, ctx.res);

    expect(ctx.res.statusCode).toBe(400);
  });
});
