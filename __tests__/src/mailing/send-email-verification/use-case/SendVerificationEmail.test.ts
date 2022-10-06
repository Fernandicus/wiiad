import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { IEmailSender } from "@/src/mailing/send-email-verification/domain/IEmailSender";
import { VerificationURL } from "@/src/mailing/send-email-verification/domain/VerificationURL";
import { VerificationTokenId } from "@/src/mailing/send-email-verification/domain/VerificationTokenId";
import { SendlVerificationEmail } from "@/src/mailing/send-email-verification/use-case/SendVerificationEmail";
import { UniqId } from "@/src/utils/UniqId";
import { faker } from "@faker-js/faker";

describe("On SendVerificationEmail, GIVEN an Email Sender and an Email Verification", () => {
  let emailSender: IEmailSender;
  let verificationUrl: VerificationURL;

  beforeAll(() => {
    emailSender = {
      send: jest.fn(),
    };
    verificationUrl = new VerificationURL({
      to: new Email(faker.internet.email()),
      token: new VerificationTokenId(UniqId.generate()),
      userName: new Name(faker.name.firstName()),
    });
  });

  it(`WHEN call SendVerificationEmail send method, 
  THEN Email Sender send method should be called with the VerificationEmail data`, async () => {
    const sendVerificationEmail = new SendlVerificationEmail(emailSender);
    await sendVerificationEmail.send(verificationUrl);

    expect(emailSender.send).toBeCalledWith({
      to: verificationUrl.to.email,
      url: verificationUrl.url,
    });
  });
});
