import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { SignUp } from "../SignUp";

export class SingUpHandler {
  constructor(private signUp: SignUp) {}

  async user(params: { email: string; userName: string }): Promise<void> {
    const email = new Email(params.email);
    const userName = new Name(params.userName);
    await this.signUp.user({ email, userName });
  }

  async advertiser(params: { email: string; userName: string }): Promise<void> {
    const email = new Email(params.email);
    const userName = new Name(params.userName);
    await this.signUp.advertiser({ email, userName });
  }
}
