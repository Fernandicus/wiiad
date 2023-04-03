import { ErrorFindingStripe } from "@/src/modules/payment-methods/stripe/domain/errors/ErrorFindingStripe";
import { IStripeRepo } from "@/src/modules/payment-methods/stripe/domain/interfaces/IStripeRepo";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { FindStripeCustomer } from "@/src/modules/payment-methods/stripe/use-case/FindStripeCustomer";
import { FakeUniqId } from "../../../../../__mocks__/lib/domain/FakeUniqId";
import { mockedStripeRepo } from "../../../../../__mocks__/context/MockStripeRepo";

describe("On FindStripeCustomer, GIVEN a stripe mocked repo", () => {
  let findCustomer: FindStripeCustomer;
  let mockedRepo: IStripeRepo;

  beforeAll(async () => {
    mockedRepo = mockedStripeRepo();
    findCustomer = new FindStripeCustomer(mockedRepo);
  });

  it(`WHEN call findByUserId method, 
  THEN repo should be called with stripe and stripe should be found`, async () => {
    const id = FakeUniqId.create();
    const stripeFound = await findCustomer.byUserId(id);
    expect(mockedRepo.findByUserId).toBeCalledWith(id);
    expect(stripeFound).toBeInstanceOf(Stripe);
  });

  it(`WHEN call findByUserId method wiht a not existing user id, 
  THEN an ErrorFindingStripe should be thrown`, async () => {
    expect(findCustomer.byUserId(FakeUniqId.noExist())).rejects.toThrowError(
      ErrorFindingStripe
    );
  });
});
