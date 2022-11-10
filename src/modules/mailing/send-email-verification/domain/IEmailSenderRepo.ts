import { VerificationURL } from "./VerificationURL";

export interface IEmailSenderRepo {
  login(verificationEmail: VerificationURL): Promise<void>;
}
