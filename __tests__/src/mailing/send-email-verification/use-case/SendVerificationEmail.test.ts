import { IEmailSenderRepo } from "@/src/modules/mailing/send-email-verification/domain/IEmailSenderRepo";
import { VerificationURL } from "@/src/modules/mailing/send-email-verification/domain/VerificationURL";
import { authTokenCreator } from "@/src/modules/mailing/send-email-verification/email-verification-container";
import { AuthTokenCrypto } from "@/src/modules/mailing/send-email-verification/infrastructure/AuthTokenCrypto";
import { SendlVerificationEmail } from "@/src/modules/mailing/send-email-verification/use-case/SendVerificationEmail";
import { mockedEmailSenderRepo } from "../../../../../__mocks__/context/MockEmailSenderRepo";
import { FakeVerificationURL } from "../../../../../__mocks__/lib/modules/send-email-verification/FakeVerificationURL";

describe("On SendVerificationEmail, GIVEN an Email Sender and an Email Verification", () => {
  let mockedRepo: IEmailSenderRepo;
  let verificationUrl: VerificationURL;
  let sendVerificationEmail: SendlVerificationEmail;

  beforeAll(() => {
    mockedRepo = mockedEmailSenderRepo();
    const token = authTokenCreator.generate();
    verificationUrl = FakeVerificationURL.create(token);
    sendVerificationEmail = new SendlVerificationEmail(mockedRepo);
  });

  it(`WHEN call SendVerificationEmail send method, 
  THEN Email Sender send method should be called with the VerificationEmail data`, async () => {
    await sendVerificationEmail.send(verificationUrl);
    expect(mockedRepo.send).toBeCalledWith(verificationUrl);
  });
});
