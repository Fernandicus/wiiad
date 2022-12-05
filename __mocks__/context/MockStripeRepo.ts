import { IStripeRepo } from "@/src/modules/payment-methods/stripe/domain/interfaces/IStripeRepo";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { UniqId } from "@/src/utils/UniqId";
import { FakeUniqId } from "../../__mocks__/lib/domain/FakeUniqId";

import { FakeStripe } from "../../__mocks__/lib/modules/payment-methods/stripe/FakeStripe";

export const mockedStripeRepo = (): IStripeRepo => {
  return {
    save: jest.fn(),
    addNewCardDetails: jest.fn(),
    findByUserId: jest
      .fn()
      .mockImplementation((uniqId: FakeUniqId): Stripe | null => {
        if (uniqId.checkIfNotExsits()) return null;
        return FakeStripe.create(uniqId);
      }),
  };
};
