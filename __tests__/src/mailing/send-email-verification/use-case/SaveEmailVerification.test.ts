import { IVerificationEmailRepo } from "@/src/mailing/send-email-verification/domain/IVerificationEmailRepo";
import { SaveEmailVerification } from "@/src/mailing/send-email-verification/use-case/SaveEmailVerification";
import { FakeEmailVerification } from "../../../../../__mocks__/lib/mailing/send-email-verification/FakeEmailVerification";

describe("On SaveEmailVerification, GIVEN a VerificationEmailRepo and a EmailVerification", () => {
  let verificationEmailRepo: IVerificationEmailRepo;
  let emailVerification: FakeEmailVerification;

  beforeAll(() => {
    verificationEmailRepo = {
      save: jest.fn(),
      remove: jest.fn(),
      findById: jest.fn(),
    };
    emailVerification = FakeEmailVerification.create();
  });

  it(`WHEN call SaveEmailVerification save method, 
    THEN verification email repo save method should be called with the EmailVerification params`, async () => {
    const saveEmail = new SaveEmailVerification(verificationEmailRepo);
    await saveEmail.save(emailVerification);
    const emailVerificationPrimitives = {
      email: emailVerification.email.email,
      expirationDate: emailVerification.expirationDate.date,
      id: emailVerification.id.id,
    };

    expect(verificationEmailRepo.save).toBeCalledWith(
      emailVerificationPrimitives
    );
  });
});
