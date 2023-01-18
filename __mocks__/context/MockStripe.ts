import { CustomerId } from "@/src/modules/payment-methods/stripe/domain/value-objects/CustomerId";
import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";
import Stripe from "stripe";
import { FakeCustomerId } from "../../__mocks__/lib/modules/payment-methods/stripe/FakeCustomerId";
import { FakeCardDetails } from "../../__mocks__/lib/modules/payment-methods/stripe/FakeCardDetails";
import { FakePaymentIntentId } from "../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentIntentId";
import { FakeUniqId } from "../../__mocks__/lib/domain/FakeUniqId";
import { FakePaymentDetails } from "../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentDetails";
import { PaymentIntentId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentIntentId";
import { FakeWebhookEvent } from "../../__mocks__/lib/modules/payment-methods/stripe/FakeWebhookEvent";

type StripeEventType =
  | "payment_intent.succeeded"
  | "payment_intent.cancelled"
  | "payment_intent.created";

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

const jestFn = <R>(callBack: (...vals: any) => R) => {
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
    webhooks: { constructEvent: jest.fn() },
  };
});
