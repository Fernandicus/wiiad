import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { LogIn } from "../LogIn";

export class LogInHandler {
  constructor(private logIn: LogIn) {}

  async user(email: string): Promise<void> {
    const userEmail = new Email(email);
    await this.logIn.user( userEmail );
  }

  async advertiser(email: string): Promise<void> {
    const advertiserEmail = new Email(email);
    await this.logIn.advertiser(advertiserEmail);
  }
}
