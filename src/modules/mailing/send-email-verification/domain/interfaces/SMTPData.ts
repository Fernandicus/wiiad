import { projectConfig } from "@/src/utils/projectConfig";

export abstract class SMTPData {
  readonly host;
  readonly port;
  readonly user;
  readonly pass;

  constructor() {
    const { port, pwd, server, user } = projectConfig.SMTP;
    
    if (!user) throw Error("SMTP_USER env var is empty");
    if (!server) throw Error("SMTP_SERVER env var is empty");
    if (!port) throw Error("SMTP_PORT env var is empty");
    if (!pwd) throw Error("SMTP_PASSWORD env var is empty");

    this.host = server;
    this.port = parseInt(port);
    this.user = user;
    this.pass = pwd;
  }
}
