import { VerificationURL } from "@/src/modules/mailing/send-email-verification/domain/VerificationURL";
import { authTokenCreator } from "@/src/modules/mailing/send-email-verification/email-verification-container";
import { NodemailerSendVerificationEmail } from "@/src/modules/mailing/send-email-verification/infrastructure/NodemailerSendVerificationEmail";

import { FakeVerificationURL } from "../../../../../__mocks__/lib/modules/send-email-verification/FakeVerificationURL";

describe("On NodemailerSendVerificationEmail, GIVEN a SMTP service", () => {
  let nodemailer: NodemailerSendVerificationEmail;
  let verificationUrl: VerificationURL;

  beforeAll(() => {
    nodemailer = new NodemailerSendVerificationEmail();
    const token = authTokenCreator.generate();
    verificationUrl = FakeVerificationURL.create(token);
  });

  it(`WHEN call the send method, 
  THEN do not expect any error`, async () => {
    expect(nodemailer.send(verificationUrl)).resolves.not.toThrowError();
  });
});
