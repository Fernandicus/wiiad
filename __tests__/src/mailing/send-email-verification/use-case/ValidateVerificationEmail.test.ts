import { Email } from "@/src/domain/Email";
import { ErrorEmailVerification } from "@/src/modules/mailing/send-email-verification/domain/ErrorEmailVerification";
import { VerificationEmailTimer } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { ValidateVerificationEmail } from "@/src/modules/mailing/send-email-verification/use-case/ValidateVerificationEmail";
import { UniqId } from "@/src/utils/UniqId";
import { FakeVerificationEmailTimer } from "../../../../../__mocks__/lib/modules/send-email-verification/FakeVerificationEmailTimer";
import { RoleType } from "@/src/domain/Role";
import { IVerificationEmailRepo } from "@/src/modules/mailing/send-email-verification/domain/IVerificationEmailRepo";

describe("On ValidateVerificationEmail, GIVEN a Validation Email Mock Repo", () => {
  let validEmailTimer: VerificationEmailTimer;
  let expiredEmailTimer: VerificationEmailTimer;
  let emails: VerificationEmailTimer[] = [];
  let mockedRepo: IVerificationEmailRepo;
  let verifyEmail: ValidateVerificationEmail;

  beforeAll(() => {
    validEmailTimer = FakeVerificationEmailTimer.create();
    expiredEmailTimer = FakeVerificationEmailTimer.create(
      RoleType.BUSINESS,
      true
    );

    emails = [validEmailTimer, expiredEmailTimer];

    mockedRepo = {
      findById: jest.fn().mockImplementation((tokenId: UniqId) => {
        const email = emails.find((email) => email.id.id == tokenId.id);
        if (!email) return null;
        return validEmailTimer;
      }),
      remove: jest.fn(),
      save: jest.fn(),
    };
    verifyEmail = new ValidateVerificationEmail(mockedRepo);
  });

  it(`WHEN call the validate method for an non existing token, 
  THEN the mock findById method should throw an ErrorEmailVerification`, async () => {
    const invalidToken = UniqId.new();
    expect(
      verifyEmail.validate(invalidToken, validEmailTimer.email)
    ).rejects.toThrowError(ErrorEmailVerification);
  });

  it(`WHEN call the validate method for an non existing email, 
  THEN the mock findById method should throw an ErrorEmailVerification`, async () => {
    expect(
      verifyEmail.validate(validEmailTimer.id, new Email("x@x.com"))
    ).rejects.toThrowError(ErrorEmailVerification);
  });

  it(`WHEN call the validate method, 
  THEN the repo findById and remove method should be called, and a validEmailTimer should be returned`, async () => {
    const validEmail = await verifyEmail.validate(
      validEmailTimer.id,
      validEmailTimer.email
    );
    expect(mockedRepo.findById).toBeCalledWith(validEmailTimer.id);
    expect(mockedRepo.findById).toReturnWith(validEmailTimer);
    expect(mockedRepo.remove).toBeCalledWith(validEmailTimer.id);
    expect(validEmail).toEqual(validEmailTimer);
  });

  it(`WHEN call the validate method for an expired date, 
  THEN the mock findById method should throw an Error`, async () => {
    expect(
      verifyEmail.validate(expiredEmailTimer.id, expiredEmailTimer.email)
    ).rejects.toThrowError(ErrorEmailVerification);
  });

  test(`WHEN call the validate method for a non expired date, 
  THEN the mock findById method should be called with id`, async () => {
    const validatedEmail = await verifyEmail.validate(
      validEmailTimer.id,
      validEmailTimer.email
    );

    expect(validatedEmail).toBe(validatedEmail);
  });
});
