export abstract class SMTPData {
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