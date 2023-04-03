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
import { PricesPerClick } from "@/src/common/domain/PricesPerClick";
import { StripePayments } from "@/src/modules/payment-methods/stripe/infrastructure/StripePayments";

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

const mock_customers_create = jestFn((): CustomerId => FakeCustomerId.create());

const mock_paymentIntent_confirm = jestFn(
  (id: string): { status: Stripe.PaymentIntent.Status } => {
    if (FakeUniqId.checkIfIdNotExist(id)) {
      return { status: "canceled" };
    } else {
      return { status: "succeeded" };
    }
  }
);

const mock_paymentIntent_create = jestFn(
  (params: IStripePaymentIntentParams): IStripePaymentIntentParams | null => {
    if (FakeUniqId.checkIfIdNotExist(params.customer!)) return null;
    const details = FakePaymentDetails.create({
      id: FakePaymentIntentId.create(),
      ppc: new PricesPerClick(),
    }).toPrimitives();
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

    const details = FakePaymentDetails.create({
      id: new PaymentIntentId(pmId),
      ppc: new PricesPerClick(),
    }).toPrimitives();
    return {
      id: details.id,
      amount: details.amount,
      payment_method: details.paymentMethodId!,
      client_secret: details.clientSecret,
    };
  }
);

const mock_paymentMethods_retrieve = jestFn((id: string) => {
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

type Strp<T = Stripe> = {
  [K in keyof T]: object;
};

type StripeMethods = Partial<Strp<Stripe>>;

export const mockedStripe = jestFn((): StripeMethods => {
  return {
    customers: {
      create: mock_customers_create,
    },
    paymentIntents: {
      confirm: mock_paymentIntent_confirm,
      create: mock_paymentIntent_create,
      retrieve: paymentIntent_retrieve,
    },
    paymentMethods: {
      retrieve: mock_paymentMethods_retrieve,
    },
    webhooks: { constructEvent: jest.fn() },
  };
});
