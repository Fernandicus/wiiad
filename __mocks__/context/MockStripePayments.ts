import { CardDetails } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { PaymentDetails } from "@/src/modules/payment-methods/stripe/domain/PaymentDetails";
import { CustomerId } from "@/src/modules/payment-methods/stripe/domain/value-objects/CustomerId";
import { PaymentStatus } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentStatus";
import {
  IPaymentWithoutPaymentMethod,
  IPaymentWithPaymentMethod,
  IValidatedPaymentData,
  StripePayments,
} from "@/src/modules/payment-methods/stripe/infrastructure/StripePayments";
import { FakeCustomerId } from "../../__mocks__/lib/modules/payment-methods/stripe/FakeCustomerId";
import { FakeCardDetails } from "../../__mocks__/lib/modules/payment-methods/stripe/FakeCardDetails";
import { FakePaymentDetails } from "../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentDetails";
import { FakePaymentIntentId } from "../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentIntentId";
import { FakePaymentMethodId } from "../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentMethodId";
import { FakeWebhookEvent } from "__mocks__/lib/modules/payment-methods/stripe/FakeWebhookEvent";
import { FakeCampaign } from "__mocks__/lib/modules/campaign/FakeCampaign";
import { CampaignBudget } from "@/src/modules/campaign/domain/value-objects/Budget";
import { Balance } from "@/src/common/domain/Balance";
import { FakeUniqId } from "__mocks__/lib/domain/FakeUniqId";
import { CardBrand } from "@/src/modules/payment-methods/stripe/domain/value-objects/CardBrand";
import { ExpMonth } from "@/src/modules/payment-methods/stripe/domain/value-objects/ExpMonth";
import { ExpYear } from "@/src/modules/payment-methods/stripe/domain/value-objects/ExpYear";
import { Last4 } from "@/src/modules/payment-methods/stripe/domain/value-objects/Last4";
import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";

interface IMockPaymentWithPM extends IPaymentWithPaymentMethod {
  paymentMethod: FakePaymentMethodId;
}

interface IMockPaymentWithPM extends IPaymentWithoutPaymentMethod {
  customerId: FakeCustomerId;
}

const jestFn = <T, R>(callBack: (vals: T) => R) => {
  return jest.fn().mockImplementation(callBack);
};

const getPaymentMethodDetails = jestFn(
  (fakePmId: FakePaymentMethodId): CardDetails | null => {
    if (fakePmId.checkIfNotExsits()) return null;
    return FakeCardDetails.withGivenPaymentId(fakePmId);
  }
);

const getPaymentIntentDetails = jestFn(
  (piId: FakePaymentIntentId): PaymentDetails | null => {
    if (piId.checkIfNotExsits()) return null;
    return FakePaymentDetails.create(piId);
  }
);

const confirmPaymentIntent = jestFn(
  (piId: FakePaymentIntentId): PaymentStatus => {
    if (piId.checkIfNotExsits()) return PaymentStatus.Error;
    return PaymentStatus.Success;
  }
);

const paymentIntentWithPaymentMethod = jestFn(
  (params: IMockPaymentWithPM): PaymentDetails | null => {
    if (params.paymentMethod.checkIfNotExsits()) return null;
    return FakePaymentDetails.create(FakePaymentIntentId.create());
  }
);

const paymentIntentWithoutPaymentMethod = jestFn(
  (params: IMockPaymentWithPM): PaymentDetails | null => {
    if (params.customerId.checkIfNotExsits()) return null;
    return FakePaymentDetails.create(FakePaymentIntentId.create());
  }
);

const createCustomer = jestFn((): CustomerId => FakeCustomerId.create());

const validateWebhookEvent = jestFn(
  (params: { payload: string; header: string }): IValidatedPaymentData => {
    const parsedPayload = JSON.parse(params.payload) as FakeWebhookEvent;
    const object = parsedPayload.data.object;
    const card =
      parsedPayload.data.object.charges.data[0].payment_method_details.card;
    return {
      budget: new CampaignBudget({
        balance: new Balance(object.amount),
        clicks: 1000,
      }),
      card: new CardDetails({
        brand: new CardBrand(card.brand),
        expMonth: new ExpMonth(card.exp_month),
        expYear: new ExpYear(card.exp_year),
        last4: new Last4(card.last4),
        paymentMethodId: new PaymentMethodId(object.payment_method),
      }),
      metadata: object.metadata,
    };
  }
);

export const mockedStripePayments = jestFn(() => {
  return {
    getPaymentMethodDetails,
    getPaymentIntentDetails,
    confirmPaymentIntent,
    paymentIntentWithPaymentMethod,
    paymentIntentWithoutPaymentMethod,
    createCustomer,
    validateWebhookEvent,
  };
});
