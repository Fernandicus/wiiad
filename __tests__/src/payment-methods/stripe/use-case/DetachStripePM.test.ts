import { UniqId } from "@/src/common/domain/UniqId";
import { SetupIntent } from "@/src/modules/payment-methods/stripe/use-case/SetupIntent";
import { StripePayments } from "@/src/modules/payment-methods/stripe/infrastructure/StripePayments";
import { mockedStripePayments } from "../../../../../__mocks__/context/MockStripePayments";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { FakeStripe } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakeStripe";
import { SetupIntentId } from "@/src/modules/payment-methods/stripe/domain/value-objects/SetupIntentId";
import { StripeClientSecret } from "@/src/modules/payment-methods/stripe/domain/value-objects/StripeClientSecret";
import { DetachStripePM } from "@/src/modules/payment-methods/stripe/use-case/DetachStripePM";

describe("On DetachStripePM, GIVEN a stripe mocked repo", () => {
  let detachPM: DetachStripePM;
  let mockedSPayments: StripePayments;
  let stripe: Stripe;

  beforeAll(async () => {
    stripe = FakeStripe.create(UniqId.new());
    mockedSPayments = mockedStripePayments();
    detachPM = new DetachStripePM(mockedSPayments);
  });

  it(`WHEN call detachPaymentMethod method, THEN repo should be called with stripe and stripe should be found`, async () => {
    const pmId = stripe.paymentMethods[0].paymentMethodId;
    await detachPM.detach(pmId);

    expect(mockedSPayments.detachPaymentMethod).toBeCalledWith(pmId);
  });
});
