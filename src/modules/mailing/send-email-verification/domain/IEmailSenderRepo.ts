import { VerificationURL } from "./VerificationURL";

export interface IEmailSenderRepo {
  send(verificationEmail: VerificationURL): Promise<void>;
}
