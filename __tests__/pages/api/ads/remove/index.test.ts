import httpMock from "node-mocks-http";
import removeAd from "@/pages/api/v1/ads/remove";
import { NextApiResponse } from "next";
import { AdModel } from "@/src/modules/ad/infraestructure/db/AdModel";
import { FakeAd } from "../../../../../__mocks__/lib/modules/ads/FakeAd";
import { mockedContext } from "../../../../../__mocks__/context/MockContext";
import { FakeAdvertiser } from "../../../../../__mocks__/lib/modules/user/FakeAdvertiser";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { setTestAdDB, TestAdDB } from "../../../../../__mocks__/lib/infrastructure/db/TestAdDB";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { setTestCampaignDB } from "../../../../../__mocks__/lib/infrastructure/db/TestCampaignDB";
import { Ad } from "@/src/modules/ad/domain/Ad";
import { TestCampaignDB } from "../../../../../__mocks__/lib/infrastructure/db/TestCampaignDB";

describe("On api/ads/remove-ad route", () => {
  let advertiser: IUserPrimitives;
  let adWithActiveCampaign: Ad;
  let adsDB: TestAdDB;
  let campaignsDB: TestCampaignDB;

  beforeEach(async () => {
    const advertisers = FakeAdvertiser.createMany(9);
    adsDB = await setTestAdDB(advertisers);
    const ads = await adsDB.getAllAds();
    adWithActiveCampaign = ads[0];
    campaignsDB = await setTestCampaignDB({
      activeCampaignAds: ads.slice(0, 2),
      standByCampaignAds: ads.slice(3, 5),
      finishedCampaignAds: ads.slice(6, 8),
    });
    advertiser = advertisers[0].toPrimitives();
  }, 8000);

  it(`WHEN send 'DELETE' method with correct ad id and a user session, 
  THEN response with status 200 and the campaign should be removed`, async () => {
    const adData = adWithActiveCampaign;

    const ctx = mockedContext({
      method: "DELETE",
      body: {
        adId: adData.toPrimitives().id,
      },
    });

    userSession.setFromServer(ctx, { ...advertiser });

    await removeAd(ctx.req, ctx.res);

    const adsFound = await adsDB.getAllAds();
    const adFound = adsFound.find(ad=> ad.id.id === adData.id.id)
    const campaignFound = await campaignsDB.findById(adData.id)

    expect(ctx.res.statusCode).toBe(200);
    expect(campaignFound).toBeNull();
    expect(campaignFound).toBeNull();
    expect(adFound).toBeUndefined();
  }, 8000);

  it("WHEN send 'DELETE' method with correct ad id but without session, THEN response with status 400", async () => {
    const adData = FakeAd.createWithPrimitives(advertiser.id);

    const ad = new AdModel({
      _id: adData.id,
      ...adData,
    });

    await ad.save();

    const ctx = mockedContext({
      method: "DELETE",
      body: {
        adId: ad.id,
      },
    });

    userSession.remove(ctx);

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
