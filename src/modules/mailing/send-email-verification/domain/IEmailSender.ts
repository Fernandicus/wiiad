import { VerificationURL } from "./VerificationURL";

export interface IEmailSender {
  send(verificationEmail: VerificationURL): Promise<void>;
}
