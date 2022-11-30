import { AdModel } from "@/src/modules/ad/infraestructure/db/AdModel";
import findAd from "@/pages/api/v1/ads";
import { Ad, AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { TestAdMongoDBRepository } from "../../../../__mocks__/lib/modules/ads/infraestructure/TestAdMongoDBRepository";
import { mockedContext } from "../../../../__mocks__/context/MockContext";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { FakeAdvertiser } from "../../../../__mocks__/lib/modules/user/FakeAdvertiser";
import { setTestAdDB } from "../../../../__mocks__/lib/infrastructure/db/TestAdDB";
import { FakeAd } from "../../../../__mocks__/lib/modules/ads/FakeAd";
import { User } from "@/src/modules/users/user/domain/User";

describe("On api/ads, GIVEN some Ads saved in MognoDB ", () => {
  let advertiser: User;
  let fakeAds: Ad[];
  beforeAll(async () => {
    const mockedAdDB = await setTestAdDB(5);
    advertiser = FakeAdvertiser.create();
    fakeAds = FakeAd.createMany(advertiser.id, 3);
    await mockedAdDB.saveMany(fakeAds);
  }, 8000);

  it(`WHEN send a 'GET' request with a user session, 
  THEN receive a statusCode 200 and same amount of ads that in the DB`, async () => {
    const ctx = mockedContext({ method: "GET", body: { id: advertiser.id } });
    userSession.setFromServer(ctx, advertiser.toPrimitives());
    await findAd(ctx.req, ctx.res);

    const adsData: AdPropsPrimitives[] = JSON.parse(
      JSON.stringify(ctx.res._getJSONData().ads)
    );

    expect(ctx.res.statusCode).toBe(200);
    expect(adsData.length).toBe(fakeAds.length);
  });

  it(`WHEN send a 'GET' request without a user session, 
  THEN receive a statusCode 400`, async () => {
    const ctx = mockedContext({ method: "GET", body: { id: advertiser.id } });
    userSession.remove(ctx);

    await findAd(ctx.req, ctx.res);

    expect(ctx.res.statusCode).toBe(400);
  });
});
