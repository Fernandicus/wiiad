import { CustomerId } from "@/src/modules/payment-methods/stripe/domain/value-objects/CustomerId";
import {
  IPaymentWithPaymentMethod,
  StripePayments,
} from "@/src/modules/payment-methods/stripe/infrastructure/StripePayments";
import { CreateStripeCustomer } from "@/src/modules/payment-methods/stripe/use-case/CreateStripeCustomer";
import Stripe from "stripe";
import { FakePaymentIntentId } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentIntentId";
import { mockedStripe } from "../../../../../__mocks__/context/MockStripe";
import { mockedStripePayments } from "../../../../../__mocks__/context/MockStripePayments";
import { PaymentStatus } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentStatus";
import { FakePaymentDetails } from "__mocks__/lib/modules/payment-methods/stripe/FakePaymentDetails";
import { PaymentAmount } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentAmount";
import { FakeCustomerId } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakeCustomerId";
import { FakePaymentMethodId } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakePaymentMethodId";
import { UniqId } from "@/src/utils/UniqId";
import { PaymentDetails } from "@/src/modules/payment-methods/stripe/domain/PaymentDetails";
import { CardDetails } from "@/src/modules/payment-methods/stripe/domain/CardDetails";

describe("On CreateStripeCustomer, GIVEN a stripe mocked repo", () => {
  let stripePayments: StripePayments;
  let stripe: Stripe;

  beforeAll(async () => {
    stripe = mockedStripe();
    stripePayments = new StripePayments(stripe);
  });

  it(`WHEN call createCustomer method,
  THEN stripe.customers.create method should be called and a customer id should be returned`, async () => {
    const customerId = await stripePayments.createCustomer();
    expect(stripe.customers.create).toBeCalledWith();
    expect(customerId).toBeInstanceOf(CustomerId);
  });

  it(`WHEN call confirmPaymentIntent method,
  THEN stripe.paymentIntents.confirm method should be called and PaymentStatus Success should be returned`, async () => {
    const id = FakePaymentIntentId.create();
    const status = await stripePayments.confirmPaymentIntent(id);
    expect(stripe.paymentIntents.confirm).toBeCalledWith(id.id);
    expect(status).toBe(PaymentStatus.Success);
  });

  it(`WHEN call confirmPaymentIntent method without a valid id,
  THEN stripe.paymentIntents.confirm method should be called and PaymentStatus Error should be returned`, async () => {
    const id = FakePaymentIntentId.noExist();
    const status = await stripePayments.confirmPaymentIntent(id);
    expect(stripe.paymentIntents.confirm).toBeCalledWith(id.id);
    expect(status).toBe(PaymentStatus.Error);
  });

  it(`WHEN call paymentIntentWithPaymentMethod,
  THEN stripe.paymentIntents.create method should be called and PaymentDetails should be returned`, async () => {
    const paymentWithPM: IPaymentWithPaymentMethod = {
      amount: new PaymentAmount(50000),
      customerId: FakeCustomerId.create(),
      paymentMethod: FakePaymentMethodId.create(),
      metadata: { adId: UniqId.generate(), advertiserId: UniqId.generate() },
    };

    const details = await stripePayments.paymentIntentWithPaymentMethod(
      paymentWithPM
    );
    expect(stripe.paymentIntents.create).toBeCalledWith({
      metadata: paymentWithPM.metadata,
      amount: paymentWithPM.amount.amount,
      currency: "eur",
      customer: paymentWithPM.customerId.id,
      payment_method: paymentWithPM.paymentMethod.id,
    });
    expect(details).toBeInstanceOf(PaymentDetails);
  });

  it(`WHEN call paymentIntentWithPaymentMethod without a valid id,
  THEN null should be returned`, async () => {
    const paymentWithPM: IPaymentWithPaymentMethod = {
      amount: new PaymentAmount(50000),
      customerId: FakeCustomerId.noExist(),
      paymentMethod: FakePaymentMethodId.create(),
      metadata: { adId: UniqId.generate(), advertiserId: UniqId.generate() },
    };

    const details = await stripePayments.paymentIntentWithPaymentMethod(
      paymentWithPM
    );

    expect(details).toBeNull();
  });

  it(`WHEN call paymentIntentWithoutPaymentMethod,
  THEN stripe.paymentIntents.create shold be called and PaymentDetails should be returned`, async () => {
    const paymentWithPM: IPaymentWithPaymentMethod = {
      amount: new PaymentAmount(50000),
      customerId: FakeCustomerId.create(),
      paymentMethod: FakePaymentMethodId.create(),
      metadata: { adId: UniqId.generate(), advertiserId: UniqId.generate() },
    };

    const details = await stripePayments.paymentIntentWithoutPaymentMethod(
      paymentWithPM
    );

    expect(stripe.paymentIntents.create).toBeCalledWith({
      metadata: paymentWithPM.metadata,
      customer: paymentWithPM.customerId.id,
      setup_future_usage: "off_session",
      amount: paymentWithPM.amount.amount,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    expect(details).toBeInstanceOf(PaymentDetails);
  });

  it(`WHEN call paymentIntentWithoutPaymentMethod without a valid id,
  THEN null should be returned`, async () => {
    const paymentWithPM: IPaymentWithPaymentMethod = {
      amount: new PaymentAmount(50000),
      customerId: FakeCustomerId.noExist(),
      paymentMethod: FakePaymentMethodId.create(),
      metadata: { adId: UniqId.generate(), advertiserId: UniqId.generate() },
    };

    const details = await stripePayments.paymentIntentWithPaymentMethod(
      paymentWithPM
    );

    expect(details).toBeNull();
  });

  it(`WHEN call getPaymentIntentDetails,
  THEN stripe.paymentIntents.retrieve should be called with Payment Intent Id and PaymentDetails instance should be returned`, async () => {
    const pi_Id = FakePaymentIntentId.create();
    const details = await stripePayments.getPaymentIntentDetails(pi_Id);
    expect(stripe.paymentIntents.retrieve).toBeCalledWith(pi_Id.id);
    expect(details).toBeInstanceOf(PaymentDetails);
  });

  it(`WHEN call getPaymentIntentDetails with a non existing id,
  THEN getPaymentIntentDetails should return null`, async () => {
    const pi_Id = FakePaymentIntentId.noExist();
    const details = await stripePayments.getPaymentIntentDetails(pi_Id);
    expect(details).toBeNull();
  });

  it(`WHEN call getPaymentMethodDetails,
  THEN stripe.paymentMethods.retrieve should be called with Payment Method Id and CardDetails instance should be returned`, async () => {
    const pm_Id = FakePaymentMethodId.create();
    const details = await stripePayments.getPaymentMethodDetails(pm_Id);
    expect(stripe.paymentMethods.retrieve).toBeCalledWith(pm_Id.id);
    expect(details).toBeInstanceOf(CardDetails);
  });

  it(`WHEN call getPaymentMethodDetails,
  THEN stripe.paymentMethods.retrieve should be called with Payment Method Id and CardDetails instance should be returned`, async () => {
    const pm_Id = FakePaymentMethodId.noExist();
    const details = await stripePayments.getPaymentMethodDetails(pm_Id);
    expect(details).toBeNull();
  });
});
