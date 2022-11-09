import { VerificationURL } from "@/src/modules/mailing/send-email-verification/domain/VerificationURL";
import { NodemailerSendVerificationEmail } from "@/src/modules/mailing/send-email-verification/infrastructure/NodemailerSendVerificationEmail";

import { FakeVerificationURL } from "../../../../../__mocks__/lib/modules/send-email-verification/FakeVerificationURL";

describe("On NodemailerSendVerificationEmail, GIVEN a SMTP service", () => {
  let nodemailer: NodemailerSendVerificationEmail;
  let verificationUrl: VerificationURL;

  beforeAll(() => {
    nodemailer = new NodemailerSendVerificationEmail();
    verificationUrl = FakeVerificationURL.create();
  });

  it(`WHEN call the send method, 
  THEN do not expect any error`, async () => {
    expect(nodemailer.send(verificationUrl)).resolves.not.toThrowError();
  });
});
