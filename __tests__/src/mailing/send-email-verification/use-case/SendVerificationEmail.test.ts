import { IEmailSender } from "@/src/modules/mailing/send-email-verification/domain/IEmailSender";
import { VerificationURL } from "@/src/modules/mailing/send-email-verification/domain/VerificationURL";
import { SendlVerificationEmail } from "@/src/modules/mailing/send-email-verification/use-case/SendVerificationEmail";
import { FakeVerificationURL } from "../../../../../__mocks__/lib/modules/send-email-verification/FakeVerificationURL";

describe("On SendVerificationEmail, GIVEN an Email Sender and an Email Verification", () => {
  let mockedRepo: IEmailSender;
  let verificationUrl: VerificationURL;
  let sendVerificationEmail: SendlVerificationEmail;

  beforeAll(() => {
    mockedRepo = {
      send: jest.fn(),
    };
    verificationUrl = FakeVerificationURL.create();
    sendVerificationEmail = new SendlVerificationEmail(mockedRepo);
  });

  it(`WHEN call SendVerificationEmail send method, 
  THEN Email Sender send method should be called with the VerificationEmail data`, async () => {
    await sendVerificationEmail.send(verificationUrl);
    expect(mockedRepo.send).toBeCalledWith(verificationUrl);
  });
});
