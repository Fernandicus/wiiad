import { CardDetails } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { PaymentDetails } from "@/src/modules/payment-methods/stripe/domain/PaymentDetails";
import { CustomerId } from "@/src/modules/payment-methods/stripe/domain/value-objects/CustomerId";
import { PaymentStatus } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentStatus";
import {
  IPaymentWithoutPaymentMethod,
  IPaymentWithPaymentMethod,
} from "@/src/modules/payment-methods/stripe/infrastructure/StripePayments";
import { FakeCustomerId } from "../../__mocks__/lib/modules/payment-methods/stripe/FakeCustomerId";
import { FakeCardDetails } from "../../__mocks__/lib/modules/payment-methods/stripe/FakeCardDetails";
import { FakePaymentDetails } from "../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentDetails";
import { FakePaymentIntentId } from "../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentIntentId";
import { FakePaymentMethodId } from "../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentMethodId";

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

export const mockedStripePayments = jestFn(() => {
  return {
    getPaymentMethodDetails,
    getPaymentIntentDetails,
    confirmPaymentIntent,
    paymentIntentWithPaymentMethod,
    paymentIntentWithoutPaymentMethod,
    createCustomer,
  };
});
