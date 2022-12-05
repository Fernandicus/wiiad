import { CardDetails } from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import { PaymentDetails } from "@/src/modules/payment-methods/stripe/domain/PaymentDetails";
import { FakeCardDetails } from "../../__mocks__/lib/modules/payment-methods/stripe/FakeCardDetails";
import { FakePaymentDetails } from "../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentDetails";
import { FakePaymentIntentId } from "../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentIntentId";
import { FakePaymentMethodId } from "../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentMethodId";

export const mockedStripePayments = jest.fn().mockImplementation(() => {
  return {
    getPaymentMethodDetails: jest
      .fn()
      .mockImplementation(
        (fakePmId: FakePaymentMethodId): CardDetails | null => {
          if (fakePmId.checkIfExsits()) return null;
          return FakeCardDetails.withGivenPaymentId(fakePmId);
        }
      ),
    getPaymentIntentDetails: jest
      .fn()
      .mockImplementation(
        (piId: FakePaymentIntentId): PaymentDetails | null => {
          if (piId.checkIfExsits()) return null;
          return FakePaymentDetails.create(piId);
        }
      ),
  };
});
