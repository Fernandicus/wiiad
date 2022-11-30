import { IStripeRepo } from "@/src/modules/payment-methods/stripe/domain/interfaces/IStripeRepo";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { SaveStripeCustomer } from "@/src/modules/payment-methods/stripe/use-case/SaveStripe";
import { UniqId } from "@/src/utils/UniqId";
import { mockedStripeRepo } from "../../../../../__mocks__/context/MockStripeRepo";
import { FakeStripe } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakeStripe";

describe("On SaveStripeCustomer, GIVEN a stripe mocked repo", () => {
  let saveCustomer: SaveStripeCustomer;
  let stripe: Stripe;
  let mockedRepo: IStripeRepo;

  beforeAll(async () => {
    stripe = FakeStripe.create(UniqId.new());
    mockedRepo = mockedStripeRepo(stripe);
    saveCustomer = new SaveStripeCustomer(mockedRepo);
  });

  it(`WHEN call save method, THEN repo should be called with stripe`, async () => {
    await saveCustomer.save(stripe);
    expect(mockedRepo.save).toBeCalledWith(stripe);
  });
});
