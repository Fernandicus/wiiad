export class VerificationEmailTemplate {
  private static brandColor = "#346df1";
  private static color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: this.brandColor,
    buttonBorder: this.brandColor,
  };

  static html(params: { url: string; host: string }): string {
    const { url, host } = params;
    const escapedHost = host.replace(/\./g, "&#8203;.");

    return `
      <body style="background: ${this.color.background};">
        <table width="100%" border="0" cellspacing="20" cellpadding="0"
          style="background: ${this.color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
          <tr>
            <td align="center"
              style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${this.color.text};">
              Sign in to <strong>${escapedHost}</strong>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="border-radius: 5px;" bgcolor="${this.color.buttonBackground}"><a href="${url}"
                      target="_blank"
                      style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${this.color.buttonBackground}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${this.color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                      in</a></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center"
              style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${this.color.text};">
              If you did not request this email you can safely ignore it.
            </td>
          </tr>
        </table>
      </body>
      `;
  }

  static title(params: { url: string; host: string }): string {
    return `Sign in to ${params.host}\n${params.url}\n\n`;
  }
}
