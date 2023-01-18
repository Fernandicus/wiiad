import { IEmailSenderRepo } from "@/src/modules/mailing/send-email-verification/domain/interfaces/IEmailSenderRepo";
import { IVerificationEmailData } from "@/src/modules/mailing/send-email-verification/domain/interfaces/IVerificationEmailData";
import { AuthToken } from "@/src/modules/mailing/send-email-verification/domain/value-objects/AuthToken";
import { VerificationURL } from "@/src/modules/mailing/send-email-verification/domain/VerificationURL";
//import { authTokenCreator } from "@/src/modules/mailing/send-email-verification/infrastructure/email-verification-container";
import { AuthTokenRepo } from "@/src/modules/mailing/send-email-verification/infrastructure/AuthTokenRepo";
import { createAuthTokenHandler } from "@/src/modules/mailing/send-email-verification/infrastructure/email-verification-container";
import { CreateAuthToken } from "@/src/modules/mailing/send-email-verification/use-case/CreateAuthToken";
import { SendlVerificationEmail } from "@/src/modules/mailing/send-email-verification/use-case/SendVerificationEmail";
import { JsonWebTokenNPM } from "@/src/common/infrastructure/JsonWebTokenNPM";
import { mockedEmailSenderRepo } from "../../../../../__mocks__/context/MockEmailSenderRepo";
import { FakeVerificationURL } from "../../../../../__mocks__/lib/modules/send-email-verification/FakeVerificationURL";

describe("On SendVerificationEmail, GIVEN an Email Sender and an Email Verification", () => {
  let mockedRepo: IEmailSenderRepo;
  let verificationUrl: VerificationURL;
  let sendVerificationEmail: SendlVerificationEmail;

  beforeAll(() => {
    mockedRepo = mockedEmailSenderRepo();
    const payload: IVerificationEmailData = {
      email: "email@email.com",
      role: "user",
      userName: "test",
    };
    const authTokenWith15min = createAuthTokenHandler.jwtExpiresIn15Min(payload);
    verificationUrl = FakeVerificationURL.create(authTokenWith15min);
    sendVerificationEmail = new SendlVerificationEmail(mockedRepo);
  });

  it(`WHEN call SendVerificationEmail send method, 
  THEN Email Sender send method should be called with the VerificationEmail data`, async () => {
    await sendVerificationEmail.login(verificationUrl);
    expect(mockedRepo.login).toBeCalledWith(verificationUrl);
  });
});
