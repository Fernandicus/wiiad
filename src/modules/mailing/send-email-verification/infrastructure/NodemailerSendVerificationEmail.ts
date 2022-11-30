import { createTransport, Transporter } from "nodemailer";
import { ErrorSendingEmail } from "../domain/errors/ErrorSendingEmail";
import { IEmailSenderRepo } from "../domain/interfaces/IEmailSenderRepo";
import { SMTPData } from "../domain/interfaces/SMTPData";
import { VerificationEmailTemplate } from "../domain/VerificationEmailTemplate";
import { VerificationURL } from "../domain/VerificationURL";

export class NodemailerSendVerificationEmail
  extends SMTPData
  implements IEmailSenderRepo
{
  private transport: Transporter;
  readonly base_url: string;
  readonly email_from: string;

  constructor() {
    super();
    if (!process.env.BASE_URL) throw Error("BASE_URL env var cant be empty");
    if (!process.env.EMAIL_FROM)
      throw Error("EMAIL_FROM env var cant be empty");

    this.transport = createTransport({
      host: this.host,
      port: this.port,
      secure: false,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });
    this.base_url = process.env.BASE_URL;
    this.email_from = process.env.EMAIL_FROM;
  }

  async login(verificationUrl: VerificationURL): Promise<void> {
    const result = await this.transport.sendMail({
      from: this.email_from,
      to: verificationUrl.to.email,
      subject: `Log in to ${this.base_url}`,
      text: VerificationEmailTemplate.title({
        url: `${this.base_url}${verificationUrl.login()}`,
        host: this.base_url,
      }),
      html: VerificationEmailTemplate.html({
        url: `${this.base_url}${verificationUrl.login()}`,
        host: this.base_url,
      }),
    });

    const failed = result.rejected.concat(result.pending).filter(Boolean);

    if (failed.length) {
      throw new ErrorSendingEmail(
        `Email(s) (${failed.join(", ")}) could not be sent`
      );
    }
  }

  async signUp(verificationUrl: VerificationURL): Promise<void> {
    const result = await this.transport.sendMail({
      from: this.email_from,
      to: verificationUrl.to.email,
      subject: `Sign up to ${this.base_url}`,
      text: VerificationEmailTemplate.title({
        url: `${this.base_url}${verificationUrl.signUp()}`,
        host: this.base_url,
      }),
      html: VerificationEmailTemplate.html({
        url: `${this.base_url}${verificationUrl.signUp()}`,
        host: this.base_url,
      }),
    });

    const failed = result.rejected.concat(result.pending).filter(Boolean);

    if (failed.length) {
      throw new ErrorSendingEmail(
        `Email(s) (${failed.join(", ")}) could not be sent`
      );
    }
  }
}
