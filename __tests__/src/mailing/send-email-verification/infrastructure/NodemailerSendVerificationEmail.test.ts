import { VerificationURL } from "@/src/mailing/send-email-verification/domain/VerificationURL";
import { NodemailerSendVerificationEmail } from "@/src/mailing/send-email-verification/infrastructure/NodemailerSendVerificationEmail";
import { faker } from "@faker-js/faker";

describe("On NodemailerSendVerificationEmail, GIVEN a SMTP service", () => {
  let nodemailer: NodemailerSendVerificationEmail;
  let sendParams: { to: string; url: string };
  beforeAll(() => {
    nodemailer = new NodemailerSendVerificationEmail();
    sendParams = {
      to: faker.internet.email(),
      url: `${faker.name.firstName()}/${faker.word.noun()}`,
    };
  });

  it(`WHEN call the send method, 
  THEN do not expect any error`, async () => {
    expect(async () => {
      await nodemailer.send(sendParams);
    }).not.toThrowError();
  });
});
