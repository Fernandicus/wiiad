import { RoleType } from "@/src/domain/Role";
import { IVerificationEmailRepo } from "@/src/modules/mailing/send-email-verification/domain/IVerificationEmailRepo";
import { SaveEmailVerification } from "@/src/modules/mailing/send-email-verification/use-case/SaveEmailVerification";
import { mockedVerificationEmailRepo } from "../../../../../__mocks__/context/MockVerificationEmailRepo";
import { FakeVerificationEmailTimer } from "../../../../../__mocks__/lib/modules/send-email-verification/FakeVerificationEmailTimer";

describe("On SaveEmailVerification, GIVEN a VerificationURLRepo and a VerificationEmailTimer", () => {
  let mockedRepo: IVerificationEmailRepo;
  let emailTimer: FakeVerificationEmailTimer;
  let saveEmail: SaveEmailVerification;

  beforeAll(async () => {
    mockedRepo = mockedVerificationEmailRepo({
      valid: FakeVerificationEmailTimer.create(),
      expired: FakeVerificationEmailTimer.create(RoleType.BUSINESS, true),
    });
    emailTimer = FakeVerificationEmailTimer.create();
    saveEmail = new SaveEmailVerification(mockedRepo);
  });

  it(`WHEN call SaveEmailVerification save method, 
    THEN verification email repo save method should be called with the VerificationEmailTimer params`, async () => {
    await saveEmail.save(emailTimer);
    expect(mockedRepo.save).toBeCalledWith(emailTimer);
  });
});
