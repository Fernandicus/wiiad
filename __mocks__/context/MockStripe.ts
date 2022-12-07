import { ICardDetailsPrimitives } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { CustomerId } from "@/src/modules/payment-methods/stripe/domain/value-objects/CustomerId";
import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";
import { faker } from "@faker-js/faker";
import Stripe from "stripe";
import { FakeCustomerId } from "../../__mocks__/lib/modules/payment-methods/stripe/FakeCustomerId";
import { FakeCardDetails } from "../../__mocks__/lib/modules/payment-methods/stripe/FakeCardDetails";
import { FakePaymentIntentId } from "../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentIntentId";
import { PaymentStatus } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentStatus";
import { UniqId } from "@/src/utils/UniqId";
import { FakeUniqId } from "../../__mocks__/lib/domain/FakeUniqId";
import { FakePaymentDetails } from "../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentDetails";
import { IPaymentWithPaymentMethod } from "@/src/modules/payment-methods/stripe/infrastructure/StripePayments";
import { PaymentDetails } from "@/src/modules/payment-methods/stripe/domain/PaymentDetails";
import { FakePaymentMethodId } from "__mocks__/lib/modules/payment-methods/stripe/FakePaymentMethodId";
import { PaymentIntentId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentIntentId";

interface IStripePaymentIntentParams {
  id?: string;
  metadata?: object;
  amount?: number;
  currency?: string;
  customer?: string;
  payment_method?: string;
  setup_future_usage?: string;
  automatic_payment_methods?: {
    enabled: boolean;
  };
  client_secret?: string;
}

interface IStripeCardDetails {
  exp_month: number;
  exp_year: number;
  brand: string;
  last4: string;
}

const jestFn = <T, R>(callBack: (vals: T) => R) => {
  return jest.fn().mockImplementation(callBack);
};

const customers_create = jestFn((): CustomerId => FakeCustomerId.create());

const paymentIntent_confirm = jestFn(
  (id: string): { status: Stripe.PaymentIntent.Status } => {
    if (FakeUniqId.checkIfIdNotExist(id)) {
      return { status: "canceled" };
    } else {
      return { status: "succeeded" };
    }
  }
);

const paymentIntent_create = jestFn(
  (params: IStripePaymentIntentParams): IStripePaymentIntentParams | null => {
    if (FakeUniqId.checkIfIdNotExist(params.customer!)) return null;
    const details = FakePaymentDetails.create(
      FakePaymentIntentId.create()
    ).toPrimitives();
    return {
      id: details.id,
      amount: details.amount,
      payment_method: details.paymentMethodId!,
      client_secret: details.clientSecret!,
    };
  }
);

const paymentIntent_retrieve = jestFn(
  (pmId: string): IStripePaymentIntentParams | null => {
    if (FakeUniqId.checkIfIdNotExist(pmId)) return null;

    const details = FakePaymentDetails.create(
      new PaymentIntentId(pmId)
    ).toPrimitives();
    return {
      id: details.id,
      amount: details.amount,
      payment_method: details.paymentMethodId!,
      client_secret: details.clientSecret,
    };
  }
);

const paymentMethods_retrieve = jestFn((id: string) => {
  if (FakeUniqId.checkIfIdNotExist(id)) return null;
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
    } as IStripeCardDetails,
  };
});

export const mockedStripe = jestFn(() => {
  return {
    customers: {
      create: customers_create,
    },
    paymentIntents: {
      confirm: paymentIntent_confirm,
      create: paymentIntent_create,
      retrieve: paymentIntent_retrieve,
    },
    paymentMethods: {
      retrieve: paymentMethods_retrieve,
    },
  };
});

/* 
(): Stripe => {
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
 */
