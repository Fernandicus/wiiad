import createAdvertise from "@/pages/api/v1/ads/create/banner";
import { FakeAd } from "../../../../../__mocks__/lib/modules/ads/FakeAd";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { FakeAdvertiser } from "../../../../../__mocks__/lib/modules/user/FakeAdvertiser";
import { mockedContext } from "../../../../../__mocks__/context/MockContext";
import { setTestAdDB } from "../../../../../__mocks__/lib/infrastructure/db/TestAdDB";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";

describe("On 'api/ads/create-ad', GIVEN Ad MongoDB Repository and an Advertiser", () => {
  let advertiser: IUserPrimitives;

  beforeAll(async () => {
    await setTestAdDB(5);
    advertiser = FakeAdvertiser.createPrimitives();
  }, 8000);

  it(`WHEN sending a 'POST' request with all the required params and a valid user session, 
  THEN should return a 200 statusCode`, async () => {
    const ad = FakeAd.createWithPrimitives(advertiser.id);

    const ctx = mockedContext({ method: "POST", body: ad });

    userSession.setFromServer(ctx, advertiser);

    await createAdvertise(ctx.req, ctx.res);

    expect(ctx.res.statusCode).toBe(200);
  }, 8000);

  it(`WHEN sending a 'POST' request without a user session, 
  THEN should return a 400 statusCode`, async () => {
    const ad = FakeAd.createWithPrimitives(advertiser.id);

    const ctx = mockedContext({ method: "POST", body: ad });

    userSession.remove(ctx);

    await createAdvertise(ctx.req, ctx.res);

    expect(ctx.res.statusCode).toBe(400);
  }, 8000);

  it("WHEN sending a 'POST' request with an invalid params, THEN should return a 400 statusCode", async () => {
    const ad = FakeAd.createWithPrimitives(advertiser.id);

    const { req, res } = mockedContext({
      method: "POST",
      body: { ...ad, advertiserId: "" },
    });

    await createAdvertise(req, res);

    expect(res.statusCode).toBe(400);
  }, 8000);

  it("WHEN sending a not 'POST' request, THEN should return a 400 statusCode", async () => {
    const ad = FakeAd.createWithPrimitives(advertiser.id);

    const { req, res } = mockedContext({ method: "GET", body: ad });

    await createAdvertise(req, res);

    expect(res.statusCode).toBe(400);
  }, 8000);
});
