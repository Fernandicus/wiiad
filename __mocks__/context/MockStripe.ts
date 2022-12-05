import { ICardDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";
import { faker } from "@faker-js/faker";
import Stripe from "stripe";
import { FakeCardDetails } from "../../__mocks__/lib/modules/payment-methods/stripe/FakeCardDetails";

export const mockedStripe = (): Stripe => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-08-01",
  });

  stripe.customers.create = jest.fn().mockImplementationOnce(() => {
    return {
      id: "cus_" + faker.random.numeric(10),
    };
  });

  stripe.paymentMethods.retrieve = jest
    .fn()
    .mockImplementationOnce((id: string) => {
      const pmId = new PaymentMethodId(id);
      const fakeCardDetails =
        FakeCardDetails.withGivenPaymentId(pmId).toPrimitives();
      return {
        id: fakeCardDetails.paymentMethodId,
        card: {
          exp_month: fakeCardDetails.expMonth,
          exp_year: fakeCardDetails.expYear,
          brand: fakeCardDetails.brand,
          last4: fakeCardDetails.last4,
        } as Stripe.PaymentMethod.Card,
      };
    });

  return stripe;
};
