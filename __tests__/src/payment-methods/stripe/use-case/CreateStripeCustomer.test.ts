import { StripePayments } from "@/src/modules/payment-methods/stripe/infrastructure/StripePayments";
import { CreateStripeCustomer } from "@/src/modules/payment-methods/stripe/use-case/CreateStripeCustomer";
import { mockedStripe } from "../../../../../__mocks__/context/MockStripe";
import Stripe from "stripe";

describe("On CreateStripeCustomer, GIVEN a stripe mocked repo", () => {
  let createStripeCustomer: CreateStripeCustomer;
  let stripePayments: StripePayments;
  let stripe: Stripe;

  beforeAll(async () => {
    stripe = mockedStripe();
    stripePayments = new StripePayments(stripe);
    createStripeCustomer = new CreateStripeCustomer(stripePayments);
  });

  it(`WHEN call create method,
  THEN stripe.customers.create method should be called and a customer id should be returned`, async () => {
    const customerId = await createStripeCustomer.create();
    expect(stripe.customers.create).toBeCalled();
    expect(customerId.id).toBe(customerId.id);
  });
});
