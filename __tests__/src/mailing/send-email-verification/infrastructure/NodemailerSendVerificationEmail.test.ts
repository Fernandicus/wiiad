import { VerificationURL } from "@/src/mailing/send-email-verification/domain/VerificationURL";
import { NodemailerSendVerificationEmail } from "@/src/mailing/send-email-verification/infrastructure/NodemailerSendVerificationEmail";

import { FakeVerificationURL } from "../../../../../__mocks__/lib/mailing/send-email-verification/FakeVerificationURL";

describe("On NodemailerSendVerificationEmail, GIVEN a SMTP service", () => {
  let nodemailer: NodemailerSendVerificationEmail;
  let verificationUrl: VerificationURL;

  beforeAll(() => {
    nodemailer = new NodemailerSendVerificationEmail();
    verificationUrl = FakeVerificationURL.create();
  });

  it(`WHEN call the send method, 
  THEN do not expect any error`, async () => {
    expect(async () => {
      await nodemailer.send(verificationUrl);
    }).not.toThrowError();
  });
});
