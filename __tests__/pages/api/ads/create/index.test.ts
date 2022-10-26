import createAdvertise from "@/pages/api/ads/create";
import { FakeAd } from "../../../../../__mocks__/lib/modules/ads/FakeAd";
import { UniqId } from "@/src/utils/UniqId";
import { TestAdMongoDBRepository } from "../../../../../__mocks__/lib/modules/ads/infraestructure/TestAdMongoDBRepository";
import { userSession } from "@/src/use-case/container";
import { FakeAdvertiser } from "../../../../../__mocks__/lib/modules/advertiser/FakeAdvertiser";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { MockContext } from "../../../../../__mocks__/context/MockContext";
import { mockedAdRepo } from "../../../../../__mocks__/context/MockAdTestDB";

describe("On 'api/ads/create-ad', GIVEN Ad MongoDB Repository and an Advertiser", () => {
  let advertiser: AdvertiserPropsPrimitives;

  beforeAll(async () => {
    await mockedAdRepo(5);
    advertiser = FakeAdvertiser.createPrimitives();
  }, 8000);

  afterAll(async () => {
    await TestAdMongoDBRepository.disconnectMongoDB();
  }, 8000);

  it(`WHEN sending a 'POST' request with all the required params and a valid user session, 
  THEN should return a 200 statusCode`, async () => {
    const ad = FakeAd.createWithPrimitives(advertiser.id);

    const ctx = MockContext("POST", ad);

    userSession.setFromServer(ctx, advertiser);

    await createAdvertise(ctx.req, ctx.res);

    expect(ctx.res.statusCode).toBe(200);
  }, 8000);

  it(`WHEN sending a 'POST' request without a user session, 
  THEN should return a 400 statusCode`, async () => {
    const ad = FakeAd.createWithPrimitives(advertiser.id);

    const ctx = MockContext("POST", ad);

    userSession.remove(ctx);

    await createAdvertise(ctx.req, ctx.res);

    expect(ctx.res.statusCode).toBe(400);
  }, 8000);

  it("WHEN sending a 'POST' request with an invalid params, THEN should return a 400 statusCode", async () => {
    const ad = FakeAd.createWithPrimitives(advertiser.id);

    const { req, res } = MockContext("POST", { ...ad, advertiserId: "" });

    await createAdvertise(req, res);

    expect(res.statusCode).toBe(400);
  }, 8000);

  it("WHEN sending a not 'POST' request, THEN should return a 400 statusCode", async () => {
    const ad = FakeAd.createWithPrimitives(advertiser.id);

    const { req, res } = MockContext("GET", { ...ad });

    await createAdvertise(req, res);

    expect(res.statusCode).toBe(400);
  }, 8000);
});
