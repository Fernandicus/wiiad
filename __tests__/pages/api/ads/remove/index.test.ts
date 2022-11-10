import httpMock from "node-mocks-http";
import removeAd from "@/pages/api/v1/ads/remove";
import { NextApiResponse } from "next";
import { AdModel } from "@/src/modules/ad/infraestructure/AdModel";
import { FakeAd } from "../../../../../__mocks__/lib/modules/ads/FakeAd";
import { TestAdMongoDBRepository } from "../../../../../__mocks__/lib/modules/ads/infraestructure/TestAdMongoDBRepository";
import { MockContext } from "../../../../../__mocks__/context/MockContext";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { FakeAdvertiser } from "../../../../../__mocks__/lib/modules/advertiser/FakeAdvertiser";
import { userSession } from "@/src/use-case/container";
import { mockedAdRepo } from "../../../../../__mocks__/lib/infrastructure/db/TestAdDB";

describe("On api/ads/remove-ad route", () => {
  let advertiser: AdvertiserPropsPrimitives;
  
  beforeEach(async () => {
    await mockedAdRepo(5);
    advertiser = FakeAdvertiser.createPrimitives();
  }, 8000);

  it("WHEN send 'DELETE' method with correct ad id and a user session, THEN response with status 200", async () => {
    const adData = FakeAd.createWithPrimitives(advertiser.id);

    const ad = new AdModel({
      _id: adData.id,
      ...adData,
    });
    
    await ad.save();
   
    const ctx = MockContext("DELETE", {
      adId: ad.id,
    });

    userSession.setFromServer(ctx, { ...advertiser });

    await removeAd(ctx.req, ctx.res);

    expect(ctx.res.statusCode).toBe(200);
  }, 8000);

  it("WHEN send 'DELETE' method with correct ad id but without session, THEN response with status 400", async () => {
    const adData = FakeAd.createWithPrimitives(advertiser.id);

    const ad = new AdModel({
      _id: adData.id,
      ...adData,
    });

    await ad.save();

    const ctx = MockContext("DELETE", {
      adId: ad.id,
    });

    userSession.remove(ctx)

    await removeAd(ctx.req, ctx.res);

    expect(ctx.res.statusCode).toBe(400);
  }, 8000);

  it("When send 'DELETE' method without a correct ad id response with status 400", async () => {
    const req = httpMock.createRequest({
      method: "DELETE",
      body: {},
    });
    const res: NextApiResponse = httpMock.createResponse();

    await removeAd(req, res);

    expect(res.statusCode).toBe(400);
  }, 8000);

  it("When send a not 'DELETE' method response with status 400", async () => {
    const req = httpMock.createRequest({
      method: "POST",
      body: {
        adId: "12345",
      },
    });
    const res: NextApiResponse = httpMock.createResponse();

    await removeAd(req, res);

    expect(res.statusCode).toBe(400);
  }, 8000);
});
