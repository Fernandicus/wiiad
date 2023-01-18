import { StripePayments } from "@/src/modules/payment-methods/stripe/infrastructure/StripePayments";
import { CreateStripeCustomer } from "@/src/modules/payment-methods/stripe/use-case/CreateStripeCustomer";
import { mockedStripePayments } from "../../../../../__mocks__/context/MockStripePayments";

describe("On CreateStripeCustomer, GIVEN a stripe mocked repo", () => {
  let createStripeCustomer: CreateStripeCustomer;
  let stripePayments: StripePayments;

  beforeAll(async () => {
    stripePayments = mockedStripePayments(),
    createStripeCustomer = new CreateStripeCustomer(stripePayments);
  });

  it(`WHEN call create method,
  THEN stripe.customers.create method should be called and a customer id should be returned`, async () => {
    const customerId = await createStripeCustomer.create();
    expect(stripePayments.createCustomer).toBeCalled();
    expect(customerId.id).toBe(customerId.id);
  });
});
