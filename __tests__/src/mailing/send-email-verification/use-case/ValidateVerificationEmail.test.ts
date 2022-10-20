import { Email } from "@/src/domain/Email";
import { ErrorLogIn } from "@/src/domain/ErrorLogIn";
import { IVerificationEmailTimerPrimitives } from "@/src/modules/mailing/send-email-verification/domain/VerificationEmailTimer";
import { EmailVerificationConstants } from "@/src/modules/mailing/send-email-verification/EmailVerificationConstants";
import { ValidateVerificationEmail } from "@/src/modules/mailing/send-email-verification/use-case/ValidateVerificationEmail";
import { UniqId } from "@/src/utils/UniqId";
import { faker } from "@faker-js/faker";

describe("On ValidateVerificationEmail, GIVEN a Validation Email Mock Repo", () => {
  let validEmailTimer: IVerificationEmailTimerPrimitives;
  let expiredEmailTimer: IVerificationEmailTimerPrimitives;

  beforeAll(() => {
    const notExpiredDate = new Date(
      Date.now() + EmailVerificationConstants.fiveMin
    );
    const expiredDate = new Date(
      Date.now() - EmailVerificationConstants.fiveMin
    );

    validEmailTimer = {
      email: faker.internet.email(),
      expirationDate: notExpiredDate,
      id: UniqId.generate(),
      rol: "business",
    };

    expiredEmailTimer = {
      email: faker.internet.email(),
      expirationDate: expiredDate,
      id: UniqId.generate(),
      rol: "business",
    };
  });

  test(`WHEN call the validate method for an non existing email, 
  THEN the mock findById method should throw an Error`, async () => {
    const mockedRepo = {
      findById: jest.fn().mockReturnValueOnce(null),
      remove: jest.fn(),
      save: jest.fn(),
    };
    const verifyEmail = new ValidateVerificationEmail(mockedRepo);

    expect(async () => {
      await verifyEmail.validate(
        UniqId.new(),
        new Email(faker.internet.email())
      );
    }).rejects.toThrowError(ErrorLogIn);
  });

  test(`WHEN call the validate method for an expired date, 
  THEN the mock findById method should throw an Error`, async () => {
    const mockedRepo = {
      findById: jest.fn().mockReturnValueOnce(expiredEmailTimer),
      remove: jest.fn(),
      save: jest.fn(),
    };
    const verifyEmail = new ValidateVerificationEmail(mockedRepo);

    await expect(async () => {
      await verifyEmail.validate(
        UniqId.new(),
        new Email(faker.internet.email())
      );
    }).rejects.toThrowError(ErrorLogIn);
  });

  test(`WHEN call the validate method for a non expired date, 
  THEN the mock findById method should be called with id`, async () => {
    const mockRepo = {
      findById: jest.fn().mockReturnValueOnce(validEmailTimer),
      remove: jest.fn(),
      save: jest.fn(),
    };
    const validateEmail = new ValidateVerificationEmail(mockRepo);

    const validatedEmail = await validateEmail.validate(
      new UniqId(validEmailTimer.id),
      new Email(validEmailTimer.email)
    );

    expect(mockRepo.findById).toBeCalledWith(validEmailTimer.id);
    expect(mockRepo.findById).toReturnWith(validEmailTimer);
    expect(mockRepo.remove).toBeCalledWith(validEmailTimer.id);
    expect(validatedEmail).toBe(validatedEmail);
  });
});
