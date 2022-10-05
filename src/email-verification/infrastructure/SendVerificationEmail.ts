import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { createTransport, Transporter } from "nodemailer";
import { ErrorSendingEmail } from "../domain/ErrorSendingEmail";
import { VerificationTokenId } from "../domain/VerificationTokenId";

abstract class SMTPEmailSender {
  readonly host;
  readonly port;
  readonly user;
  readonly pass;

  constructor() {
    if (!process.env.SMTP_USER) throw Error("SMTP_USER env var is empty");
    if (!process.env.SMTP_SERVER) throw Error("SMTP_SERVER env var is empty");
    if (!process.env.SMTP_PORT) throw Error("SMTP_PORT env var is empty");
    if (!process.env.SMTP_PASSWORD)
      throw Error("SMTP_PASSWORD env var is empty");

    this.host = process.env.SMTP_SERVER;
    this.port = parseInt(process.env.SMTP_PORT);
    this.user = process.env.SMTP_USER;
    this.pass = process.env.SMTP_PASSWORD;
  }
}

class VerificationEmail extends SMTPEmailSender {
  readonly url;
  readonly to;

  constructor(props: {
    userName: Name;
    to: Email;
    token: VerificationTokenId;
  }) {
    super();

    const { to, token, userName } = props;
    this.to = to;

    this.url = `${this.host}/${userName.name}?email=${to.email}&verificationToken=${token.id}`;
  }
}

export class NodemailerSendVerificationEmail extends VerificationEmail {
  private transport: Transporter;

  constructor(props: {
    userName: Name;
    to: Email;
    token: VerificationTokenId;
  }) {
    super({ userName: props.userName, to: props.to, token: props.token });

    this.transport = createTransport({
      host: this.host,
      port: this.port,
      secure: false,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });
  }

  async send(): Promise<void> {
    const result = await this.transport.sendMail({
      from: process.env.EMAIL_FROM,
      to: this.to.email,
      subject: `Sign in to ${this.host}`,
      text: text({
        url: this.url,
        host: this.host,
      }),
      html: html({
        url: this.url,
        host: this.host,
        theme: { brandColor: undefined },
      }),
    });

    const failed = result.rejected.concat(result.pending).filter(Boolean);

    if (failed.length) {
      throw new ErrorSendingEmail(`Email(s) (${failed.join(", ")}) could not be sent`);
    }
  }
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params: {
  url: string;
  host: string;
  theme: { brandColor: string | undefined };
}) {
  const { url, host, theme } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  const brandColor = theme.brandColor || "#346df1";
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
  };

  return `
  <body style="background: ${color.background};">
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Sign in to <strong>${escapedHost}</strong>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonBackground}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                  in</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
  `;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
