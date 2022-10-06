import { IVerificationURLRepo } from "@/src/mailing/send-email-verification/domain/IVerificationURLRepo";
import { SaveEmailVerification } from "@/src/mailing/send-email-verification/use-case/SaveEmailVerification";
import { FakeVerificationEmailTimer } from "../../../../../__mocks__/lib/mailing/send-email-verification/FakeVerificationEmailTimer";

describe("On SaveEmailVerification, GIVEN a VerificationURLRepo and a VerificationEmailTimer", () => {
  let verificationURLRepo: IVerificationURLRepo;
  let emailTimer: FakeVerificationEmailTimer;

  beforeAll(() => {
    verificationURLRepo = {
      save: jest.fn(),
      remove: jest.fn(),
      findById: jest.fn(),
    };
    emailTimer = FakeVerificationEmailTimer.create();
  });

  it(`WHEN call SaveEmailVerification save method, 
    THEN verification email repo save method should be called with the VerificationEmailTimer params`, async () => {
    const saveEmail = new SaveEmailVerification(verificationURLRepo);
    await saveEmail.save(emailTimer);
    const emailTimerPrimitives = {
      email: emailTimer.email.email,
      expirationDate: emailTimer.expirationDate.date,
      id: emailTimer.id.id,
    };

    expect(verificationURLRepo.save).toBeCalledWith(
      emailTimerPrimitives
    );
  });
});
