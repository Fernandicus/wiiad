export interface IEmailSender {
  send(verificationEmail: { to: string; url: string }): Promise<void>;
}
