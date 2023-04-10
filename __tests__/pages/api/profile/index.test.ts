import { mockedContext } from "../../../../__mocks__/context/MockContext";
import { TestDBs } from "../../../../__mocks__/lib/infrastructure/db/TestDBs";
import getProfile, { IApiProfileResp } from "@/pages/api/v1/profile/index";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { User } from "@/src/modules/users/user/domain/User";
import { Ad } from "@/src/modules/ad/domain/Ad";
import { Campaign } from "@/src/modules/campaign/domain/Campaign";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { FakeAdvertiser } from "../../../../__mocks__/lib/modules/user/FakeAdvertiser";

describe("ON api/v1/profile/index, GIVEN ....", () => {
  let user: User;
  let advertiser: User;
  let ads: Ad[];
  let campaigns: Campaign[];
  let stripes: Stripe[];
  let testDB: TestDBs;
  beforeAll(async () => {
    testDB = await TestDBs.setAndInitAll();
    user = testDB.users[0];
    advertiser = testDB.advertisers[0];
    ads = testDB.ads;
    const campaignsStatus = testDB.campaigns;
    campaigns = [
      ...campaignsStatus.actives,
      ...campaignsStatus.finished,
      ...campaignsStatus.standBy,
    ];
    stripes = testDB.stripes;
  });

  it("WHEN send a not GET request, THEN status code should not be 200", async () => {
    const { req, res } = mockedContext({
      method: "POST",
    });

    await getProfile(req, res);

    expect(res.statusCode).not.toBe(200);
  });

  it("WHEN send a GET request without a session, THEN status code should not be 200", async () => {
    const { req, res } = mockedContext({
      method: "GET",
    });

    await getProfile(req, res);

    expect(res.statusCode).not.toBe(200);
  });

  it("WHEN send a GET request with a session role user, THEN status code should not be 200", async () => {
    const ctx = mockedContext({
      method: "GET",
    });

    userSession.setFromServer(ctx, user.toPrimitives());
    await getProfile(ctx.req, ctx.res);

    expect(ctx.res.statusCode).not.toBe(200);
  });

  it(`WHEN send a GET request with a session role advertiser, 
  THEN status code should be 200`, async () => {
    const ctx = mockedContext({
      method: "GET",
    });

    userSession.setFromServer(ctx, advertiser.toPrimitives());
    await getProfile(ctx.req, ctx.res);

    const response: IApiProfileResp = ctx.res._getJSONData();

    const advertiserAds = ads
      .filter((ad) => ad.advertiserId.id === advertiser.id.id)
      .map((ad) => ad.toPrimitives());
    const advertiserCampaigns = campaigns
      .filter((campaign) => campaign.advertiserId.id === advertiser.id.id)
      .map((campaign) => campaign.toPrimitives());
    const advertiserStripe = stripes
      .filter((stripe) => stripe.userId.id === advertiser.id.id)
      .map((stripe) => stripe.toPrimitives());

    expect(ctx.res.statusCode).toBe(200);
    expect(response.data?.ads).toEqual(advertiserAds);
    expect(response.data?.campaigns).toEqual(advertiserCampaigns);
    expect(response.data?.stripeCustomer).toEqual(advertiserStripe[0]);
  });

  it.only(`WHEN send a GET request with a new advertiser without ads, campaigns and stripe customer, 
  THEN status code should be 200`, async () => {
    const ctx = mockedContext({
      method: "GET",
    });

    const newAdvertiser = FakeAdvertiser.create();
    await testDB.dbs.users.saveMany([newAdvertiser]);

    userSession.setFromServer(ctx, newAdvertiser.toPrimitives());
    await getProfile(ctx.req, ctx.res);

    const response: IApiProfileResp = ctx.res._getJSONData();

    expect(ctx.res.statusCode).toBe(200);
    expect(response.data?.ads).toEqual([]);
    expect(response.data?.campaigns).toEqual([]);
  });
});
