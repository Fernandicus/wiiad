import { VerificationURL } from "../VerificationURL";

export interface IEmailSenderRepo {
  login(verificationEmail: VerificationURL): Promise<void>;
  signUp(verificationEmail: VerificationURL): Promise<void>;
  updateEmail(verificationEmail: VerificationURL): Promise<void>;
}
