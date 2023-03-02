import { StripePayments } from "@/src/modules/payment-methods/stripe/infrastructure/StripePayments";
import { mockedStripePayments } from "../../../../../__mocks__/context/MockStripePayments";
import { PaymentSucceeded } from "@/src/modules/payment-methods/stripe/use-case/PaymentSucceeded";
import { FakeWebhookEvent } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakeWebhookEvent";

describe("On PaymentSuceeded, GIVEN a stripe mocked repo", () => {
  let paymentSucceeded: PaymentSucceeded;
  let mockStripePayments: StripePayments;

  beforeAll(async () => {
    mockStripePayments = mockedStripePayments();
    paymentSucceeded = new PaymentSucceeded(mockStripePayments);
  });

  it(`WHEN send webhook payload,
    THEN returned data should be the same that the payload`, async () => {
    const payload = FakeWebhookEvent.createRandom("payment_intent.succeeded");

    const object = payload.data.object;
    const card =
      payload.data.object.charges.data[0].payment_method_details.card;

    const validatedData = await paymentSucceeded.validateWebhook({
      header: "stripe-header",
      payload: payload.stringify(),
    });

    expect(validatedData.budget.balance.total).toEqual(object.amount);
    expect(validatedData.card.paymentMethodId.id).toEqual(
      object.payment_method
    );
    expect(validatedData.card.last4.digits).toEqual(card.last4);
    expect(validatedData.card.brand.brand).toEqual(card.brand);
    expect(validatedData.card.expMonth.month).toEqual(card.exp_month);
    expect(validatedData.card.expYear.year).toEqual(card.exp_year);
  });
});
