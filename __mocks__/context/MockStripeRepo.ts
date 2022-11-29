import { IStripeRepo } from "@/src/modules/payment-methods/stripe/domain/interfaces/IStripeRepo";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";

import { FakeStripe } from "../../__mocks__/lib/modules/payment-methods/stripe/FakeStripe";

export const mockedStripeRepo = (stripeToFind: Stripe): IStripeRepo => {
  const newStripes = FakeStripe.createManyRandom();
  const stripes = [...newStripes, stripeToFind];
  return {
    save: jest.fn(),
    findByUserId: jest.fn().mockImplementation((uniqId): Stripe | null => {
      const stripeFound = stripes.find(
        (stripe) => stripe.userId.id == uniqId.id
      );
      if (!stripeFound) return null;
      return stripeFound;
    }),
  };
};
