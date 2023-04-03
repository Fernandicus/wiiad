import { Ad } from "@/src/modules/ad/domain/Ad";
//import { AvailableAmounts } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentAmount";
import { mockedContext } from "../../../../../../__mocks__/context/MockContext";
import { TestDBs } from "../../../../../../__mocks__/lib/infrastructure/db/TestDBs";
import apiPayWithPMethod, {
  IApiReqStripePaymentWithPMethod,
} from "@/pages/api/v1/payments/stripe/campaign/with-pmethod";
import { FakePaymentMethodId } from "../../../../../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentMethodId";
import { getValuesForNumericEnum } from "@/src/utils/helpers";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { User } from "@/src/modules/users/user/domain/User";
import { FakeAdvertiser } from "../../../../../../__mocks__/lib/modules/user/FakeAdvertiser";
import { FakeAd } from "../../../../../../__mocks__/lib/modules/ads/FakeAd";
import { UniqId } from "@/src/common/domain/UniqId";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { TestStripeDB } from "../../../../../../__mocks__/lib/infrastructure/db/TestStripeDB";
import { PricesPerClick } from "@/src/common/domain/PricesPerClick";

describe("On /api/payments/stripe/campaign/with-pmethod, GIVEN a mocked DB:", () => {
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
  },12000);

  it("WHEN send a non 'PUT' request, THEN status code should be 400", async () => {
    const ad = testDB.ads[0];
    const ppc = new PricesPerClick();
    const amount = ppc.getAmounts()[0];
    const body: IApiReqStripePaymentWithPMethod = {
      adId: ad.id.id,
      budgetItem: amount,
      paymentMethod: FakePaymentMethodId.create().id,
    };
    const { req, res } = mockedContext({ method: "GET", body });

    await apiPayWithPMethod(req, res);

    expect(res.statusCode).toBe(400);
  },12000);

  it("WHEN send a valid request without session, THEN status code should be 400", async () => {
    const ad = testDB.ads[0];
    const ppc = new PricesPerClick();
    const amounts = ppc.getAmounts()
    const body: IApiReqStripePaymentWithPMethod = {
      adId: ad.id.id,
      budgetItem: amounts.length - 1,
      paymentMethod: FakePaymentMethodId.create().id,
    };
    const { req, res } = mockedContext({ method: "PUT", body });

    await apiPayWithPMethod(req, res);

    expect(res.statusCode).toBe(400);
  },12000);

  it("WHEN send a not valid budget item, THEN status code should be 400", async () => {
    const ad = testDB.ads[0];
    const user = testDB.users[0];
    const body: IApiReqStripePaymentWithPMethod = {
      adId: ad.id.id,
      budgetItem: 10,
      paymentMethod: FakePaymentMethodId.create().id,
    };
    const { req, res } = mockedContext({ method: "PUT", body });

    userSession.setFromServer({ req, res }, { ...user.toPrimitives() });

    await apiPayWithPMethod(req, res);

    expect(res.statusCode).toBe(400);
  },12000);

  it("WHEN send request without an adId, THEN status code should be 400", async () => {
    const user = testDB.users[0];
    const body: IApiReqStripePaymentWithPMethod = {
      adId: "",
      budgetItem: 10,
      paymentMethod: FakePaymentMethodId.create().id,
    };
    const { req, res } = mockedContext({ method: "PUT", body });

    userSession.remove({ req, res });
    userSession.setFromServer({ req, res }, { ...user.toPrimitives() });

    await apiPayWithPMethod(req, res);

    expect(res.statusCode).toBe(400);
  },12000);

  it(`WHEN send request without an existing ad id for the advertiser id, 
  THEN status code should be 400`, async () => {
    const ad = testDB.ads[0];
    const user = testDB.users[0];
    const body: IApiReqStripePaymentWithPMethod = {
      adId: ad.id.id,
      budgetItem: 0,
      paymentMethod: FakePaymentMethodId.create().id,
    };
    const { req, res } = mockedContext({ method: "PUT", body });

    userSession.remove({ req, res });
    userSession.setFromServer({ req, res }, { ...user.toPrimitives() });

    await apiPayWithPMethod(req, res);

    expect(res.statusCode).toBe(400);
  },12000);

  it(`- WHEN send a request without a valid Payment Method, 
  THEN status code should be 400`, async () => {
    const body: IApiReqStripePaymentWithPMethod = {
      adId: newAdvertiserAd.id.id,
      budgetItem: 0,
      paymentMethod: FakePaymentMethodId.noExist().id,
    };
    const ctx = mockedContext({ method: "PUT", body });

    userSession.remove(ctx);
    userSession.setFromServer(ctx, { ...newAdvertiser.toPrimitives() });

    const { req, res } = ctx;
    await apiPayWithPMethod(req, res);

    expect(res.statusCode).toBe(400);
  },12000);

  it(`- WHEN send a request without Stripe Model, 
  THEN status code should be 200`, async () => {
    const body: IApiReqStripePaymentWithPMethod = {
      adId: newAdvertiserAd.id.id,
      budgetItem: 0,
      paymentMethod: FakePaymentMethodId.create().id,
    };
    const ctx = mockedContext({ method: "PUT", body });

    userSession.remove(ctx);
    userSession.setFromServer(ctx, { ...newAdvertiser.toPrimitives() });

    await apiPayWithPMethod(ctx.req, ctx.res);
    const stripeModels = await stripeDB.getAll();
    savedStripeModel = stripeModels?.find(
      (model) => model.userId.id === newAdvertiser.id.id
    )!;

    expect(ctx.res.statusCode).toBe(200);
  },12000);

  it(`- WHEN send a request with a saved Stripe Model, 
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

    const body: IApiReqStripePaymentWithPMethod = {
      adId: advertiserAd!.id.id,
      budgetItem: 0,
      paymentMethod: FakePaymentMethodId.create().id,
    };
    const ctx = mockedContext({ method: "PUT", body });

    userSession.remove(ctx);
    userSession.setFromServer(ctx, { ...advertiser!.toPrimitives() });

    await apiPayWithPMethod(ctx.req, ctx.res);

    expect(ctx.res.statusCode).toBe(200);
  },12000);
});
