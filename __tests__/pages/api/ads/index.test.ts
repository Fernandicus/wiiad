import { AdModel } from "@/src/modules/ad/infraestructure/AdModel";
import findAd from "@/pages/api/v1/ads";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { TestAdMongoDBRepository } from "../../../../__mocks__/lib/modules/ads/infraestructure/TestAdMongoDBRepository";
import { MockContext } from "../../../../__mocks__/context/MockContext";
import { userSession } from "@/src/use-case/container";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { FakeAdvertiser } from "../../../../__mocks__/lib/modules/advertiser/FakeAdvertiser";
import {
  mockedAdRepo,
  MockAdTestDB,
} from "../../../../__mocks__/context/db/TestAdDB";
import { FakeAd } from "../../../../__mocks__/lib/modules/ads/FakeAd";

describe("On api/ads, GIVEN some Ads saved in MognoDB ", () => {
  let advertiser: AdvertiserPropsPrimitives;
  let fakeAds: AdPropsPrimitives[];
  beforeAll(async () => {
    const mockedAdDB = await mockedAdRepo(5);
    advertiser = FakeAdvertiser.createPrimitives();
    fakeAds = FakeAd.createManyWithPrimitives(advertiser.id, 3);
    await mockedAdDB.saveMany(fakeAds);
  }, 8000);

  it(`WHEN send a 'GET' request with a user session, 
  THEN receive a statusCode 200 and same amount of ads that in the DB`, async () => {
    const ctx = MockContext("GET", { id: advertiser.id });
    userSession.setFromServer(ctx, advertiser);
    await findAd(ctx.req, ctx.res);

    const adsData: AdPropsPrimitives[] = JSON.parse(
      JSON.stringify(ctx.res._getJSONData().ads)
    );

    expect(ctx.res.statusCode).toBe(200);
    expect(adsData.length).toBe(fakeAds.length);
  });

  it(`WHEN send a 'GET' request without a user session, 
  THEN receive a statusCode 400`, async () => {
    const ctx = MockContext("GET", { id: advertiser.id });
    userSession.remove(ctx);

    await findAd(ctx.req, ctx.res);

    expect(ctx.res.statusCode).toBe(400);
  });
});
