import { IApiPaymentIntent } from "@/pages/api/v1/payments/stripe/payment-intent";
import { Ad } from "@/src/modules/ad/domain/Ad";
import { AvailableAmounts } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentAmount";
import { mockedContext } from "../../../../../__mocks__/context/MockContext";
import { TestDBs } from "../../../../../__mocks__/lib/infrastructure/db/TestDBs";
import apiPaymentIntent from "@/pages/api/v1/payments/stripe/payment-intent";
import { FakePaymentMethodId } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentMethodId";
import { getEnumValues } from "@/src/utils/helpers";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { User } from "@/src/modules/users/user/domain/User";
import { FakeAdvertiser } from "./../../../../../__mocks__/lib/modules/user/FakeAdvertiser";
import { FakeAd } from "./../../../../../__mocks__/lib/modules/ads/FakeAd";
import { UniqId } from "@/src/utils/UniqId";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { TestStripeDB } from "../../../../../__mocks__/lib/infrastructure/db/TestStripeDB";

describe("On /api/payments/stripe/payment-intent, GIVEN a mocked DB", () => {
  // let testDB: TestDBs;
  let ads: Ad[];
  let user: User[];

  beforeAll(async () => {
    const testDB = await TestDBs.setAndInitAll();
    user = testDB.users;
    ads = testDB.ads;
  });

  it("WHEN send a non 'PUT' request, THEN status code should be 400", async () => {
    const body: IApiPaymentIntent = {
      adId: ads[0].id.id,
      budgetItem: AvailableAmounts.Fifty,
    };
    const { req, res } = mockedContext({ method: "GET", body });

    await apiPaymentIntent(req, res);

    expect(res.statusCode).toBe(400);
  });

  it("WHEN send a valid request without session, THEN status code should be 400", async () => {
    const body: IApiPaymentIntent = {
      adId: ads[0].id.id,
      budgetItem: getEnumValues(AvailableAmounts).length - 1,
    };
    const { req, res } = mockedContext({ method: "PUT", body });

    await apiPaymentIntent(req, res);

    expect(res.statusCode).toBe(400);
  });

  it("WHEN send a not valid budget item, THEN status code should be 400", async () => {
    const body: IApiPaymentIntent = {
      adId: ads[0].id.id,
      budgetItem: 10,
    };
    const { req, res } = mockedContext({ method: "PUT", body });

    userSession.setFromServer({ req, res }, { ...user[0].toPrimitives() });

    await apiPaymentIntent(req, res);

    expect(res.statusCode).toBe(400);
  });

  it("WHEN send request without an adId, THEN status code should be 400", async () => {
    const body: IApiPaymentIntent = {
      adId: "",
      budgetItem: 10,
    };
    const { req, res } = mockedContext({ method: "PUT", body });

    userSession.remove({ req, res });
    userSession.setFromServer({ req, res }, { ...user[0].toPrimitives() });

    await apiPaymentIntent(req, res);

    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send request without an existing ad id for the advertiser id, 
  THEN status code should be 400`, async () => {
    const body: IApiPaymentIntent = {
      adId: ads[0].id.id,
      budgetItem: 0,
    };
    const { req, res } = mockedContext({ method: "PUT", body });

    userSession.remove({ req, res });
    userSession.setFromServer({ req, res }, { ...user[0].toPrimitives() });

    await apiPaymentIntent(req, res);

    expect(res.statusCode).toBe(400);
  });
});

describe("On /api/payments/stripe/payment-intent, GIVEN a mocked DB,", () => {
  let testDB: TestDBs;
  let savedStripeModel: Stripe;
  let newAdvertiser: User;
  let newAdvertiserAd: Ad;
  let stripeDB: TestStripeDB;

  beforeAll(async () => {
    testDB = await TestDBs.setAndInitAll();
    newAdvertiser = FakeAdvertiser.create();
    newAdvertiserAd = FakeAd.createWithGivenIds({
      advertiserId: newAdvertiser.id,
      adId: UniqId.new(),
    });
    const saveNewUser = testDB.dbs.users.saveMany([newAdvertiser]);
    const saveNewAd = testDB.dbs.ads.saveMany([newAdvertiserAd]);
    await Promise.all([saveNewUser, saveNewAd]);
    stripeDB = testDB.dbs.stripe;
  });

  it(`WHEN send request with an Empty Payment Method and without Stripe Model, 
    THEN status code should be 200, response should have property 'clientSecret' and stripe model should be saved`, async () => {
    const body: IApiPaymentIntent = {
      adId: newAdvertiserAd.id.id,
      budgetItem: 0,
    };
    const ctx = mockedContext({ method: "PUT", body });

    userSession.remove(ctx);
    userSession.setFromServer(ctx, { ...newAdvertiser.toPrimitives() });

    await apiPaymentIntent(ctx.req, ctx.res);
    const stripeModels = await stripeDB.getAll();
    savedStripeModel = stripeModels?.find(
      (model) => model.userId.id === newAdvertiser.id.id
    )!;

    expect(ctx.res.statusCode).toBe(200);
    expect(ctx.res._getJSONData()["clientSecret"]).not.toBeNull();
    expect(savedStripeModel).not.toBeUndefined();
  });

  it(`WHEN send request with an Empty Payment Method but with a saved Stripe Model, 
    THEN status code should be 200 and response should have property 'clientSecret'`, async () => {
    const updatedAdvertisers = testDB.dbs.users.getAllAdvertisers();
    const updatedAds = testDB.dbs.ads.getAllAds();
    const updated = await Promise.all([updatedAdvertisers, updatedAds]);

    const advertiser = updated[0]!.find(
      (advertiser) => advertiser.id.id === savedStripeModel.userId.id
    );
    const advertiserAd = updated[1]!.find(
      (ad) => ad.advertiserId.id === advertiser?.id.id
    );

    const body: IApiPaymentIntent = {
      adId: advertiserAd!.id.id,
      budgetItem: 0,
    };
    const ctx = mockedContext({ method: "PUT", body });

    userSession.remove(ctx);
    userSession.setFromServer(ctx, { ...advertiser!.toPrimitives() });

    await apiPaymentIntent(ctx.req, ctx.res);

    expect(ctx.res.statusCode).toBe(200);
    expect(ctx.res._getJSONData()["clientSecret"]).not.toBeNull();
  });

  it(`WHEN send request with a not existing Payment Method and with Stripe Model, 
    THEN status code should be 400`, async () => {
    const body: IApiPaymentIntent = {
      adId: newAdvertiserAd.id.id,
      budgetItem: 0,
      paymentMethod: FakePaymentMethodId.noExist().id,
    };
    const { req, res } = mockedContext({ method: "PUT", body });

    userSession.remove({ req, res });
    userSession.setFromServer(
      { req, res },
      { ...newAdvertiser.toPrimitives() }
    );

    await apiPaymentIntent(req, res);

    expect(res.statusCode).toBe(400);
  });
});

describe("On /api/payments/stripe/payment-intent, GIVEN a mocked DB and a valid payment method,", () => {
  let savedStripeModel: Stripe;
  let newAdvertiser: User;
  let newAdvertiserAd: Ad;
  let stripeDB: TestStripeDB;
  let testDB: TestDBs;

  beforeAll(async () => {
    testDB = await TestDBs.setAndInitAll();
    newAdvertiser = FakeAdvertiser.create();
    newAdvertiserAd = FakeAd.createWithGivenIds({
      advertiserId: newAdvertiser.id,
      adId: UniqId.new(),
    });
    const saveNewUser = testDB.dbs.users.saveMany([newAdvertiser]);
    const saveNewAd = testDB.dbs.ads.saveMany([newAdvertiserAd]);
    await Promise.all([saveNewUser, saveNewAd]);
    stripeDB = testDB.dbs.stripe;
  });

  it(`WHEN send a request without Stripe Model, 
  THEN status code should be 200`, async () => {
    const body: IApiPaymentIntent = {
      adId: newAdvertiserAd.id.id,
      budgetItem: 0,
      paymentMethod: FakePaymentMethodId.create().id,
    };
    const ctx = mockedContext({ method: "PUT", body });

    userSession.remove(ctx);
    userSession.setFromServer(ctx, { ...newAdvertiser.toPrimitives() });

    await apiPaymentIntent(ctx.req, ctx.res);
    const stripeModels = await stripeDB.getAll();
    savedStripeModel = stripeModels?.find(
      (model) => model.userId.id === newAdvertiser.id.id
    )!;

    expect(ctx.res.statusCode).toBe(200);
  });

  it(`WHEN send a request a saved Stripe Model, 
  THEN status code should be 200`, async () => {
    const updatedAdvertisers = testDB.dbs.users.getAllAdvertisers();
    const updatedAds = testDB.dbs.ads.getAllAds();
    const updated = await Promise.all([updatedAdvertisers, updatedAds]);

    const advertiser = updated[0]!.find(
      (advertiser) => advertiser.id.id === savedStripeModel.userId.id
    );
    const advertiserAd = updated[1]!.find(
      (ad) => ad.advertiserId.id === advertiser?.id.id
    );

    const body: IApiPaymentIntent = {
      adId: advertiserAd!.id.id,
      budgetItem: 0,
      paymentMethod: FakePaymentMethodId.create().id,
    };
    const ctx = mockedContext({ method: "PUT", body });

    userSession.remove(ctx);
    userSession.setFromServer(ctx, { ...advertiser!.toPrimitives() });

    await apiPaymentIntent(ctx.req, ctx.res);

    expect(ctx.res.statusCode).toBe(200);
  });
});
