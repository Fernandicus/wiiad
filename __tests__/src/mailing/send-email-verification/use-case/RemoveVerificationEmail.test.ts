import { IVerificationEmailRepo } from "@/src/mailing/send-email-verification/domain/IVerificationEmailRepo";
import { VerificationTokenId } from "@/src/mailing/send-email-verification/domain/VerificationTokenId";
import { RemoveVerificationEmail } from "@/src/mailing/send-email-verification/use-case/RemoveVerificationEmail";

describe("On RemoveVerificationEmail, GIVEN Verification Email Repo", () => {
  let repo: IVerificationEmailRepo;
  let removeVerificationEmail: RemoveVerificationEmail;

  beforeAll(() => {
    repo = {
      findById: jest.fn(),
      remove: jest.fn(),
      save: jest.fn(),
    };
    removeVerificationEmail = new RemoveVerificationEmail(repo);
  });

  it(`WHEN call the remove method, 
  THEN Repository remove method should be called with the id`, async () => {
    const id: VerificationTokenId = new VerificationTokenId(
      Math.random().toString()
    );
    await removeVerificationEmail.remove(id);

    expect(repo.remove).toBeCalledWith(id.id);
  });
});
