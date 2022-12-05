import { IStripeRepo } from "@/src/modules/payment-methods/stripe/domain/interfaces/IStripeRepo";
import { Stripe } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { UpdateStripe } from "@/src/modules/payment-methods/stripe/use-case/UpdateStripe";
import { UniqId } from "@/src/utils/UniqId";
import { FakeCardDetails } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakeCardDetails";
import { mockedStripeRepo } from "../../../../../__mocks__/context/MockStripeRepo";
import { FakeStripe } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakeStripe";

describe("On UpdateStripe, GIVEN a stripe mocked repo", () => {
  let updateStripe: UpdateStripe;
  let stripe: Stripe;
  let mockedRepo: IStripeRepo;

  beforeAll(async () => {
    stripe = FakeStripe.create(UniqId.new());
    mockedRepo = mockedStripeRepo(stripe);
    updateStripe = new UpdateStripe(mockedRepo);
  });

  it(`WHEN call findByUserId method, THEN repo should be called with stripe and stripe should be found`, async () => {
    const params = {
      userId: UniqId.new(),
      cardDetails: FakeCardDetails.create(),
    };
    await updateStripe.saveCardDetails(params);
    expect(mockedRepo.addNewCardDetails).toBeCalledWith(params);
  });
});
