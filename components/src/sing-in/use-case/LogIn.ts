import { ISignInApiCalls } from "@/components/src/sing-in/domain/interfaces/ISignInApiCalls";
import { Email } from "@/src/common/domain/Email";

export class LogIn {
  constructor(private apiCall: ISignInApiCalls) {}

  async user(email: Email): Promise<void> {
    await this.apiCall.logInUser(email);
  }

  async advertiser(email: Email): Promise<void> {
    await this.apiCall.logInAdvertiser(email);
  }
}
