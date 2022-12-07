import { IStripeRepo } from "@/src/modules/payment-methods/stripe/domain/interfaces/IStripeRepo";
import { UpdateStripe } from "@/src/modules/payment-methods/stripe/use-case/UpdateStripe";
import { UniqId } from "@/src/utils/UniqId";
import { FakeCardDetails } from "../../../../../__mocks__/lib/modules/payment-methods/stripe/FakeCardDetails";
import { mockedStripeRepo } from "../../../../../__mocks__/context/MockStripeRepo";

describe("On UpdateStripe, GIVEN a stripe mocked repo", () => {
  let updateStripe: UpdateStripe;
  let mockedRepo: IStripeRepo;

  beforeAll(async () => {
    mockedRepo = mockedStripeRepo();
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
