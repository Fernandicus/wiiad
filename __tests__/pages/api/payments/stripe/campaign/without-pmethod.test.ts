import apiPayWithoutPMethod, {
  IApiReqStripePaymentWithoutPMethod,
} from "@/pages/api/v1/payments/stripe/campaign/without-pmethod";
import { Ad } from "@/src/modules/ad/domain/Ad";
//import { AvailableAmounts } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentAmount";
import { mockedContext } from "../../../../../../__mocks__/context/MockContext";
import { TestDBs } from "../../../../../../__mocks__/lib/infrastructure/db/TestDBs";
import { getValuesForNumericEnum } from "@/src/utils/helpers";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { User } from "@/src/modules/users/user/domain/User";
import { FakeAdvertiser } from "../../../../../../__mocks__/lib/modules/user/FakeAdvertiser";
import { FakeAd } from "../../../../../../__mocks__/lib/modules/ads/FakeAd";
import { UniqId } from "@/src/common/domain/UniqId";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { TestStripeDB } from "../../../../../../__mocks__/lib/infrastructure/db/TestStripeDB";
import { PricesPerClick } from "@/src/common/domain/PricesPerClick";

describe("On /api/payments/stripe/campaign/without-pmethod, GIVEN a mocked DB,", () => {
  let testDB: TestDBs;
  let savedStripeModel: Stripe;
  let newAdvertiser: User;
  let newAdvertiserAd: Ad;
  let stripeDB: TestStripeDB;
  let users: User[];
  let ads: Ad[];

  beforeAll(async () => {
    testDB = await TestDBs.setAndInitAll();
    ads = testDB.ads;
    users = testDB.users;
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

  it("WHEN send a non 'PUT' request, THEN status code should be 400", async () => {
    
    const ppc = new PricesPerClick();
    const amount = ppc.getAmounts()[0]
    const body: IApiReqStripePaymentWithoutPMethod = {
      adId: ads[0].id.id,
      budgetItem: amount,
    };
    const { req, res } = mockedContext({ method: "GET", body });

    await apiPayWithoutPMethod(req, res);

    expect(res.statusCode).toBe(400);
  });

  it("WHEN send a valid request without session, THEN status code should be 400", async () => {
    const ppc = new PricesPerClick();
    const amounts = ppc.getAmounts();
    const body: IApiReqStripePaymentWithoutPMethod = {
      adId: ads[0].id.id,
      budgetItem: amounts.length - 1,
    };
    const { req, res } = mockedContext({ method: "PUT", body });

    await apiPayWithoutPMethod(req, res);

    expect(res.statusCode).toBe(400);
  });

  it("WHEN send a not valid budget item, THEN status code should be 400", async () => {
    const body: IApiReqStripePaymentWithoutPMethod = {
      adId: ads[0].id.id,
      budgetItem: 10,
    };
    const { req, res } = mockedContext({ method: "PUT", body });

    userSession.setFromServer({ req, res }, { ...users[0].toPrimitives() });

    await apiPayWithoutPMethod(req, res);

    expect(res.statusCode).toBe(400);
  });

  it("WHEN send request without an adId, THEN status code should be 400", async () => {
    const body: IApiReqStripePaymentWithoutPMethod = {
      adId: "",
      budgetItem: 10,
    };
    const { req, res } = mockedContext({ method: "PUT", body });

    userSession.remove({ req, res });
    userSession.setFromServer({ req, res }, { ...users[0].toPrimitives() });

    await apiPayWithoutPMethod(req, res);

    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send request without an existing ad id for the advertiser id, 
    THEN status code should be 400`, async () => {
    const body: IApiReqStripePaymentWithoutPMethod = {
      adId: ads[0].id.id,
      budgetItem: 0,
    };
    const { req, res } = mockedContext({ method: "PUT", body });

    userSession.remove({ req, res });
    userSession.setFromServer({ req, res }, { ...users[0].toPrimitives() });

    await apiPayWithoutPMethod(req, res);

    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send a request without Stripe Model, 
      THEN status code should be 200, response should have property 'clientSecret' and stripe model should be saved`, async () => {
    const body: IApiReqStripePaymentWithoutPMethod = {
      adId: newAdvertiserAd.id.id,
      budgetItem: 0,
    };
    const ctx = mockedContext({ method: "PUT", body });

    userSession.remove(ctx);
    userSession.setFromServer(ctx, { ...newAdvertiser.toPrimitives() });

    await apiPayWithoutPMethod(ctx.req, ctx.res);
    const stripeModels = await stripeDB.getAll();
    savedStripeModel = stripeModels?.find(
      (model) => model.userId.id === newAdvertiser.id.id
    )!;

    expect(ctx.res.statusCode).toBe(200);
    expect(ctx.res._getJSONData()["clientSecret"]).not.toBeNull();
    expect(savedStripeModel).not.toBeUndefined();
  }, 12000);

  it(`WHEN send request with a saved Stripe Model, 
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

    const body: IApiReqStripePaymentWithoutPMethod = {
      adId: advertiserAd!.id.id,
      budgetItem: 0,
    };
    const ctx = mockedContext({ method: "PUT", body });

    userSession.remove(ctx);
    userSession.setFromServer(ctx, { ...advertiser!.toPrimitives() });

    await apiPayWithoutPMethod(ctx.req, ctx.res);

    expect(ctx.res.statusCode).toBe(200);
    expect(ctx.res._getJSONData()["clientSecret"]).not.toBeNull();
  });
});
