import { RoleType } from "@/src/domain/Role";
import { IVerificationEmailRepo } from "@/src/modules/mailing/send-email-verification/domain/IVerificationEmailRepo";
import { VerificationEmail } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmail";
import { SaveVerificationEmail } from "@/src/modules/mailing/send-email-verification/use-case/SaveVerificationEmail";
import { mockedVerificationEmailRepo } from "../../../../../__mocks__/context/MockVerificationEmailRepo";
import { FakeVerificationEmail } from "../../../../../__mocks__/lib/modules/send-email-verification/FakeVerificationEmail";

describe("On SaveEmailVerification, GIVEN a VerificationURLRepo and a VerificationEmailTimer", () => {
  let mockedRepo: IVerificationEmailRepo;
  let emailTimer: VerificationEmail;
  let saveEmail: SaveVerificationEmail;

  beforeAll(async () => {
    mockedRepo = mockedVerificationEmailRepo({
      valid: FakeVerificationEmail.create(),
      expired: FakeVerificationEmail.create(RoleType.BUSINESS, true),
    });
    emailTimer = FakeVerificationEmail.create();
    saveEmail = new SaveVerificationEmail(mockedRepo);
  });

  it(`WHEN call SaveVerificationEmail save method, 
    THEN verification email repo save method should be called with the VerificationEmailTimer params`, async () => {
    await saveEmail.save(emailTimer);
    expect(mockedRepo.save).toBeCalledWith(emailTimer);
  });
});
