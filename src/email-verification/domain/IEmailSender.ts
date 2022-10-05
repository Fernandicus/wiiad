import { Email } from "@/src/domain/Email";
import { VerificationEmail } from "./VerificationEmail";

export interface IEmailSender {
  readonly host: string;
  readonly port: number;
  readonly user: string;
  readonly pass: string;
  send(verificationEmail: { to: string; url: string }): Promise<void>;
}
