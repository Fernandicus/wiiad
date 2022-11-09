import { IVerificationEmailRepo } from "@/src/modules/mailing/send-email-verification/domain/IVerificationEmailRepo";
import { RemoveVerificationEmail } from "@/src/modules/mailing/send-email-verification/use-case/RemoveVerificationEmail";
import { UniqId } from "@/src/utils/UniqId";

describe("On RemoveVerificationEmail, GIVEN Verification Email Repo", () => {
  let mockedRepo: IVerificationEmailRepo;
  let removeVerificationEmail: RemoveVerificationEmail;

  beforeAll(() => {
    mockedRepo = {
      findById: jest.fn(),
      remove: jest.fn(),
      save: jest.fn(),
    };
    removeVerificationEmail = new RemoveVerificationEmail(mockedRepo);
  });

  it(`WHEN call the remove method, 
  THEN Repository remove method should be called with the id`, async () => {
    const id: UniqId = UniqId.new();
    await removeVerificationEmail.remove(id);
    expect(mockedRepo.remove).toBeCalledWith(id);
  });
});
