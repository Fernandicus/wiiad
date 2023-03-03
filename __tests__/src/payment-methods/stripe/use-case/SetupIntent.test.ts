import { UniqId } from "@/src/utils/UniqId";
import { SetupIntent } from "@/src/modules/payment-methods/stripe/use-case/SetupIntent";
import { StripePayments } from "@/src/modules/payment-methods/stripe/infrastructure/StripePayments";
import { mockedStripePayments } from "../../../../../__mocks__/context/MockStripePayments";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { FakeStripe } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakeStripe";
import { SetupIntentId } from "@/src/modules/payment-methods/stripe/domain/value-objects/SetupIntentId";
import { StripeClientSecret } from "@/src/modules/payment-methods/stripe/domain/value-objects/StripeClientSecret";

describe("On SetupIntent, GIVEN a stripe mocked repo", () => {
  let setupIntent: SetupIntent;
  let mockedSPayments: StripePayments;
  let stripe: Stripe;

  beforeAll(async () => {
    stripe = FakeStripe.create(UniqId.new());
    mockedSPayments = mockedStripePayments();
    setupIntent = new SetupIntent(mockedSPayments);
  });

  it(`WHEN call findByUserId method, THEN repo should be called with stripe and stripe should be found`, async () => {
    const resp = await setupIntent.create(stripe.customerId);
    expect(mockedSPayments.setupIntent).toBeCalledWith(stripe.customerId);
    expect(resp.id).toBeInstanceOf(SetupIntentId);
    expect(resp.client_secret).toBeInstanceOf(StripeClientSecret);
  });
});
