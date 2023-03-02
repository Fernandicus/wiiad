import { StripePayments } from "@/src/modules/payment-methods/stripe/infrastructure/StripePayments";
import { GetPaymentDetails } from "@/src/modules/payment-methods/stripe/use-case/GetPaymentDetails";
import { mockedStripePayments } from "../../../../../__mocks__/context/MockStripePayments";
import { FakePaymentMethodId } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentMethodId";
import { ErrorGettingPaymentDetails } from "@/src/modules/payment-methods/stripe/domain/errors/ErrorGettingPaymentDetails";
import { FakePaymentIntentId } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentIntentId";

jest.mock("@/src/modules/payment-methods/stripe/infrastructure/StripePayments");

describe("On GetPaymentDetails, GIVEN a stripe mocked repo", () => {
  let getPaymentDetails: GetPaymentDetails;
  let stripePayments: StripePayments;

  beforeAll(async () => {
    stripePayments = mockedStripePayments();
    getPaymentDetails = new GetPaymentDetails(stripePayments);
  });

  it(`WHEN call fromPaymentMethod,
  THEN StripePayments getPaymentMethodDetails method should be called with Payment Method id`, async () => {
    const pmId = FakePaymentMethodId.create();
    const cardDetails = await getPaymentDetails.fromPaymentMethod(pmId);
    expect(stripePayments.getPaymentMethodDetails).toBeCalledWith(pmId);
    expect(cardDetails.paymentMethodId).toEqual(pmId);
  });

  it(`WHEN call fromPaymentMethod with a non existing id,
  THEN an error should be thrown`, async () => {
    const pmId = FakePaymentMethodId.noExist();
    expect(getPaymentDetails.fromPaymentMethod(pmId)).rejects.toThrowError(
      ErrorGettingPaymentDetails
    );
  });

  it(`WHEN call fromPaymentIntent,
  THEN StripePayments getPaymentIntentDetails method should be called with Payment Intent id`, async () => {
    const piId = FakePaymentIntentId.create();
    const paymentDetails = await getPaymentDetails.fromPaymentIntent(piId);
    expect(stripePayments.getPaymentIntentDetails).toBeCalledWith(piId);
    expect(paymentDetails.id).toEqual(piId);
  });

  it(`WHEN call fromPaymentIntent with a non existing id,
  THEN an error should be thrown`, async () => {
    const piId = FakePaymentIntentId.noExist();
    expect(getPaymentDetails.fromPaymentIntent(piId)).rejects.toThrowError(
      ErrorGettingPaymentDetails
    );
  });
});
