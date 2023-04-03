import paymentSuccess from "@/pages/api/v1/payments/stripe/campaign/payment-success";
import { FakeWebhookEvent } from "../../../../../../__mocks__/lib/modules/payment-methods/stripe/FakeWebhookEvent";
import { mockedContext } from "../../../../../../__mocks__/context/MockContext";
import { FakeCardDetails } from "../../../../../../__mocks__/lib/modules/payment-methods/stripe/FakeCardDetails";
import { UniqId } from "@/src/common/domain/UniqId";
import { FakePaymentDetails } from "../../../../../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentDetails";
import { FakePaymentIntentId } from "../../../../../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentIntentId";
import { TestDBs } from "../../../../../../__mocks__/lib/infrastructure/db/TestDBs";
import { IStripeMetadata } from "@/src/modules/payment-methods/stripe/domain/interfaces/IStripeMetadata";
import { FakePricePerClick } from "../../../../../../__mocks__/lib/modules/payment-methods/stripe/FakePricePerClick";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { TestCampaignDB } from "../../../../../../__mocks__/lib/infrastructure/db/TestCampaignDB";

describe("On /api/payments/stripe/campaign/payment-success, GIVEN a mocked DB", () => {
  let db: TestDBs;
  let stripe: Stripe;
  let campaignsDB: TestCampaignDB;

  beforeAll(async () => {
    db = await TestDBs.setAndInitAll();
    stripe = db.stripes[0];
    campaignsDB = db.dbs.campaigns;
  });

  it(`WHEN send 'GET' request, 
  THEN response should be status code 400`, async () => {
    const { req, res } = mockedContext({
      method: "GET",
    });

    await paymentSuccess(req, res);
    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send 'POST' request with an invalid webhook event type, 
  THEN response should be status code 400`, async () => {
    const metadata: IStripeMetadata = {
      adId: UniqId.generate(),
      advertiserId: stripe.userId.id,
    };
    const paymentDetails = FakePaymentDetails.createWithRandomPaymentDetails(
      FakePaymentIntentId.create()
    );

    const { req, res } = mockedContext({
      method: "POST",
      body: FakeWebhookEvent.create({
        type: "payment_intent.created",
        metadata,
        cardDetails: FakeCardDetails.create(),
        paymentDetails,
      }),
    });

    await paymentSuccess(req, res);
    expect(res.statusCode).toBe(400);
  });

  it.only(`WHEN send 'POST' request with a valid webhook event type and existing stripe customer user, 
  THEN response should be status code 200`, async () => {
    const ppc = FakePricePerClick.selectRandomFromList();

    const metadata: IStripeMetadata = {
      adId: UniqId.generate(),
      advertiserId: stripe.userId.id,
    };
    const paymentDetails = FakePaymentDetails.create({
      id: FakePaymentIntentId.create(),
      ppc,
    });

    const { req, res } = mockedContext({
      method: "POST",
      body: FakeWebhookEvent.create({
        type: "payment_intent.succeeded",
        metadata,
        cardDetails: FakeCardDetails.create(),
        paymentDetails,
      }),
    });

    await paymentSuccess(req, res);

    const campaignFound = await campaignsDB.findByAdId(
      new UniqId(metadata.adId)
    );
    const campaignBudget = campaignFound?.budget.toPrimitives();

    expect(res.statusCode).toBe(200);
    expect(campaignBudget?.clicks).toEqual(ppc.selectedClicks);
    expect(campaignBudget?.balance).toEqual(ppc.selectedAmount);
  });
});
