import {
  IPaymentWithoutPaymentMethod,
  IPaymentWithPaymentMethod,
  StripePayments,
} from "@/src/modules/payment-methods/stripe/infrastructure/StripePayments";
import { mockedStripePayments } from "../../../../../__mocks__/context/MockStripePayments";
import { PaymentIntent } from "@/src/modules/payment-methods/stripe/use-case/PaymentIntent";
import { FakePaymentIntentId } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentIntentId";
import { ErrorPaymentIntent } from "@/src/modules/payment-methods/stripe/domain/errors/ErrorPaymentIntent";
import { PaymentAmount } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentAmount";
import { CustomerId } from "@/src/modules/payment-methods/stripe/domain/value-objects/CustomerId";
import { FakePaymentMethodId } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentMethodId";
import { UniqId } from "@/src/utils/UniqId";
import { PaymentDetails } from "@/src/modules/payment-methods/stripe/domain/PaymentDetails";
import { FakeCustomerId } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakeCustomerId";

jest.mock("@/src/modules/payment-methods/stripe/infrastructure/StripePayments");

describe("On PaymentIntent, GIVEN a stripe mocked repo", () => {
  let paymentIntent: PaymentIntent;
  let mockStripePayments: StripePayments;

  beforeAll(async () => {
    mockStripePayments = mockedStripePayments();
    paymentIntent = new PaymentIntent(mockStripePayments);
  });

  it(`WHEN call confirm method,
  THEN Stripe Payments confirmPaymentIntent method should be called with payment intent id`, async () => {
    const piId = FakePaymentIntentId.create();
    await paymentIntent.confirm(piId);
    expect(mockStripePayments.confirmPaymentIntent).toBeCalledWith(piId);
  });

  it(`WHEN call confirm method with a noExisting payment intent id,
  THEN an ErrorPaymentIntent should be thrown`, async () => {
    const piId = FakePaymentIntentId.noExist();
    expect(paymentIntent.confirm(piId)).rejects.toThrowError(
      ErrorPaymentIntent
    );
  });

  it(`WHEN call withPaymentMethod method,
  THEN PaymentDetails should be returned and stripePayments should be called with params`, async () => {
    const pmId = FakePaymentMethodId.create();
    const params: IPaymentWithPaymentMethod = {
      paymentMethod: pmId,
      customerId: new CustomerId("cus_123"),
      amount: new PaymentAmount(5000),
      metadata: { adId: UniqId.generate(), advertiserId: UniqId.generate() },
    };
    const details = await paymentIntent.withPaymentMethod(params);

    expect(mockStripePayments.paymentIntentWithPaymentMethod).toBeCalledWith(
      params
    );
    expect(details).toBeInstanceOf(PaymentDetails);
  });

  it(`WHEN call withPaymentMethod method without a valid Pament Method,
  THEN an Error should be thrown`, async () => {
    const pmId = FakePaymentMethodId.noExist();
    const params: IPaymentWithPaymentMethod = {
      paymentMethod: pmId,
      customerId: new CustomerId("cus_123"),
      amount: new PaymentAmount(5000),
      metadata: { adId: UniqId.generate(), advertiserId: UniqId.generate() },
    };
    expect(paymentIntent.withPaymentMethod(params)).rejects.toThrowError(
      ErrorPaymentIntent
    );
  });

  it(`WHEN call withoutPaymentMethod method,
  THEN PaymentDetails should be returned and stripePayments should be called with params`, async () => {
    const params: IPaymentWithoutPaymentMethod = {
      customerId: FakeCustomerId.create(),
      amount: new PaymentAmount(5000),
      metadata: { adId: UniqId.generate(), advertiserId: UniqId.generate() },
    };

    const details = await paymentIntent.withoutPaymentMethod(params);

    expect(mockStripePayments.paymentIntentWithoutPaymentMethod).toBeCalledWith(
      params
    );
    expect(details).toBeInstanceOf(PaymentDetails);
  });

  it(`WHEN call withoutPaymentMethod method without a valid Customer Id,
  THEN PaymentDetails should be returned and stripePayments should be called with params`, async () => {
    const params: IPaymentWithoutPaymentMethod = {
      customerId: FakeCustomerId.noExist(),
      amount: new PaymentAmount(5000),
      metadata: { adId: UniqId.generate(), advertiserId: UniqId.generate() },
    };

    expect(paymentIntent.withoutPaymentMethod(params)).rejects.toThrowError(
      ErrorPaymentIntent
    );
  });
});
