import paymentSuccess from "@/pages/api/v1/payments/stripe/payment-success";
import { FakeWebhookEvent } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakeWebhookEvent";
import { mockedContext } from "../../../../../__mocks__/context/MockContext";
import { FakeCardDetails } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakeCardDetails";
import { UniqId } from "@/src/utils/UniqId";
import { FakePaymentDetails } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentDetails";
import { FakePaymentIntentId } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentIntentId";
import { TestDBs } from "../../../../../__mocks__/lib/infrastructure/db/TestDBs";
import { IStripeMetadata } from "@/src/modules/payment-methods/stripe/domain/interfaces/IStripeMetadata";

describe("On /api/payments/stripe/payment-success, GIVEN a mocked DB", () => {
  let db: TestDBs;

  beforeAll(async () => {
    db = await TestDBs.setAndInitAll();
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
      advertiserId: db.stripes[0].userId.id,
    };

    const { req, res } = mockedContext({
      method: "POST",
      body: FakeWebhookEvent.create({
        type: "payment_intent.created",
        metadata,
        cardDetails: FakeCardDetails.create(),
        paymentDetails: FakePaymentDetails.create(FakePaymentIntentId.create()),
      }),
    });

    await paymentSuccess(req, res);
    expect(res.statusCode).toBe(400);
  });

  it(`WHEN send 'POST' request with a valid webhook event type and existing stripe customer user, 
  THEN response should be status code 200`, async () => {
    const metadata: IStripeMetadata = {
      adId: UniqId.generate(),
      advertiserId: db.stripes[0].userId.id,
    };

    const { req, res } = mockedContext({
      method: "POST",
      body: FakeWebhookEvent.create({
        type: "payment_intent.succeeded",
        metadata,
        cardDetails: FakeCardDetails.create(),
        paymentDetails: FakePaymentDetails.create(FakePaymentIntentId.create()),
      }),
    });

    await paymentSuccess(req, res);
    expect(res.statusCode).toBe(200);
  });
});
