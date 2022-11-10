import { RoleType } from "@/src/domain/Role";
import { IVerificationEmailRepo } from "@/src/modules/mailing/send-email-verification/domain/IVerificationEmailRepo";
import { RemoveVerificationEmail } from "@/src/modules/mailing/send-email-verification/use-case/RemoveVerificationEmail";
import { UniqId } from "@/src/utils/UniqId";
import { mockedVerificationEmailRepo } from "../../../../../__mocks__/context/MockVerificationEmailRepo";
import { FakeVerificationEmailTimer } from "../../../../../__mocks__/lib/modules/send-email-verification/FakeVerificationEmailTimer";

describe("On RemoveVerificationEmail, GIVEN Verification Email Repo", () => {
  let mockedRepo: IVerificationEmailRepo;
  let removeVerificationEmail: RemoveVerificationEmail;

  beforeAll(() => {
    mockedRepo = mockedVerificationEmailRepo({
      valid: FakeVerificationEmailTimer.create(),
      expired: FakeVerificationEmailTimer.create(RoleType.BUSINESS, true),
    });
    removeVerificationEmail = new RemoveVerificationEmail(mockedRepo);
  });

  it(`WHEN call the remove method, 
  THEN Repository remove method should be called with the id`, async () => {
    const id: UniqId = UniqId.new();
    await removeVerificationEmail.remove(id);
    expect(mockedRepo.remove).toBeCalledWith(id);
  });
});
