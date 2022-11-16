import { ErrorFindingStripe } from "@/src/modules/payment-methods/stripe/domain/ErrorFindingStripe";
import { IStripeRepo } from "@/src/modules/payment-methods/stripe/domain/IStripeRepo";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { FindStripeCustomer } from "@/src/modules/payment-methods/stripe/use-case/FindStripeCustomer";
import { UniqId } from "@/src/utils/UniqId";
import { mockedStripeRepo } from "../../../../../__mocks__/context/MockStripeRepo";
import { FakeStripe } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakeStripe";

describe("On FindStripeCustomer, GIVEN a stripe mocked repo", () => {
  let saveCustomer: FindStripeCustomer;
  let stripe: Stripe;
  let mockedRepo: IStripeRepo;

  beforeAll(async () => {
    stripe = FakeStripe.create(UniqId.new());
    mockedRepo = mockedStripeRepo(stripe);
    saveCustomer = new FindStripeCustomer(mockedRepo);
  });

  it(`WHEN call findByUserId method, THEN repo should be called with stripe and stripe should be found`, async () => {
    const stripeFound = await saveCustomer.findByUserId(stripe.userId);
    expect(mockedRepo.findByUserId).toBeCalledWith(stripe.userId);
    expect(stripeFound).toEqual(stripe);
  });

  it(`WHEN call findByUserId method wiht a not existing user id, THEN an ErrorFindingStripe should be thrown`, async () => {
    expect(saveCustomer.findByUserId(UniqId.new())).rejects.toThrowError(
      ErrorFindingStripe
    );
  });
});
