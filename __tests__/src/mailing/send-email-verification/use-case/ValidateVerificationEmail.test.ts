import { Email } from "@/src/domain/Email";
import { ErrorEmailVerification } from "@/src/modules/mailing/send-email-verification/domain/ErrorEmailVerification";
import { VerificationEmail } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmail";
import { ValidateVerificationEmail } from "@/src/modules/mailing/send-email-verification/use-case/ValidateVerificationEmail";
import { UniqId } from "@/src/utils/UniqId";
import { FakeVerificationEmail } from "../../../../../__mocks__/lib/modules/send-email-verification/FakeVerificationEmail";
import { RoleType } from "@/src/domain/Role";
import { IVerificationEmailRepo } from "@/src/modules/mailing/send-email-verification/domain/IVerificationEmailRepo";
import { mockedVerificationEmailRepo } from "../../../../../__mocks__/context/MockVerificationEmailRepo";
import { AuthToken } from "@/src/modules/mailing/send-email-verification/domain/AuthToken";

describe("On ValidateVerificationEmail, GIVEN a Validation Email Mock Repo", () => {
  let validEmailTimer: VerificationEmail;
  let expiredEmailTimer: VerificationEmail;
  let mockedRepo: IVerificationEmailRepo;
  let verifyEmail: ValidateVerificationEmail;

  beforeAll(() => {
    validEmailTimer = FakeVerificationEmail.create();
    expiredEmailTimer = FakeVerificationEmail.create(RoleType.BUSINESS, true);
    mockedRepo = mockedVerificationEmailRepo({
      valid: validEmailTimer,
      expired: expiredEmailTimer,
    });
    verifyEmail = new ValidateVerificationEmail(mockedRepo);
  });

  it(`WHEN call the validate method for an non existing token, 
  THEN the mock findById method should throw an ErrorEmailVerification`, async () => {
    const invalidToken = new AuthToken(UniqId.generate())
    expect(verifyEmail.validate(invalidToken)).rejects.toThrowError(
      ErrorEmailVerification
    );
  });

  it(`WHEN call the validate method, 
  THEN the repo findById and remove method should be called, and a validEmailTimer should be returned`, async () => {
    const validEmail = await verifyEmail.validate(validEmailTimer.authToken);
    expect(mockedRepo.findByAuthToken).toBeCalledWith(
      validEmailTimer.authToken
    );
    expect(mockedRepo.findByAuthToken).toReturnWith(validEmailTimer);
    expect(mockedRepo.removeById).toBeCalledWith(validEmailTimer.id);
    expect(validEmail).toEqual(validEmailTimer);
  });

  it(`WHEN call the validate method for an expired date, 
  THEN the mock findById method should throw an Error`, async () => {
    expect(
      verifyEmail.validate(expiredEmailTimer.authToken)
    ).rejects.toThrowError(ErrorEmailVerification);
  });

  test(`WHEN call the validate method for a non expired date, 
  THEN the mock findById method should be called with id`, async () => {
    const validatedEmail = await verifyEmail.validate(
      validEmailTimer.authToken
    );

    expect(validatedEmail).toBe(validatedEmail);
  });
});
